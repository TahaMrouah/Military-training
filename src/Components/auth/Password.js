import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../../Assets/avatarr.png";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import RingLoader from "react-spinners/RingLoader";
import { passwordValidate } from "../helper/validate";
import useFetch from "../../hooks/fetch.hook";
import { useAuthStore } from "../../store/store";
import { verifyPassword } from "../helper/helper";
import styles from "../../styles/Username.module.css";
import { MdOutlinePassword } from "react-icons/md";
import { BiSolidShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";
import { FaArrowLeft } from "react-icons/fa";
import { Footer } from "../pages/Footer/Footer";
export default function Password() {
  const navigate = useNavigate();
  const { username } = useAuthStore((state) => state.auth);
  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`);
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        //console.log("apiData:", apiData);

        let loginPromise = verifyPassword({
          username,
          password: values.password,
        });

        // Assuming verifyPassword is an asynchronous function that returns a promise
        await toast.promise(loginPromise, {
          loading: "Checking...",
          success: <b>Login Successfully...!</b>,
          error: <b>Password Not Match!</b>,
          duration: 3000,
        });

        const res = await loginPromise;
        let { token } = res.data;
        localStorage.setItem("token", token);
        window.localStorage.setItem("loggedIn", true);
        navigate("/profile");
      } catch (error) {
        console.error("Login error:", error);

        // Handle the error as needed, for example, show a toast or display an error message.
      }
    },
  });
  if (isLoading)
    return (
      <div
        className="flex justify-center items-center"
        style={{ display: "grid", margin: "5rem auto" }}
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
          size={250}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;

  return (
    <div className={`container mx-auto ${styles.container}`}>
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div
        className="flex justify-center items-center h-screen"
        style={{ height: "fit-content", margin: "30px auto" }}
      >
        <div className={styles.glass}>
          <div
            className={styles.backArrow}
            onClick={() => (window.location.href = "./username")}
          >
            <FaArrowLeft />
          </div>
          <div className="title flex flex-col items-center justify-center">
            <h4 className="text-5xl font-bold ">
              <span>Hello </span>
              <br />
              <span>{apiData?.name || apiData?.username}</span>
              <hr
                style={{
                  background: "#ff6a6a",
                  width: "220px",
                  height: "6px",
                  border: "none",
                  margin: "5px auto",
                  borderRadius: "3px",
                }}
              />
            </h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Explore More by connecting with us.
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img
                src={apiData?.profile || avatar}
                className={styles.profile_img}
                alt="avatar"
              />
            </div>

            <div className={`${styles.input}`}>
              <MdOutlinePassword
                style={{ margin: "0 30px", color: "grey", fontSize: "3rem" }}
              />
              <input
                {...formik.getFieldProps("password")}
                className={styles.textbox}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <BiSolidHide
                    style={{
                      margin: "0 30px",
                      color: "grey",
                      fontSize: "2.2rem",
                    }}
                  />
                ) : (
                  <BiSolidShow
                    style={{
                      margin: "0 30px",
                      color: "grey",
                      fontSize: "2.2rem",
                    }}
                  />
                )}
              </button>
            </div>
            <div className="flex justify-center align-center">
              <button className={styles.btn} type="submit">
                Sign In
              </button>
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">
                Forgot Password?{" "}
                <Link className="text-red-500" to="/recovery">
                  Recover Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
