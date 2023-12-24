import React, { useState } from "react";
//import { Link } from "react-router-dom";
import avatar from "../../Assets/profile.png";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import useFetch from "../../hooks/fetch.hook";
//import { useNavigate } from "react-router-dom";
//import { passwordValidate } from "../helper/validate";
import { profileValidation } from "../helper/validate";
//import { useAuthStore } from "../../store/store";
import convertToBase64 from "../helper/convert";
import { updateUser } from "../helper/helper";
import styles from "../../styles/Username.module.css";
import extend from "../../styles/Profile.module.css";

export default function Profile() {
  // const navigate = useNavigate();
  const [{ isLoading, apiData, serverError }] = useFetch();
  const [file, setFile] = useState();
  const formik = useFormik({
    initialValues: {
      name: apiData?.name || "",
      lname: apiData?.lname || "",
      email: apiData?.email || "",
      address: apiData?.address || "",
      mobile: apiData?.mobile || "",
      city: apiData?.city || "",
      service: apiData?.service || "",
      weight: apiData?.weight || "",
      height: apiData?.height || "",
    },
    enableReinitialize: true,
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async (values) => {
      // Ensure that file is defined before appending it to values
      values = { ...values, profile: file || apiData?.profile || "" };

      try {
        // Assuming updateUser is an asynchronous function that returns a promise
        const updatePromise = updateUser(values);

        await toast.promise(updatePromise, {
          loading: "Updating...",
          success: <b>Update Successfully...!</b>,
          error: <b>Could not Update!</b>,
        });

        const result = updatePromise;
        console.log(result.data);
        // Assuming result has a 'data' property

        // Redirect to the profile page or another page upon successful update
      } catch (error) {
        console.error("Update error:", error);
        // Handle the error as needed, for example, show a toast or display an error message.
      }
    },
  });

  const onUpload = async (e) => {
    try {
      const base64 = await convertToBase64(e.target.files[0]);
      console.log("Base64 Image:", base64);
      setFile(base64);
    } catch (error) {
      console.error("Image upload error:", error);
    }
  };
  //logout user function
  const userlogout = () => {
    /*localStorage.removeItem("token");
    localStorage.setItem("loggedIn", false);*/
    window.localStorage.clear();
    window.location.href = "./username";
  };
  if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;
  return (
    <div className={`container mx-auto  `}>
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center ">
        <div
          className={`${styles.glass} ${extend.glass}`}
          style={{ width: "80%", height: "fit-content" }}
        >
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Profile</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              You can update your profile!
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                {" "}
                <img
                  src={apiData?.profile || file || avatar}
                  className={`${styles.profile_img}  ${extend.profile_img}`}
                  alt="Profile Img"
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
              <div className="name flex w-3/4 gap-10">
                <input
                  {...formik.getFieldProps("name")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="First Name"
                />
                <input
                  {...formik.getFieldProps("lname")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="Last Name"
                />
              </div>
              <div className="name flex w-3/4 gap-10">
                <input
                  {...formik.getFieldProps("mobile")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="Mobile No."
                />
                <input
                  {...formik.getFieldProps("email")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="email"
                  placeholder="Email"
                  disabled
                />
              </div>
              <div className="name flex w-3/4 gap-10">
                <input
                  {...formik.getFieldProps("weight")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="number"
                  placeholder="Weight Kg"
                />
                <input
                  {...formik.getFieldProps("height")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="number"
                  placeholder="Height Cm"
                />
              </div>
              <label>Address:</label>
              <input
                {...formik.getFieldProps("address")}
                className={`${styles.textbox} ${extend.textbox}`}
                type="text"
                placeholder="Address"
              />
              <div className="name flex w-3/4 gap-10">
                <label
                  style={{
                    display: "block",
                    marginBottom: "10px",
                    fontSize: "16px",
                    color: "#333",
                  }}
                >
                  Services Options:
                  <select
                    style={{
                      width: "100%",
                      padding: "8px",
                      marginBottom: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                    {...formik.getFieldProps("service")}
                  >
                    <option value={null}> ....</option>
                    <option value="Fat-burning">Fat burning</option>
                    <option value="Muscle-Building">Muscle Building</option>
                    <option value="Endurance">Endurance</option>
                  </select>
                </label>
                <label
                  style={{
                    display: "block",
                    marginBottom: "10px",
                    fontSize: "16px",
                    color: "#333",
                  }}
                >
                  City:
                  <select
                    style={{
                      width: "100%",
                      padding: "8px",
                      marginBottom: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                    {...formik.getFieldProps("city")}
                  >
                    <option value={null}> ....</option>
                    <option value="Casablanca">Casablanca</option>
                    <option value="Rabat">Rabat</option>
                    <option value="Mouhamadia">Mouhamadia</option>
                    <option value="Salé">Salé</option>
                    <option value="Bouskoura">Bouskoura</option>
                  </select>
                </label>
              </div>

              <button className={styles.btn} type="submit">
                Update
              </button>
            </div>
          </form>
          <div className="text-center py-4">
            <span className="text-gray-500">
              Come back later?
              <button className="text-red-500" onClick={userlogout}>
                &nbsp;Logout
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
