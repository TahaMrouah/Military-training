import React from "react";
/*import Carousel from "react-bootstrap/Carousel";
import im1 from "../../Assets/im1.avif";
import im2 from "../../Assets/im2.jpg";*/
//import Navbar from "../../navbar/Navbar";
import img1 from "../../../Assets/img1.png";
import img2 from "../../../Assets/img2.png";
//import img3 from "../../../Assets/img3.png";
import heart from "../../../Assets/heart.png";
import { motion } from "framer-motion";
import NumberCounter from "number-counter";
import { Link } from "react-router-dom";
import { Service, Reasons, Plans, Testimonials, Join } from "..";
//import Map from "../map/map";

import "../../../App.css";
import "./Home.css";

export const Home = () => {
  const transition = { type: "spring", duration: 3 };

  return (
    <>
      <div className="hero" id="home">
        <div className="blur blur-h"></div>
        <div className="left-h">
          <div className="the-best-ad">
            <motion.div
              initial={{ left: "238px" }}
              whileInView={{ left: "8px" }}
              transition={{ ...transition, type: "tween" }}
            >
              {" "}
            </motion.div>
            <span> the best fitness club in the town </span>{" "}
          </div>{" "}
          <div className="hero-text">
            <div>
              <span className="stroke-text"> Shape </span> <span> Your </span>{" "}
            </div>{" "}
            <div>
              <span> Ideal Body </span>{" "}
            </div>{" "}
            <div>
              <span>
                {" "}
                In here we will help you to shape and build your ideal body and
                live up your life to fullest{" "}
              </span>{" "}
            </div>{" "}
          </div>{" "}
          <div className="figures">
            <div>
              <span>
                <NumberCounter
                  end={10}
                  start={4}
                  delay=".9"
                  preFix="+"
                ></NumberCounter>
              </span>{" "}
              <span> Expert coachs </span>{" "}
            </div>{" "}
            <div>
              <span>
                {" "}
                <NumberCounter
                  end={100}
                  start={60}
                  delay="2"
                  preFix="+"
                ></NumberCounter>{" "}
              </span>{" "}
              <span> members Joined </span>{" "}
            </div>{" "}
            <div>
              <span>
                {" "}
                <NumberCounter
                  end={30}
                  start={15}
                  delay="1.3"
                  preFix="+"
                ></NumberCounter>{" "}
              </span>{" "}
              <span> Fitness programs </span>{" "}
            </div>{" "}
          </div>{" "}
          <div className="hero-buttons">
            <button className="btn">
              <Link to={"/register"}>Get Started</Link>{" "}
            </button>{" "}
            <button className="btn"> Learn More </button>{" "}
          </div>{" "}
        </div>{" "}
        <div className="right-h">
          <button className="btn">
            <Link
              to="./register"
              style={{ color: "#000", textDecoration: "none" }}
            >
              Join Now{" "}
            </Link>{" "}
          </button>{" "}
          <motion.div
            initial={{ right: "-1rem" }}
            transition={transition}
            whileInView={{ right: "4rem" }}
            className="heart-rate"
          >
            <img src={heart} alt="" />
            <span> Heart Rate </span> <span> 116 BPM </span>{" "}
          </motion.div>
          <img src={img1} alt="" className="hero-img" />
          <motion.img
            src={img2}
            alt=""
            initial={{ right: "11rem" }}
            whileInView={{ right: "20rem" }}
            transition={transition}
            className="hero-img-back"
          />
        </div>{" "}
      </div>
      <Service />
      <Reasons />
      <Plans />
      <Testimonials />
      <Join />
    </>
  );
};
