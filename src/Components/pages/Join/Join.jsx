import React from "react";
import "./Join.css";
import { useRef } from "react";
import emailjs from "@emailjs/browser";

export const Join = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_aecirnh",
        "template_9c7a6ga",
        form.current,
        "zH63mQwdc8C-umJK8"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <div className="join" id="join-us">
      <div className="left-j">
        <hr />
        <div>
          <span className="stroke-text">READY TO</span>
          <span>LEVEL UP</span>
        </div>
        <div>
          <span>YOUR BODY</span>
          <span className="stroke-text">WITH US?</span>
        </div>
      </div>
      <div className="right-j">
        <form
          ref={form}
          action=""
          className="email-container"
          onSubmit={sendEmail}
        >
          <input
            required
            type="email"
            name="user_email"
            placeholder="Enter Your Email Address "
          />
          <button className="btn btn-j">Join Now</button>
        </form>
      </div>
    </div>
  );
};
