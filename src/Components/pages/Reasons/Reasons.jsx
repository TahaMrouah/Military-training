import React from "react";
import img1 from "../../../Assets/img4.png";
import img2 from "../../../Assets/img5.png";
import img3 from "../../../Assets/img6.png";
import img4 from "../../../Assets/img7.png";
import tick from "../../../Assets/tick.png";
import "./Reasons.css";

export const Reasons = () => {
  return (
    <div className="reasons" id="reasons">
      <div className="left-r">
        <img src={img1} alt="" />
        <img src={img2} alt="" />
        <img src={img3} alt="" />
        <img src={img4} alt="" />
      </div>{" "}
      <div className="right-r">
        <span> Some reasons </span>{" "}
        <div>
          <span className="stroke-text"> Why </span> <span> choose us ? </span>{" "}
        </div>{" "}
        <div className="details-r">
          <div>
            <img src={tick} alt="" /> <span> OVER 140 + EXPERT COACHS </span>{" "}
          </div>{" "}
          <div>
            <img src={tick} alt="" />
            <span> TRAIN SMARTER AND FASTER THAN BEFORE </span>{" "}
          </div>{" "}
          <div>
            <img src={tick} alt="" />
            <span> 1 FREE PROGRAM FOR NEW MEMBER </span>{" "}
          </div>{" "}
          <div>
            <img src={tick} alt="" />
            <span> RELIABLE PARTNERS </span>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
