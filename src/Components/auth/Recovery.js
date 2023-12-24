import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { generateOTP, verifyOTP } from "../helper/helper";
import toast, { Toaster } from "react-hot-toast";
import { useAuthStore } from "../../store/store";
import styles from "../../styles/Username.module.css";

export default function Recovery() {
  const { username } = useAuthStore((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [OTP, setOTP] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    generateOTP(username)
      .then((generatedOTP) => {
        if (generatedOTP) {
          toast.success("OTP has been sent to your email!");
        } else {
          toast.error("Problem while generating OTP!");
        }
      })
      .catch((error) => {
        console.error("Error during OTP generation:", error);
        toast.error("An error occurred during OTP generation.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [username]);

  async function onSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true); // Set loading state when OTP verification starts
      const { status } = await verifyOTP({ username, code: OTP });
      if (status === 201) {
        toast.success("Verification Successful!");
        navigate("/reset");
      }
    } catch (error) {
      toast.error("Wrong OTP! Check email again!");
    } finally {
      setLoading(false); // Set loading state when OTP verification completes
    }
  }

  // handler of resend OTP
  function resendOTP() {
    let sendPromise = generateOTP(username);

    toast.promise(sendPromise, {
      loading: "Sending...",
      success: <b>OTP has been send to your email!</b>,
      error: <b>Could not Send it!</b>,
    });

    sendPromise.then((OTP) => {
      // console.log(OTP);
    });
  }
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen recovery">
        <div
          className={styles.glass}
          style={{ width: "70%", height: "fit-content" }}
        >
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Recovery</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter OTP to recover password
            </span>
          </div>

          <form className="pt-20" onSubmit={onSubmit} disabled={loading}>
            <div className="textbox flex flex-col items-center gap-6">
              <div className="input text-center">
                <span className="py-4 test-sm text-left text-gray-500">
                  Enter 6 digit OPT sent to Your email
                </span>
                <input
                  onChange={(e) => setOTP(e.target.value)}
                  value={OTP}
                  maxLength={6}
                  className={styles.textbox}
                  type="text"
                  placeholder="OTP"
                />
              </div>

              <button className={styles.btn} type="submit" disabled={loading}>
                {loading ? "Recovering..." : "Recovery"}
              </button>
            </div>
          </form>
          <div className="text-center py-4">
            <span className="text-gray-500">
              Can't get OTP?
              <button className="text-red-500" onClick={resendOTP}>
                Resend Now
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
