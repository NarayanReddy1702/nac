import axios from "axios";
import { notify } from "../utils/utility";

const API_BASE_URL = window.config.API_BASE_URL;

export const loginWithPhone = async (phoneNumber, otp, userRole) => {
  console.log("User Role (Phone Login):", userRole);
  try {
    const response = await axios.post(`${API_BASE_URL}auth/login`, {
      phoneNumber,
      otp,
      role: userRole,
    });
    console.log("Phone login response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Phone login failed:", error);
    return {
      success: false,
      message: error.response?.message || "Login failed",
    };
  }
};

export const loginWithCredentials = async (userName, userPassword, userRole) => {
  console.log("User Role (Credentials Login):", userRole);
  try {
    const response = await axios.post(`${API_BASE_URL}auth/login`, {
      username: userName,
      password: userPassword,
      role: userRole,
    });
    console.log("Credentials login response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Credentials login failed:", error);
    return {
      success: false,
      message: error.response?.message || "Login failed",
    };
  }
};

export const logoutUser = async () => {
  try {
    await axios.post(`${API_BASE_URL}logout`);
    return true;
  } catch (error) {
    console.error("Logout failed:", error);
    return false;
  }
};

export const createUser = async (formData) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      `${API_BASE_URL}auth/supervisor`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    notify(error)
    return { success: false, message: "Request failed" };
  }
};


export const getUser = async() =>{
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found. User might be logged out.");
    return { success: false, message: "Unauthorized. Please log in again." };
  }
  try{
    const response = await axios.get(`${API_BASE_URL}admin/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
   console.log(response.data)
    return response.data;
  }
  catch(error) {
    console.error("API request failed:", error);
  }
 console.error("API request failed:", error);
}
