import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full mx-auto animate-pulse h-[calc(100vh-60vh)]">
      <lord-icon
        src="https://cdn.lordicon.com/kixubvkn.json"
        trigger="loop"
        delay="100"
        colors="primary:#632EE3,secondary:#9F62F2"
        style={{ width: "120px", height: "120px" }}
      ></lord-icon>

      <h2 className="text-lg font-semibold text-center text-accent mt-3 tracking-wide">
        Reviews in Progress...
      </h2>

      <p className="text-sm text-text-secondary mt-1">
        Please wait while we load the best bites 🍔
      </p>
    </div>
  );
};

export default Loading;
