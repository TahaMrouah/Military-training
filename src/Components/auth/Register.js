import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../../Assets/profile.png";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
//import { passwordValidate } from "../helper/validate";
import { registerValidation } from "../helper/validate";
import convertToBase64 from "../helper/convert";
import { registerUser } from "../helper/helper";
import styles from "../../styles/Username.module.css";
//import Form from "react-bootstrap/Form";
import bgImg from "../../Assets/img1.jpg";
//import { useForm } from "react-hook-form";

export default function Register() {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("");
  const [secretKey, setSecretKey] = useState();
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
        setRole("User");
        values = { ...values, profile: file || "", role: role || "User" };

        // Assuming registerUser is an asynchronous function that returns a promise
        await toast.promise(registerUser(values), {
          loading: "Creating...",
          success: <b>Register Successfully...!</b>,
          error: <b>Registration Failed. Username or email already used!!</b>,
        });

        navigate("/username");
      } catch (error) {
        console.error("Registration error:", error);
        // You can handle the error as needed, for example, show a toast or display an error message.
      }
    },
  });

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };
  /* const {
    formState: { errors },
  } = useForm();
*/
  return (
    <div className="register_container ">
      <section>
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="register">
          <div className="div1">
            <h1 className="text-2xl">Sign In</h1>
            <span>Register and enjoy the service</span>

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
              {role === "Admin" ? (
                <input
                  disabled
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
                Register
              </button>
              <div className="text-center py-4">
                <span className="text-gray-500">
                  Already registered ?
                  <Link className="text-red-500" to="/username">
                    &nbsp;Login Now
                  </Link>
                </span>
              </div>
            </form>
          </div>
          <div className="div2">
            <img src={bgImg} alt="" />
          </div>
        </div>
      </section>
    </div>
  );
}
