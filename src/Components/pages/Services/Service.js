import React from "react";
import "./Service.css";
import { servicesData } from "../../../data/ServicesData";
import { useState } from "react";
import arrow from "../../../Assets/arrow.png";

export const Service = () => {
  const [services] = useState(servicesData);
  return (
    <div className="programs" id="service">
      <div className="programs-header">
        <span className="stroke-text"> Explore our </span>{" "}
        <span> Programs </span>{" "}
        <span className="stroke-text"> to shape you </span>{" "}
      </div>
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
    </div>
  );
};
