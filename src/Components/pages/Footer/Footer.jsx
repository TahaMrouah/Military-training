import React from "react";
import "./Footer.css";
import git from "../../../Assets/git.png";
import insta from "../../../Assets/insta.png";
import lin from "../../../Assets/in.png";
import { Link } from "react-scroll";
import { Link as Lien } from "react-router-dom";
import logo from "../../../Assets/logo.png";

export const Footer = () => {
  return (
    <div className="footer-container">
      <hr />
      <div className="footer">
        <div className="social-links">
          <Lien to="https://github.com/TahaMrouah" className="link">
            {" "}
            <img src={git} alt="" />
          </Lien>

          <img src={insta} alt="" />
          <Lien
            className="link"
            to="https://www.linkedin.com/in/mrouah-taha-b16272203/"
          >
            <img src={lin} alt="" />
          </Lien>
        </div>

        <div className="logo-f">
          <Link to="home" spy={true} smooth={true}>
            <img
              src={logo}
              alt="Logo"
              style={{ width: "50%", margin: "0 auto", cursor: "pointer" }}
            />
          </Link>
        </div>
      </div>
      <div className="blur blur-f1"></div>
      <div className="blur blur-f2"></div>
    </div>
  );
};
