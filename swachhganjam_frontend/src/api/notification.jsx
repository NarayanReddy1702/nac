import axios from "axios";

const API_BASE_URL = `${window.config.API_BASE_URL}admin/`;

export const NotificationGet = async () => {  
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. User might be logged out.");
      return { success: false, message: "Unauthorized. Please log in again." };
    }
  
    try {
      const response = await axios.get(`${API_BASE_URL}notifications`, {
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

  export const NotificationPut = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found. User might be logged out.");
    return { success: false, message: "Unauthorized. Please log in again." };
  }

  try {
    const response = await axios.put(
      `${API_BASE_URL}notifications?is_seen=true`,
      {}, // empty body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("API request failed:", error);

    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong. Please try again.",
    };
  }
};
