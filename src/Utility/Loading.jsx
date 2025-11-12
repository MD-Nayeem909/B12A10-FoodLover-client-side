import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center  col-span-12 w-full bg-base-200 min-h-[calc(100vh-800px)]">
      <lord-icon
        src="https://cdn.lordicon.com/kixubvkn.json"
        trigger="loop"
        delay="500"
        state="hover-wrong"
        colors="primary:#632EE3,secondary:#9F62F2"
        style={{ width: "100px", height: "100px" }}
      ></lord-icon>
      <h2 className="text-md font-semibold text-center text-accent ">
        Reviews in Progress...
      </h2>
    </div>
  );
};

export default Loading;
