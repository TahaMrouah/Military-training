import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/fetch.hook";
import RingLoader from "react-spinners/RingLoader";
import { FaArrowLeft } from "react-icons/fa";
import avatar from "../../Assets/profile.png";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { profileValidation } from "../helper/validate";
import { MdAutoDelete } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Table from "react-bootstrap/Table";
import { GiConfirmed } from "react-icons/gi";
import logo from "../../Assets/logo.png";
import { Link } from "react-router-dom";

import axios from "axios";

const AdminDashboard = () => {
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [{ isLoading, apiData, serverError }] = useFetch("/allUsers");
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
      <Table responsive="sm" className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>User name</th>
            <th>Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
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
              <td> {user.role}</td>{" "}
              <td>
                {/* Add a conditional rendering for the delete button */}
                {deletingUserId === user._id ? (
                  <button disabled>
                    <MdAutoDelete />
                  </button>
                ) : (
                  <button onClick={() => setDeletingUserId(user._id)}>
                    <MdDelete />
                  </button>
                )}
                {deletingUserId === user._id && (
                  <button onClick={() => deleteUser(user._id)}>
                    <GiConfirmed />
                  </button>
                )}
              </td>
              {/* Add more fields as needed */}
            </tr>
          ))}
        </tbody>
      </Table>
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
