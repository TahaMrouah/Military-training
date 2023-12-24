import toast from "react-hot-toast";
import { auth } from "../helper/helper";

export async function usernameValidate(values) {
  const err = usernameVerify({}, values);
  if (values.username) {
    //check for user Existance
    const { status } = await auth(values.username);
    if (status !== 200) {
      err.exist = toast.error("User Does not exist..!");
    }
  }
  return err;
}
/** validate username */
const usernameVerify = (err = {}, values) => {
  if (!values.username) {
    err.username = toast.error("Username Required");
  } else if (values.username.includes(" ")) {
    err.username = toast.error("Username must not have spaces");
  }
  return err;
};

/** validate password */
export async function passwordValidate(values) {
  const errors = passwordVerify({}, values);

  return errors;
}
function passwordVerify(errors = {}, values) {
  /* eslint-disable no-useless-escape */
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!values.password) {
    errors.password = toast.error("Password Required...!");
  } else if (values.password.includes(" ")) {
    errors.password = toast.error("Wrong Password...!");
  } else if (values.password.length < 4) {
    errors.password = toast.error(
      "Password must be more than 4 characters long"
    );
  } else if (!specialChars.test(values.password)) {
    errors.password = toast.error("Password must have special character");
  }

  return errors;
}

/**Validate reset password */
export async function resetPasswordValidation(values) {
  const errors = passwordVerify({}, values);

  if (values.password !== values.confirm_pwd) {
    errors.exist = toast.error("Password not match...!");
  }

  return errors;
}
/**Validate Register Form */
export async function registerValidation(values) {
  const errors = usernameVerify({}, values);
  passwordVerify(errors, values);
  emailVerify(errors, values);

  return errors;
}
/** validate email */
function emailVerify(error = {}, values) {
  if (!values.email) {
    error.email = toast.error("Email Required...!");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Wrong Email...!");
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    error.email = toast.error("Invalid email address...!");
  }

  return error;
}

/** validate profile page */
export async function profileValidation(values) {
  const errors = emailVerify({}, values);
  return errors;
}
