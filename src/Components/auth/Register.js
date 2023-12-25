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
import Form from "react-bootstrap/Form";

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

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center ">
        <div
          className={styles.glass}
          style={{ width: "70%", paddingTop: "3rem", height: "fit-content" }}
        >
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Registration</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Happy to join you!
            </span>
          </div>

          <Form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="flex justify-center items-center ">
              <h2 className="text-2xl font-bold">Register As :</h2>
              &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                required
                type="radio"
                name="UpserType"
                value="User"
                onChange={(e) => setRole(e.target.value)}
              />
              &nbsp;<h2 className=" font-bold">User</h2> &nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Or&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                required
                type="radio"
                name="UpserType"
                value="Admin"
                onChange={(e) => setRole(e.target.value)}
              />
              &nbsp; <h2 className=" font-bold">Admin</h2>
            </div>
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

            <div className="textbox flex flex-col items-center gap-6">
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
                style={{ width: "90%" }}
                {...formik.getFieldProps("username")}
                className={styles.textbox}
                type="text"
                placeholder="Username"
              />
              <input
                style={{ width: "90%" }}
                {...formik.getFieldProps("email")}
                className={styles.textbox}
                type="email"
                placeholder="Email"
              />
              <input
                style={{ width: "90%" }}
                {...formik.getFieldProps("password")}
                className={styles.textbox}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"} Password
              </button>

              <button className={styles.btn} type="submit">
                Register
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Already registered?
                <Link className="text-red-500" to="/username">
                  &nbsp;Login Now
                </Link>
              </span>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
