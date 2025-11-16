import { useState, useMemo } from "react";
import ReviewCard from "../Components/ReviewCard";
import Container from "../Utility/Container";
import { Filter, Search } from "lucide-react";
import useService from "../Hooks/useService";
import Loading from "../Utility/Loading";

const AllReviews = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const { data, loading } = useService(
    "https://food-lover-api-server.vercel.app/api/reviews"
  );
  const allReviews =
    (data.data && data.data.sort(() => Math.random() - 0.5)) || [];

  const filteredReviews = useMemo(() => {
    let filtered = allReviews;

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (review) =>
          review.foodName.toLowerCase().includes(term) ||
          review.restaurantName.toLowerCase().includes(term) ||
          review.location.toLowerCase().includes(term)
      );
    }

    // Rating filter
    if (selectedRating !== null) {
      filtered = filtered.filter((review) => review.rating >= selectedRating);
    }

    // Location filter
    if (selectedLocation) {
      filtered = filtered.filter(
        (review) => review.location === selectedLocation
      );
    }

    // Sort
    if (sortBy === "recent") {
      filtered.sort((a, b) => b.id - a.id);
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => a.id - b.id);
    }

    return filtered;
  }, [allReviews, searchTerm, sortBy, selectedRating, selectedLocation]);

  const uniqueLocations = [
    ...new Set(allReviews.map((r) => r.location)),
  ].sort();
  const hasActiveFilters =
    searchTerm || selectedRating !== null || selectedLocation !== null;

  return (
    <Container>
      <div className="my-20">
        <div>
          <h2 className="text-4xl font-bold mb-2">
            All Reviews:
            <span className="text-gradient"> {allReviews.length}</span>
          </h2>
          <p className="text-accent mb-8 animate-bounce">
            Browse all food reviews from our community
          </p>
        </div>
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3.5 text-accent" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by food, restaurant, or location..."
              className="w-full pl-10 pr-4 py-3 border border-border border-gray-300 bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent rounded-lg  "
            />
          </div>
        </div>
        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-background"
          >
            <Filter size={20} />
            Filters
            {hasActiveFilters && (
              <span className="ml-auto bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {(searchTerm ? 1 : 0) +
                  (selectedRating !== null ? 1 : 0) +
                  (selectedLocation ? 1 : 0)}
              </span>
            )}
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-max bg-base-100"
          >
            <option value="recent">Most Recent</option>
            <option value="rating">Highest Rating</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div
            className={`${
              showFilters ? "block" : "hidden"
            } md:block lg:col-span-1 shadow-md rounded-lg lg:sticky top-20 bg-base-100`}
          >
            <div className="card p-6 sticky top-20">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-text-primary">Filters</h3>
                {hasActiveFilters && (
                  <button
                    onClick={() => {
                      setSelectedRating(null);
                      setSelectedLocation(null);
                    }}
                    className="text-sm text-primary hover:text-primary-dark font-medium"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-text-primary mb-3">
                  Minimum Rating
                </h4>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <label
                      key={rating}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="rating"
                        checked={selectedRating === rating}
                        onChange={() =>
                          setSelectedRating(
                            selectedRating === rating ? null : rating
                          )
                        }
                        className="w-4 h-4 rounded"
                      />
                      <span className="text-sm text-text-primary">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className={
                              i < rating ? "text-accent" : "text-gray-300"
                            }
                          >
                            ★
                          </span>
                        ))}
                      </span>
                      <span className="text-sm text-text-secondary">& up</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div className="border-t border-border pt-6">
                <h4 className="font-semibold text-text-primary mb-3">
                  Location
                </h4>
                <div className="space-y-2">
                  {uniqueLocations.map((location) => (
                    <label
                      key={location}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedLocation === location}
                        onChange={() =>
                          setSelectedLocation(
                            selectedLocation === location ? null : location
                          )
                        }
                        className="w-4 h-4 rounded"
                      />
                      <span className="text-sm text-text-primary">
                        {location}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Results Count */}
              <div className="mt-6 p-3 bg-primary/10 rounded">
                <p className="text-sm font-medium text-text-primary">
                  {filteredReviews.length}{" "}
                  {filteredReviews.length === 1 ? "review" : "reviews"} found
                </p>
              </div>
            </div>
          </div>

          {/* Reviews Grid */}
          {!loading ? (
            <div className="lg:col-span-3">
              {filteredReviews && filteredReviews.length === 0 ? (
                <div className="card p-12 text-center">
                  <h2 className="text-2xl font-bold mb-2 text-text-primary">
                    No reviews found
                  </h2>
                  <p className="text-text-secondary mb-6">
                    Try adjusting your search or filter criteria
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedRating(null);
                      setSelectedLocation(null);
                    }}
                    className="btn-primary flex mx-auto w-fit"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredReviews.map((review) => (
                    <div key={review._id}>
                      <ReviewCard review={review} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="md:col-3">
              <Loading />
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default AllReviews;
