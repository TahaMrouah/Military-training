import React, { useState, useEffect } from "react";
import styles from "../../styles/Username.module.css";
//import useFetch from "../../hooks/fetch.hook";
//import RingLoader from "react-spinners/RingLoader";
import bgImg from "../../Assets/img1.jpg";
///import { FaArrowLeft } from "react-icons/fa";
import avatar from "../../Assets/profile.png";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
//import { profileValidation } from "../helper/validate";
import { IoAddCircle } from "react-icons/io5";
//import { MdAutoDelete } from "react-icons/md";
import { MdDelete } from "react-icons/md";
//import Table from "react-bootstrap/Table";
//import { GiConfirmed } from "react-icons/gi";
import logo from "../../Assets/logo.png";
import { Link } from "react-router-dom";
//import { FaEdit } from "react-icons/fa";
import { registerValidation } from "../helper/validate";
import { registerUser } from "../helper/helper";
//import { updateUser } from "../helper/helper";
import convertToBase64 from "../helper/convert";
//import Skeleton from "react-loading-skeleton";
import axios from "axios";
import profile from "../../Assets/profile.png";
import "./admin.css";
import { Footer } from "../pages/Footer/Footer";

import CardSkeleton from "./CardSkeleton";

const AdminDashboard = () => {
  const [, /*deletingUserId*/ setDeletingUserId] = useState(null);
  // const [{ isLoading }] = useFetch();
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [users, setUsers] = useState([]);
  //logout user function
  const userlogout = () => {
    /*localStorage.removeItem("token");
    localStorage.setItem("loggedIn", false);*/
    window.localStorage.clear();
    window.location.href = "./";
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("api/allUsers");
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoadingData(false); // Set loading state to false when data is fetched
      }
    };

    fetchUsers();
  }, []);
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`/api/user/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    } finally {
      setDeletingUserId(null);
    }
  };
  const [file, setFile] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("");
  const [secretKey, setSecretKey] = useState("Admin");
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      number: "",
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        if (role === "Admin" && !secretKey) {
          toast.error("Invalid secret key for admin registration");
          console.log(process.env.SECRET_KEY);
          return;
        }

        values = { ...values, profile: file || "", role: role || "User" };

        // Assuming registerUser is an asynchronous function that returns a promise
        await toast.promise(registerUser(values), {
          loading: "Creating...",
          success: <b>Register Successfully...!</b>,
          error: <b>Registration Failed. Username or email already used!!</b>,
        });
      } catch (error) {
        console.error("Registration error:", error);
        // You can handle the error as needed, for example, show a toast or display an error message.
      }
    },
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to toggle the visibility of the hidden div
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };
  const handleDeleteConfirmation = (userId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (isConfirmed) {
      deleteUser(userId);
    }
  };
  /*if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <CardSkeleton />
      </div>
    );*/

  return (
    <>
      <div className="table-container">
        <div className="flex justify-center items-center">
          <Link to={"/"}>
            {" "}
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <h1 style={{ color: "#fff", fontSize: "2rem", fontWeight: "bold" }}>
            Add New User
          </h1>
          &nbsp;
          <IoAddCircle
            onClick={toggleDropdown}
            style={{
              color: "#fff",
              fontSize: "3rem",
              textAlign: "center",
              cursor: "pointer",
            }}
          />
        </div>

        <section className="users">
          {isLoadingData
            ? // Render the CardSkeleton component when isLoading is true
              Array.from({ length: 8 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))
            : // Render the actual user cards when isLoading is false
              users.map((user) => (
                <div className="user" key={user._id}>
                  <div className="user-img">
                    <img src={user.profile || profile} alt="User Profile" />
                  </div>

                  <div className="user-data">
                    <span className="username">
                      <h2>Username : {user.username}</h2>
                    </span>
                    <span>
                      <span style={{ color: "#fff" }}> Name/Lname :</span>{" "}
                      {user.name} {user.lname}{" "}
                    </span>
                    <span>
                      {" "}
                      <span style={{ color: "#fff" }}> Email :</span>{" "}
                      {user.email}
                    </span>
                    <span>
                      {" "}
                      <span style={{ color: "#fff" }}> Mobile :</span>{" "}
                      {user.mobile}
                    </span>
                    <span
                      style={
                        user.role === "Admin"
                          ? {
                              color: "green",
                              fontWeight: "500",
                              textDecoration: "underline",
                            }
                          : { color: "#babbbd" }
                      }
                    >
                      <span style={{ color: "#fff" }}>Role :</span> {user.role}
                    </span>
                    <span>
                      {" "}
                      <span style={{ color: "#fff" }}> Service :</span>{" "}
                      {user.service}
                    </span>
                    <span>
                      {" "}
                      <span style={{ color: "#fff" }}> Plan :</span> {user.plan}
                    </span>
                    <span>
                      <span style={{ color: "#fff" }}>Weight :</span>{" "}
                      {user.weight} kg /{" "}
                      <span style={{ color: "#fff" }}> Height :</span>{" "}
                      {user.height} cm
                    </span>
                    <span>
                      <button
                        onClick={() => handleDeleteConfirmation(user._id)}
                      >
                        <MdDelete className="delete" />
                      </button>
                      {/*<FaEdit
                  style={{
                    color: "blue",
                    fontSize: "1.5rem",
                    cursor: "pointer",
                    marginLeft: "3px",
                  }}
                />*/}
                    </span>
                  </div>
                </div>
              ))}
        </section>

        {isDropdownOpen && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className={
              isDropdownOpen ? "show" : "register_containe register_container"
            }
          >
            <section>
              <Toaster position="top-center" reverseOrder={false}></Toaster>
              <div className="register">
                <div className="div1">
                  <div style={{ textAlign: "center" }}>
                    <h1>Create</h1>
                    <span>Create new user</span>
                  </div>

                  <form
                    id="form"
                    className="register_form register_form-col "
                    onSubmit={formik.handleSubmit}
                  >
                    <div className="profile flex justify-center py-4">
                      <label htmlFor="profile">
                        {" "}
                        <img
                          src={file || avatar}
                          className={styles.profile_img}
                          alt="avatar"
                        />
                      </label>
                      <input
                        onChange={onUpload}
                        type="file"
                        name="profile"
                        id="profile"
                        className=""
                      />
                    </div>
                    <div>
                      User&nbsp;
                      <input
                        type="radio"
                        name="UserType"
                        value="User"
                        onChange={(e) => setRole(e.target.value)}
                      />
                      &nbsp; Admin&nbsp;
                      <input
                        type="radio"
                        name="UserType"
                        value="Admin"
                        onChange={(e) => setRole(e.target.value)}
                      />
                    </div>
                    {role === "Admin" ? (
                      <input
                        style={{ width: "90%" }}
                        onChange={(e) => setSecretKey(e.target.value)}
                        className={styles.textbox}
                        type="text"
                        placeholder="Secret Key"
                      />
                    ) : null}
                    <input
                      type="text"
                      {...formik.getFieldProps("username")}
                      placeholder="username"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      {...formik.getFieldProps("password")}
                      placeholder="password"
                    />
                    <input
                      type="email"
                      {...formik.getFieldProps("email")}
                      placeholder="Email"
                    />
                    <input
                      type="text"
                      inputMode="numeric"
                      {...formik.getFieldProps("mobile")}
                      placeholder="mobile number"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"} Password
                    </button>
                    <button className="btn" type="submit">
                      Create new user
                    </button>
                  </form>
                </div>
                <div className="div2">
                  <img src={bgImg} alt="" />
                </div>
              </div>
            </section>
          </div>
        )}

        <div className="text-center py-4">
          <span className="text-gray-500">
            Come back later?
            <button className="text-red-500" onClick={userlogout}>
              &nbsp;Logout
            </button>
          </span>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default AdminDashboard;
