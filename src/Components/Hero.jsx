import { Search } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import image1 from "../assets/food-menu-1.jpg";
import image2 from "../assets/food-menu-2.jpg";
import image3 from "../assets/food-menu-3.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Hero = () => {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <section className="hero bg-linear-to-tl from-[#E0F8F5] to-[#FFE6FD] to-100% lg:p-20 rounded-lg">
            <div className="flex flex-col justify-between items-center gap-4 lg:gap-8 p-10">
              <div className="text-center space-y-4">
                <h2 className="text-3xl lg:text-7xl font-bold">
                  Deal Your <span className="text-gradient">Products</span>
                  <br />
                  In A <span className="text-gradient">Smart</span> Way !
                </h2>
                <p className="text-accent lg:text-xl">
                  SmartDeals helps you sell, resell, and shop from trusted local
                  sellers — all in one place!
                </p>
              </div>
              <div className="flex mx-auto shadow-lg rounded-full w-full max-w-2xl">
                <div className="flex w-full">
                  <label className="input rounded-l-full rounded-r-none border-none w-full">
                    <input
                      type="text"
                      placeholder="search For Products, Categories..."
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
                  Watch All Reviews
                </Link>
                <Link to="/create-product" className="btn btn-outline-gradient">
                  Add Review
                </Link>
              </div>
            </div>
          </section>
        </SwiperSlide>

        <SwiperSlide>
          <section className=" py-20 rounded-lg ">
            <div className="w-full">
              <img
                src={image1}
                alt=""
                className="object-cover overflow-hidden w-full"
              />
            </div>
          </section>
        </SwiperSlide>
        <SwiperSlide>
          <section className=" py-20 rounded-lg ">
            <div className="w-full">
              <img
                src={image2}
                alt=""
                className="object-cover overflow-hidden w-full"
              />
            </div>
          </section>
        </SwiperSlide>
        <SwiperSlide>
          <section className=" py-20 rounded-lg ">
            <div className="w-full">
              <img
                src={image3}
                alt=""
                className="object-cover overflow-hidden w-full"
              />
            </div>
          </section>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Hero;
