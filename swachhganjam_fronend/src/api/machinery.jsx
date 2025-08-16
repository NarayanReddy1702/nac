import axios from "axios";
import { notify } from "../utils/utility";

const API_BASE_URL = `${window.config.API_BASE_URL}supervisor/`;

export const enquiryPost = async (formData) => {
    const token = localStorage.getItem("token");
   
  if (!token) {
    console.error("No token found. User might be logged out.");
    return { success: false, message: "Unauthorized. Please log in again." };
  }

  try {
    const response = await axios.post(
      `${API_BASE_URL}machinery-defect`,
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


export const enquiryGet = async () => {  
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. User might be logged out.");
      return { success: false, message: "Unauthorized. Please log in again." };
    }
  
    try {
      const response = await axios.get(`${API_BASE_URL}machinery-defects`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
     console.log(response.data)
      return response.data;
    } catch (error) {
      console.error("API request failed:", error);
  
      return {
        success: false,
        message: error.response?.data?.message || "Something went wrong. Please try again.",
      };
    }
  };

  // Quobe

  export const quobePost = async (formData) => {
    const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found. User might be logged out.");
    return { success: false, message: "Unauthorized. Please log in again." };
  }

  try {
    const response = await axios.post(
      `${API_BASE_URL}queue-fulfillment`,
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


export const quobeGet = async () => {  
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. User might be logged out.");
      return { success: false, message: "Unauthorized. Please log in again." };
    }
  
    try {
      const response = await axios.get(`${API_BASE_URL}queue-fulfillments`, {
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

// Mo-Khhata

export const moKhhataPost = async (formData) => {
    const token = localStorage.getItem("token");
 
  if (!token) {
    console.error("No token found. User might be logged out.");
    return { success: false, message: "Unauthorized. Please log in again." };
  }

  try {
    const response = await axios.post(
      `${API_BASE_URL}mo-khata`,
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


export const moKhhataGet = async () => {  
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. User might be logged out.");
      return { success: false, message: "Unauthorized. Please log in again." };
    }
  
    try {
      const response = await axios.get(`${API_BASE_URL}mo-khatas`, {
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

  // Put API

  export const moKhhataPUT = async (rowId, formData) => {
    const token = localStorage.getItem("token");
 
  if (!token) {
    console.error("No token found. User might be logged out.");
    return { success: false, message: "Unauthorized. Please log in again." };
  }

  try {
    const response = await axios.put(
      `${API_BASE_URL}mo-khatas-update/${rowId}`,
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