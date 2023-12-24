import React, { useState } from "react";
//import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import avatar from "../../Assets/profile.png";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import useFetch from "../../hooks/fetch.hook";
import RingLoader from "react-spinners/RingLoader";
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
  const [bfbFile, setBfbFile] = useState();
  const [bbbFile, setBbbFile] = useState();
  const [afbFile, setAfbFile] = useState();
  const [abbFile, setAbbFile] = useState();
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
      beforefrbody: apiData?.beforefrbody || "",
      beforebabody: apiData?.beforebabody || "",
      afterfrbody: apiData?.afterfrbody || "",
      afterbabody: apiData?.afterbabody || "",
    },
    enableReinitialize: true,
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async (values) => {
      // Ensure that file is defined before appending it to values
      values = {
        ...values,
        profile: file || apiData?.profile || "",
        beforefrbody: bfbFile || apiData?.beforefrbody || "",
        beforebabody: bbbFile || apiData?.beforebabody || "",
        afterfrbody: afbFile || apiData?.afterfrbody || "",
        afterbabody: abbFile || apiData?.afterbabody || "",
      };

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
  const onUploadBfb = async (e) => {
    try {
      const base64 = await convertToBase64(e.target.files[0]);
      console.log("Base64 Image (Before Front Body):", base64);
      setBfbFile(base64);
    } catch (error) {
      console.error("Image upload error (Before Front Body):", error);
    }
  };
  const onUploadBbb = async (e) => {
    try {
      const base64 = await convertToBase64(e.target.files[0]);
      console.log("Base64 Image (Before Front Body):", base64);
      setBbbFile(base64);
    } catch (error) {
      console.error("Image upload error (Before Front Body):", error);
    }
    // Similar logic for 'Before Back Body' image
  };
  const onUploadAfb = async (e) => {
    try {
      const base64 = await convertToBase64(e.target.files[0]);
      console.log("Base64 Image (Before Front Body):", base64);
      setAfbFile(base64);
    } catch (error) {
      console.error("Image upload error (Before Front Body):", error);
    }
    // Similar logic for 'After Front Body' image
  };
  const onUploadAbb = async (e) => {
    try {
      const base64 = await convertToBase64(e.target.files[0]);
      console.log("Base64 Image (Before Front Body):", base64);
      setAbbFile(base64);
    } catch (error) {
      console.error("Image upload error (Before Front Body):", error);
    }
    // Similar logic for 'After Back Body' image
  };
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
    window.location.href = "./";
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
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;
  return (
    <div className={`container mx-auto  `}>
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className={`flex justify-center items-center `}>
        <div
          className={`${styles.glass} ${extend.glass}`}
          style={{ width: "100%", height: "fit-content" }}
        >
          <div
            className={styles.backArrow}
            onClick={() => (window.location.href = "./")}
          >
            <FaArrowLeft />
          </div>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Profile</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              You can update your profile!
            </span>
          </div>

          <form className={`py-1 profile_form`} onSubmit={formik.handleSubmit}>
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
                style={{ display: "none" }}
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
                  inputMode="numeric"
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
                style={{ width: "70%" }}
                {...formik.getFieldProps("address")}
                className={`${styles.textbox} ${extend.textbox}`}
                type="text"
                placeholder="Address"
              />
              <div className="name name-center flex w-3/4 gap-10">
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
              <div className="images">
                {" "}
                <h4 className="text-3xl font-bold text-center">Before </h4>
                <div
                  style={{ display: "flex", justifyContent: "space-arround" }}
                  className="b1"
                >
                  <div className="imgs flex justify-center py-4">
                    <label htmlFor="bfb">
                      {" "}
                      <img
                        src={apiData?.beforefrbody || bfbFile || avatar}
                        className={`${styles.profile_img}  ${extend.profile_img}`}
                        alt="Before front body"
                      />
                    </label>
                    <input
                      onChange={onUploadBfb}
                      type="file"
                      name="bfb"
                      id="bfb"
                      style={{ display: "none" }}
                    />
                  </div>

                  <div className="imgs flex justify-center py-4">
                    <label htmlFor="bbb">
                      {" "}
                      <img
                        src={apiData?.beforebabody || bbbFile || avatar}
                        className={`${styles.profile_img}  ${extend.profile_img}`}
                        alt="Before front body"
                      />
                    </label>
                    <input
                      onChange={onUploadBbb}
                      type="file"
                      name="bbb"
                      id="bbb"
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
                <h4 className="text-3xl font-bold text-center">After </h4>
                <div
                  style={{ display: "flex", justifyContent: "space-arround" }}
                  className="b2"
                >
                  <div className="imgs flex justify-center py-4">
                    <label htmlFor="afb">
                      {" "}
                      <img
                        src={apiData?.afterfrbody || afbFile || avatar}
                        className={`${styles.profile_img}  ${extend.profile_img}`}
                        alt="Before front body"
                      />
                    </label>
                    <input
                      onChange={onUploadAfb}
                      type="file"
                      name="afb"
                      id="afb"
                      style={{ display: "none" }}
                    />
                  </div>

                  <div className="imgs flex justify-center py-4">
                    <label htmlFor="abb">
                      {" "}
                      <img
                        src={apiData?.afterbabody || abbFile || avatar}
                        className={`${styles.profile_img}  ${extend.profile_img}`}
                        alt="Before front body"
                      />
                    </label>
                    <input
                      onChange={onUploadAbb}
                      type="file"
                      name="abb"
                      id="abb"
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
              </div>
              <h2 className="text-1xl font-bold text-center">
                Your coach {apiData?.coach}
              </h2>
              <div className="flex justify-center py-4">
                <img
                  src={apiData?.coachImg}
                  className={`${styles.profile_img}  ${extend.profile_img}`}
                  alt="Coach_Image"
                />
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
