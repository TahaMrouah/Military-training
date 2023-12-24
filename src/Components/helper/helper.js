import axios from "axios";
import { jwtDecode } from "jwt-decode";
axios.defaults.baseURL = "http://localhost:3001";

/** Make api request */

/** To get username from Token */
export async function getUsername() {
  const token = localStorage.getItem("token");
  if (!token) return Promise.reject("Cannot find Token");
  let decode = jwtDecode(token);
  return decode;
}
/**Auth function */
export async function auth(username) {
  try {
    return await axios.post("/api/auth", { username });
  } catch (error) {
    return { error: "Username Doesn't exist!" };
  }
}

/** Get user details */
export async function getUser({ username }) {
  try {
    const { data } = await axios.get(`/api/user/${username}`);
    return { data };
  } catch (error) {
    return { error: "Password doesn't match..!" };
  }
}

/** Register New User */
export async function registerUser(credentials) {
  try {
    const {
      data: { msg },
      status,
    } = await axios.post("/api/register", credentials);
    let { username, email } = credentials;
    /**send email */
    if (status === 201 || status === 200) {
      await axios.post("/api/registerMail", {
        username,
        userEmail: email,
        text: msg,
      });
    }
    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject({ error: "Registration failed", details: error });
  }
}

/** Login Function */
export async function verifyPassword({ username, password }) {
  try {
    if (username) {
      const { data } = await axios.post(`/api/login`, { username, password });
      console.log(data);
      return Promise.resolve({ data });
    }
  } catch (error) {
    console.log(error.error);
    return Promise.reject({ error: "Password doesn't match..!" });
  }
}

/**Update user profile Function */
export async function updateUser(response) {
  try {
    const token = localStorage ? await localStorage.getItem("token") : null;

    if (!token) {
      throw new Error("Token not available...!");
    }

    const data = await axios.put("/api/updateUser", response, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    return { error: "Couldn't Update Profile...!" };
  }
}

/**Generate OTP */

export async function generateOTP(username) {
  try {
    const {
      data: { code },
      status,
    } = await axios.get("/api/generateOTP", { params: { username } });
    if (status === 201 || status === 200) {
      //send  mail with otp
      let {
        data: { email },
      } = await getUser({ username });
      let text = `Your password Recovery OTP is ${code} ;Verify and recover your password.`;
      await axios.post("/api/registerMail", {
        username,
        userEmail: email,
        text,
        subject: "Password Recovery",
      });
    }
    return Promise.resolve(code);
  } catch (error) {
    return Promise.reject({ error: "Couldn't GenerateOTP'" });
  }
}
/** Verify OTP */
export async function verifyOTP({ username, code }) {
  try {
    const { data, status } = await axios.get("/api/verifyOTP", {
      params: { username, code },
    });
    return { data, status };
  } catch (error) {
    return Promise.reject({ error: "Couldn't verify OTP'" });
  }
}

/** reset password */
export async function resetPassword({ username, password }) {
  try {
    const { data, status } = await axios.put(`/api/resetPassword`, {
      username,
      password,
    });
    return Promise.resolve({ data, status });
  } catch (error) {
    return Promise.reject({ error: "Couldn't reset password", details: error });
  }
}
