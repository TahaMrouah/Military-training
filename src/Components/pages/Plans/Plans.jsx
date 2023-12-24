import React from "react";
import "./Plans.css";
import { plansData } from "../../../data/plansData";
import whitetick from "../../../Assets/whitetick.png";
import arrow from "../../../Assets/arrow.png";

export const Plans = () => {
  return (
    <div className="plans-container" id="plans">
      <div className="blur plan-blur1"></div>
      <div className="blur plan-blur2"></div>
      <div className="programs-header" style={{ gap: "2rem" }}>
        <span className="stroke-text">READY TO START</span>
        <span>YOUR JOURNEY</span>
        <span className="stroke-text">NOW WITH US</span>
      </div>

      <div className="plans">
        {plansData.map((plan, i) => {
          return (
            <div className="plan" key={i.id}>
              {plan.icon}
              <span>{plan.name}</span>
              <span>{plan.price}</span>
              <div className="features">
                {plan.features.map((feature, i) => {
                  return (
                    <div className="feature">
                      <img src={whitetick} alt="" />
                      <span key={i}>{feature}</span>
                    </div>
                  );
                })}
              </div>
              <div>
                <span>
                  See More Benifits{" "}
                  <img src={arrow} alt="" style={{ width: "15px" }} />
                </span>
              </div>
              <button className="btn">Join Now</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
