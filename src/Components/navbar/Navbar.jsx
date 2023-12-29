import React from "react";
import { NavMenu } from "./NavMenu";
import { useState } from "react";
import "./navbar.css";
import { Link } from "react-scroll";
import { Link as Lien } from "react-router-dom";
import logo from "../../Assets/logo.png";
import { IoExitOutline } from "react-icons/io5";

import NavDropdown from "react-bootstrap/NavDropdown";

const Navbar = () => {
  //logout user function
  const userlogout = () => {
    /*localStorage.removeItem("token");
    localStorage.setItem("loggedIn", false);*/
    window.localStorage.clear();
    window.location.href = "./";
  };
  const mobile = window.innerWidth <= 800 ? true : false;
  const [menuOpened, setMenuOpened] = useState(true);
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <nav className="navbar">
      <Lien to="/" style={{ textDecoration: "none" }}>
        <img src={logo} alt="Logo" style={{ width: "50%", margin: "0 auto" }} />
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
            {isLoggedIn ? (
              <>
                <NavDropdown
                  title={
                    <i
                      className="fa-solid fa-user"
                      style={{ color: "orange", fontSize: "1.5rem" }}
                    ></i>
                  }
                  id="basic-nav-dropdown"
                  style={{ color: "#fff" }}
                >
                  <NavDropdown.Item>
                    <Lien
                      style={{ fontWeight: "bold" }}
                      to="./profile"
                      className=""
                      onClick={() => setMenuOpened(false)}
                    >
                      Profile
                    </Lien>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    {" "}
                    <Lien to="./profile">My Services</Lien>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Lien to="./profile"> My Plans</Lien>
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    onClick={userlogout}
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      color: "red",
                    }}
                  >
                    Logout
                    <IoExitOutline style={{ fontSize: "1.5rem" }} />
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Lien
                style={{ fontWeight: "bold" }}
                to="./username"
                className="nav-links"
                onClick={() => setMenuOpened(false)}
              >
                <i className="fa-solid fa-user"></i> Log In
              </Lien>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
