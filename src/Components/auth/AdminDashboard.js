import React, { useState, useEffect } from "react";
import styles from "../../styles/Username.module.css";
import useFetch from "../../hooks/fetch.hook";
import RingLoader from "react-spinners/RingLoader";
import bgImg from "../../Assets/img1.jpg";
///import { FaArrowLeft } from "react-icons/fa";
import avatar from "../../Assets/profile.png";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
//import { profileValidation } from "../helper/validate";
import { IoAddCircle } from "react-icons/io5";
import { MdAutoDelete } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Table from "react-bootstrap/Table";
import { GiConfirmed } from "react-icons/gi";
import logo from "../../Assets/logo.png";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { registerValidation } from "../helper/validate";
import { registerUser } from "../helper/helper";
//import { updateUser } from "../helper/helper";
import convertToBase64 from "../helper/convert";
//import Skeleton from "react-loading-skeleton";
import axios from "axios";

const AdminDashboard = () => {
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [{ isLoading /*apiData, serverError*/ }] = useFetch("/allUsers");
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
  if (isLoading)
    return (
      <div
        className="flex justify-center items-center"
        style={{ display: "grid", margin: "70px auto" }}
      >
        <h1
          className="flex justify-center items-center"
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            color: "orange",
            display: "block",
            marginBottom: "20px",
          }}
        >
          Loading Data Please Wait!!{" "}
        </h1>
        <RingLoader
          color={"orange"}
          loading={isLoading}
          size={200}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );

  return (
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

      <Table responsive="sm" className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>User name</th>
            <th>Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Weight</th>
            <th>Height</th>
            <th>Service</th>
            <th>plan</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td> {user._id}</td>
              <td> {user.username}</td>
              <td> {user.name}</td>
              <td> {user.lname}</td>
              <td> {user.email}</td>
              <td> {user.mobile}</td>
              <td> {user.weight} kg</td>
              <td> {user.height} cm</td>
              <td> {user.service}</td>
              <td> {user.plan}</td>
              <td> {user.role}</td>{" "}
              <td>
                {/* Add a conditional rendering for the delete button */}
                {deletingUserId === user._id ? (
                  <button disabled>
                    <MdAutoDelete
                      style={{ color: "red", fontSize: "1.5rem" }}
                    />
                  </button>
                ) : (
                  <button onClick={() => setDeletingUserId(user._id)}>
                    <MdDelete style={{ color: "red", fontSize: "1.5rem" }} />
                  </button>
                )}
                {deletingUserId === user._id && (
                  <button onClick={() => deleteUser(user._id)}>
                    <GiConfirmed
                      style={{ color: "green", fontSize: "1.5rem" }}
                    />
                  </button>
                )}
                <FaEdit
                  style={{
                    color: "blue",
                    fontSize: "1.5rem",
                    cursor: "pointer",
                    marginLeft: "3px",
                  }}
                />
              </td>
              {/* Repeat for other columns */}
            </tr>
          ))}
        </tbody>
      </Table>
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
                    {...formik.getFieldProps("mobile", {
                      required: true,
                      maxLength: 10,
                    })}
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
  );
};

export default AdminDashboard;
