import React from "react";
import "./Service.css";
import { servicesData } from "../../../data/ServicesData";
import { useState } from "react";
import arrow from "../../../Assets/arrow.png";
import { Link } from "react-router-dom";

export const Service = () => {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  const [services] = useState(servicesData);
  return (
    <div className="programs" id="service">
      <div className="programs-header">
        <span className="stroke-text"> Explore our </span>{" "}
        <span> Programs </span>{" "}
        <span className="stroke-text"> to shape you </span>{" "}
      </div>
      <Link to={isLoggedIn ? "./profile" : "./register"}>
        <div className="program-categories">
          {" "}
          {services.map((service, index) => (
            <div className="category" key={index.id}>
              {" "}
              {service.img} <span> {service.heading} </span>{" "}
              <span> {service.details} </span>{" "}
              <div className="join-now">
                <span> Join Now </span> <img src={arrow} alt="" />
              </div>{" "}
            </div>
          ))}{" "}
        </div>{" "}
      </Link>
    </div>
  );
};
