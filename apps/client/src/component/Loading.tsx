import React from "react";

const Loading = () => {
  return (
    <div
      className="flex items-center justify-center"
      style={{ position: "relative", height: "100vh" }}
    >
      <div className="loader">
        <span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div className="base">
          <span></span>
          <div className="face"></div>
        </div>
      </div>
      <div className="longfazers">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Loading;
