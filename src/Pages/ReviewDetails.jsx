import { useEffect, useState } from "react";
import Container from "../Utility/Container";
import { Heart, MapPin, ArrowLeft, Edit2, Trash2 } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import DeleteModal from "../Utility/DeleteModal";
import api from "../Utility/axios";
import formatDateForWeb from "../Utility/formatDateForWeb";
import { useAuth } from "../Providers/AuthContext";

const ReviewDetails = () => {
  const [author, setAuthor] = useState(null);
  const { user, setUser } = useAuth();
  const locationData = useLocation();
  const navigate = useNavigate();
  const from = locationData.state?.from?.pathname || "/all-reviews";

  const [isFavorited, setIsFavorited] = useState(false);
  const reviewData = locationData?.state?.review || locationData?.state;

  const {
    _id,
    foodName,
    restaurantName,
    reviewText,
    location,
    rating,
    reviewerName,
    image,
    tags,
  } = reviewData;

  const handleRemoveReview = (id) => {
    DeleteModal(function () {
      api
        .delete(`/api/reviews/${id}`)
        .then((response) => {
          //navigate to home page
          navigate("/");
        })
        .catch((error) => {
          console.error("Error deleting review:", error);
        });
    });
  };

  const handleFavorite = () => {
    if (!user) return navigator("/auth/login");
    setIsFavorited(!isFavorited);
    api
      .put(`/api/reviews/${_id}/favorite`, { isFavorite: !isFavorited })
      .then(() => {
        setUser({
          ...user,
          favorites: !isFavorited
            ? [...user.favorites, _id]
            : user.favorites.filter((id) => id !== _id),
        });
        toast.success(`${isFavorited ? "Removed" : "Added"} from favorites`);
      });
  };

  useEffect(() => {
    api(`/api/reviews/user/${reviewData._id}`).then((res) => {
      setAuthor(res.data.user);
    });
  }, []);

  return (
    <Container className="">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
        <div>
          <div className="relative h-64 md:h-96 bg-base-300 shadow-md flex items-center justify-center overflow-hidden rounded-t-lg">
            <img
              src={image || "/placeholder.svg"}
              alt={foodName}
              className="h-full w-full object-cover"
            />
            <button
              onClick={handleFavorite}
              className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-gray-100 opacity-70 hover:opacity-100 transition-opacity"
            >
              <Heart
                size={24}
                className={
                  isFavorited ? "fill-black text-accent" : "text-accent"
                }
              />
            </button>
          </div>
          <div className="bg-base-100 p-6 mt-6 shadow-md">
            <h3 className="mb-6 font-semibold text-2xl">Review</h3>
            <hr className="text-gray-300" />
            <p className="mt-4 text-accent">{reviewText}</p>
          </div>
        </div>
        <div>
          <div className="px-6 md:px-0">
            <Link
              to={from}
              state={{ from: location, review: reviewData }}
              className="flex gap-2 font-semibold text-accent items-center"
            >
              <ArrowLeft />
              Back to Reviews
            </Link>
            <h2 className="text-5xl font-bold my-4">{foodName}</h2>
            <div className="flex items-center gap-2 mb-4">
              <p className="text-xl font-semibold text-text-primary">
                {restaurantName}
              </p>
              <span className="text-text-secondary">•</span>
              <div className="flex items-center gap-1 text-text-secondary">
                <MapPin size={18} />
                {location}
              </div>
            </div>

            <div className="flex gap-3">
              {Array.isArray(tags) &&
                tags.map((tag) => (
                  <button
                    key={tag}
                    className="rounded-full btn bg-[#9F62F230] btn-sm"
                  >
                    <span className="text-gradient">{tag}</span>
                  </button>
                ))}
            </div>
          </div>
          <div className="bg-base-100 p-6 mt-6 shadow-md rounded-lg">
            <span className="text-2xl font-semibold ">Reviewer Details</span>
            <div className="flex flex-col gap-2 mt-6">
              <span className="text-accent">
                <strong>Reviewer ID :</strong> {reviewData._id}
              </span>
              <span className="text-accent">
                <strong>Posted :</strong>{" "}
                {formatDateForWeb(reviewData.createdAt)}
              </span>
            </div>
          </div>
          <div className="flex flex-col bg-base-100 p-6 mt-6 shadow-md rounded-lg">
            <span className="text-2xl font-semibold mb-6">
              Review Information
            </span>
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="rounded-full h-12 w-12">
                  <img
                    src={author?.image || "/placeholder.svg"}
                    alt="Avatar Tailwind CSS Component"
                  />
                </div>
              </div>
              <div>
                <div className="font-bold">{reviewerName}</div>
                <div className="text-sm opacity-50">
                  crafts.by.{author?.email}
                </div>
              </div>
            </div>
            <div className="flex flex-col text-accent mt-3 gap-2">
              <span className="">
                <strong>Location :</strong> {location}
              </span>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <strong> Rating :</strong>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${
                        i < Math.floor(rating) ? "text-accent" : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm font-semibold text-text-primary">
                  {rating}
                </span>
              </div>
              <span>
                <strong>Status :</strong>{" "}
                <button className="btn btn-warning btn-xs rounded-full">
                  On Sale
                </button>
              </span>
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row gap-4 mt-6">
            <Link
              to={`/edit-review/${_id}`}
              state={{ from: locationData, reviewData }}
              replace
              className="btn btn-primary"
            >
              <Edit2 size={20} /> Edit Review
            </Link>
            <button
              onClick={() => handleRemoveReview(_id)}
              className="btn btn-error hover:text-white btn-outline"
            >
              <Trash2 size={20} /> Delete Review
            </button>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default ReviewDetails;
