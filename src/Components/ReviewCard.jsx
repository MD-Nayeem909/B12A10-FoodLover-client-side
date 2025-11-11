import { Heart, MapPin } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const ReviewCard = ({ review, handleFavoriteToggle,isFavorite=false }) => {
  const [isFavorited, setIsFavorited] = useState(isFavorite);
  return (
    <section>
      <div className="card overflow-hidden group bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg">
        {/* Image */}
        <div className="relative h-70 overflow-hidden bg-gray-200">
          <img
            src={review.image || "/placeholder.svg"}
            alt={review.foodName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          <button
            onClick={() => {
              setIsFavorited(!isFavorited);
              handleFavoriteToggle(review.id, isFavorited);
            }}
            className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-gray-100 opacity-70 hover:opacity-100 transition-opacity"
          >
            <Heart
              size={24}
              className={isFavorited ? "fill-black text-accent" : "text-accent"}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 text-text-primary">
            {review.foodName}
          </h3>

          <div className="mb-3">
            <p className="text-sm font-semibold text-text-primary">
              {review.restaurantName}
            </p>
            <div className="flex items-center gap-1 text-sm text-text-secondary">
              <MapPin size={16} />
              {review.location}
            </div>
          </div>

          {/* Rating */}
          <div className="mb-3 flex items-center gap-2">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`text-lg ${
                    i < Math.floor(review.rating)
                      ? "text-accent"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm font-semibold text-text-primary">
              {review.rating}
            </span>
          </div>

          {/* Reviewer & Button */}
          <div className="flex justify-between items-center pt-3 border-t border-dashed border-gray-300">
            <p className="text-sm text-text-secondary">
              by {review.reviewerName}
            </p>
            <Link
              to={`/review-details/${review.id}`}
              state={review}
              className="text-gradient hover:btn-primary btn text-sm font-semibold"
            >
              Details →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewCard;
