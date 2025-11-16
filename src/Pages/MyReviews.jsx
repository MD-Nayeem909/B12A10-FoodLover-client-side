import React, { useEffect, useState } from "react";
import Container from "../Utility/Container";
import { Link } from "react-router";
import { Plus } from "lucide-react";
import MyReviewCard from "../Components/MyReviewCard";
import api from "../Utility/axios";
import { useAuth } from "../Providers/AuthContext";
import Loading from "../Utility/Loading";

const MyReviews = () => {
  const { user, setUser } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localStorageUser = localStorage.getItem("authUser");
    if (localStorageUser) {
      setUser(JSON.parse(localStorageUser));
    }
    if (!user) return;
    api
      .get("/api/reviews/me", { author: true })
      .then((res) => {
        setReviews(
          res.data.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteReview = (id) => {
    const updatedReviews = reviews.filter((review) => review._id !== id);
    setReviews(updatedReviews);
  };

  return (
    <Container>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Reviews</h1>
            <p className="text-accent animate-bounce">
              Manage all your food reviews in one place
            </p>
          </div>
          {reviews.length > 0 && (
            <Link
              to="/create-review"
              className="flex items-center gap-2 btn-primary rounded-md px-4 py-2"
            >
              <Plus size={20} />
              Add Review
            </Link>
          )}
        </div>

        {loading ? (
          <Loading />
        ) : reviews.length === 0 ? (
          <div className="card p-12 flex-col items-center text-center">
            <h2 className="text-2xl font-bold mb-2 text-text-primary">
              No reviews yet
            </h2>
            <p className="text-text-secondary mb-6">
              Start sharing your food experiences with the community
            </p>
            <Link
              to="/create-review"
              className="btn-primary w-fit px-6 py-3 rounded-md"
            >
              Write Your First Review
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <MyReviewCard
                key={review._id}
                review={review}
                myFavoriteDelete={handleDeleteReview}
              />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default MyReviews;
