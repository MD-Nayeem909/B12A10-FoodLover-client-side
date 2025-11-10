import { Search } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

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
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <section className="hero bg-linear-to-tl from-[#E0F8F5] to-[#FFE6FD] to-100% p-20 rounded-lg flex flex-col justify-between items-center gap-8 ">
            <div className="text-center space-y-4">
              <h2 className="text-7xl font-bold">
                Deal Your <span className="text-gradient">Products</span>
                <br />
                In A <span className="text-gradient">Smart</span> Way !
              </h2>
              <p className="text-accent text-xl">
                SmartDeals helps you sell, resell, and shop from trusted local
                sellers — all in one place!
              </p>
            </div>
            <div className="flex mx-auto shadow-lg rounded-full overflow-hidden">
              <div className=" flex w-[500px]">
                <label className="input rounded-l-full rounded-r-none w-full border-none">
                  <input
                    type="text"
                    placeholder="search For Products, Categoriees..."
                    className=""
                  />
                </label>
              </div>
              <button className="btn btn-primary px-3! rounded-r-full! rounded-l-none!">
                <Search />
              </button>
            </div>
            <div className="gap-4 flex">
              <Link to="/all-products" className="btn btn-primary">
                Watch All Products
              </Link>
              <Link to="/create-product" className="btn btn-outline-gradient">
                Post an Product
              </Link>
            </div>
          </section>
        </SwiperSlide>
        <SwiperSlide>
          <section className="hero bg-linear-to-tl from-[#E0F8F5] to-[#FFE6FD] to-100% p-20 rounded-lg flex flex-col justify-between items-center gap-8">
            Slide 2
          </section>
        </SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Hero;
