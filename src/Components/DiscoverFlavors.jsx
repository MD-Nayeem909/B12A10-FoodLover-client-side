import { Search } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const DiscoverFlavors = () => {
  return (
    <section className="hero bg-linear-to-tl from-[#E0F8F5] to-[#FFE6FD] to-100% lg:p-10 rounded-lg">
      <div className="flex flex-col justify-between items-center gap-4 lg:gap-8 p-10">
        <div className="text-center space-y-4">
          <h2 className="text-3xl text-gradient lg:text-7xl font-bold">
            Discover Local Flavors!
          </h2>
          <p className="text-accent lg:text-xl">
            Join our community of food enthusiasts exploring amazing local
            restaurants and street food!
          </p>
        </div>
        <div className="flex mx-auto shadow-lg rounded-full w-full max-w-2xl">
          <div className="flex w-full">
            <label className="input rounded-l-full rounded-r-none border-none w-full">
              <input
                type="text"
                placeholder="Search For Your Favorite Flavors..."
                className="p-3 border-none"
              />
            </label>
          </div>
          <button className="btn btn-primary px-3! rounded-r-full! rounded-l-none!">
            <Search />
          </button>
        </div>
        <div className="gap-4 flex">
          <Link to="/all-products" className="btn btn-primary">
            Explore Reviews
          </Link>
          <Link to="/create-product" className="btn btn-outline-gradient">
            Share Your Meal
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DiscoverFlavors;
