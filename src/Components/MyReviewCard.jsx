import { Edit2, Trash2 } from "lucide-react";
import { Link } from "react-router";
import DeleteModal from "../Utility/DeleteModal";
import axios from "axios";
import api from "../Utility/axios";
import formatDateForWeb from "../Utility/formatDateForWeb";

const MyReviewCard = ({ review, myFavoriteDelete }) => {
  const handleRemoveReview = (id) => {
    DeleteModal(function () {
      api
        .delete(`/api/reviews/${id}`)
        .then((response) => {
          if (myFavoriteDelete) {
            myFavoriteDelete(id);
          }
        })
        .catch((error) => {
          console.error("Error deleting review:", error);
        });
    });
  };
  return (
    <div
      key={review.id}
      className="card overflow-hidden border-gray-200 border-2 shadow-md"
    >
      <div className="md:flex">
        {/* Image */}
        <div className="md:w-40 ">
          <img
            src={review.image || "/placeholder.svg"}
            alt={review.foodName}
            className="h-40 w-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <div>
            <Link
              to={`/review/${review.id}`}
              className="block hover:text-primary mb-1"
            >
              <h3 className="font-bold text-lg text-text-primary">
                {review.foodName}
              </h3>
            </Link>
            <p className="text-sm font-semibold text-text-primary">
              {review.restaurantName}
            </p>
            <p className="text-sm text-text-secondary">{review.location}</p>
          </div>

          {/* Rating and Date */}
          <div className="mt-2 mb-4">
            <div className="flex gap-1 mb-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`text-sm ${
                    i < Math.floor(review.rating)
                      ? "text-accent"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <p className="text-xs text-text-secondary">
              {formatDateForWeb(review.createdAt)}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2 border-t border-gray-300 border-border pt-3">
            <Link
              to={`/edit-review/${review._id}`}
              state={review}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary/10 text-primary rounded hover:bg-primary/20 text-sm font-medium"
            >
              <Edit2 size={16} />
              Edit
            </Link>
            <button
              onClick={() => handleRemoveReview(review._id)}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 text-sm font-medium"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyReviewCard;
