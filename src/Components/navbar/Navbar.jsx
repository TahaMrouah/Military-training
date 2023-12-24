import React from "react";
import { NavMenu } from "./NavMenu";
import { useState } from "react";
import "./navbar.css";
import { Link } from "react-scroll";
import { Link as Lien } from "react-router-dom";

const Navbar = () => {
  const mobile = window.innerWidth <= 800 ? true : false;
  const [menuOpened, setMenuOpened] = useState(true);

  return (
    <nav className="navbar">
      <Lien to="/" style={{ textDecoration: "none" }}>
        <h1 className="logo"> LOGO </h1>{" "}
      </Lien>

      {menuOpened === false && mobile === true ? (
        <div
          style={{
            backgroundColor: "rgb(80, 80, 80",
            padding: "0.5rem",
            borderRadius: "5px",
          }}
          onClick={() => setMenuOpened(true)}
        >
          <i className="fas fa-bars" />
        </div>
      ) : (
        <ul className="navMenu">
          {" "}
          {NavMenu.map((item, index) => {
            return (
              <li key={index}>
                {" "}
                <Link
                  onClick={() => setMenuOpened(false)}
                  to={item.url}
                  spy={true}
                  smooth={true}
                  className={item.cName}
                >
                  {item.title}{" "}
                </Link>{" "}
              </li>
            );
          })}
          <li
            style={{
              marginLeft: "20px",
            }}
          >
            <Lien
              style={{ fontWeight: "bold" }}
              to="./username"
              className="nav-links"
              onClick={() => setMenuOpened(false)}
            >
              <i className="fa-solid fa-user"></i> Log In
            </Lien>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
