import axios from "axios";
import { notify } from "../utils/utility";

const API_BASE_URL = `${window.config.API_BASE_URL}citizen/`;

export const complainPost = async (formData) => {
    const token = localStorage.getItem("token");
    console.log(formData)
 
  if (!token) {
    console.error("No token found. User might be logged out.");
    return { success: false, message: "Unauthorized. Please log in again." };
  }

  try {
    const response = await axios.post(
      `${API_BASE_URL}complaint`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    notify(response.data.message, "success");
    return response.data;
  } catch (error) {
     notify(`Complaint Error: ${error}`, "error");
    console.error("API request failed:", error);

    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong. Please try again.",
    };
  }
};


export const complainGet = async () => {  
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. User might be logged out.");
      return { success: false, message: "Unauthorized. Please log in again." };
    }
  
    try {
      const response = await axios.get(`${API_BASE_URL}complaints`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error("API request failed:", error);
  
      return {
        success: false,
        message: error.response?.data?.message || "Something went wrong. Please try again.",
      };
    }
  };