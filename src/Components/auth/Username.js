import React from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../../Assets/profile.png";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { usernameValidate } from "../helper/validate";
import { useAuthStore } from "../../store/store";
import { FaUser } from "react-icons/fa";
import styles from "../../styles/Username.module.css";
import { FaArrowLeft } from "react-icons/fa";
import { Footer } from "../pages/Footer/Footer";

export default function Username() {
  const navigate = useNavigate();
  const setUsername = useAuthStore((state) => state.setUsername);

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setUsername(values.username);
      navigate("/password");
    },
  });

  return (
    <>
      <div className={`container mx-auto ${styles.container}`}>
        <Toaster position="top-center" reverseOrder={false}></Toaster>

        <div
          className="flex justify-center items-center h-screen"
          style={{ height: "fit-content", marginTop: "5rem" }}
        >
          <div className={styles.glass}>
            <div
              className={styles.backArrow}
              onClick={() => (window.location.href = "./")}
            >
              <FaArrowLeft />
            </div>
            <div className="title flex flex-col items-center">
              <h4 className="text-5xl font-bold text-center">Hello Again!</h4>
              <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                Explore More by connecting with us.
              </span>
            </div>

            <form className="py-1" onSubmit={formik.handleSubmit}>
              <div className="profile flex justify-center py-4">
                <img src={avatar} className={styles.profile_img} alt="avatar" />
              </div>

              <div className={`${styles.input}`}>
                <FaUser
                  style={{ margin: "0 30px", color: "grey", fontSize: "2rem" }}
                />
                <input
                  {...formik.getFieldProps("username")}
                  className={styles.textbox}
                  type="text"
                  placeholder="Username"
                />
              </div>
              <div className="flex justify-center align-center">
                <button className={`${styles.btn} `} type="submit">
                  Continue
                </button>
              </div>
              <div className="text-center py-4">
                <span className="text-gray-500">
                  Not a Member ?&nbsp;
                  <Link className="text-red-500" to="/register">
                    Register Now!
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
      <br />
      <Footer></Footer>
    </>
  );
}
