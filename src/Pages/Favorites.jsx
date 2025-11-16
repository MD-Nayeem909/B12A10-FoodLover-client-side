import React, { useEffect, useState } from "react";
import Container from "../Utility/Container";
import ReviewCard from "../Components/ReviewCard";
import { Heart } from "lucide-react";
import { Link } from "react-router";
import api from "../Utility/axios";
import Loading from "../Utility/Loading";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/user/favorites")
      .then((response) => {
        setFavorites(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching favorites:", error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleRemoveFavorite = (id, isFavorite) => {
    if (isFavorite) return;
    setFavorites(favorites.filter((favorite) => favorite._id !== id));
  };

  return (
    <Container>
      <div className="my-20">
        <div className="">
          <h2 className="text-5xl font-bold mb-4">My Favorites</h2>
          <p className="text-accent mb-8 animate-bounce">
            Your collection of loved food reviews
          </p>
        </div>
        {isLoading ? (
          <Loading />
        ) : favorites.length === 0 ? (
          <div className="w-3xl mx-auto bg-base-100 rounded-2xl p-12 text-center shadow-md">
            <Heart size={48} className="mx-auto mb-4 text-gray-300" />
            <h2 className="text-2xl font-bold mb-2 text-text-primary">
              No favorites yet
            </h2>
            <p className="text-accent">
              Start adding your favorite food reviews to this collection
            </p>
            <Link to="/all-reviews" className="mt-6 btn btn-primary rounded-lg">
              Browse Reviews
            </Link>
          </div>
        ) : (
          <div>
            <div className="mb-4 p-4 bg-primary/10 rounded-lg">
              <p className="text-text-primary font-medium">
                You have {favorites.length} favorite{" "}
                {favorites.length === 1 ? "review" : "reviews"}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((favorite) => (
                <div key={favorite._id} className="relative">
                  <ReviewCard
                    review={favorite}
                    handleFavoriteToggle={handleRemoveFavorite}
                    isFavorite={true}
                    isFavoritePage={true}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Favorites;
