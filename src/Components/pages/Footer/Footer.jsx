import React from "react";
import "./Footer.css";
import git from "../../../Assets/git.png";
import insta from "../../../Assets/insta.png";
import lin from "../../../Assets/in.png";
import { Link as Lien } from "react-router-dom";
import logo from "../../../Assets/logo.png";

export const Footer = () => {
  return (
    <div className="footer-container">
      <hr />
      <div className="footer">
        <div className="social-links">
          <img src={git} alt="" />
          <img src={insta} alt="" />
          <img src={lin} alt="" />
        </div>

        <div className="logo-f">
          <Lien to="/" style={{ textDecoration: "none" }}>
            <img
              src={logo}
              alt="Logo"
              style={{ width: "50%", margin: "0 auto" }}
            />
          </Lien>
        </div>
      </div>
      <div className="blur blur-f1"></div>
      <div className="blur blur-f2"></div>
    </div>
  );
};
