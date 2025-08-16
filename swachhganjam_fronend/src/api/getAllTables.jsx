import axios from "axios";
import { notify } from "../utils/utility";

const API_BASE_URL = `${window.config.API_BASE_URL}admin/`;

export const getComplaintData = async () => {  
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

  //get machinerData
  export const getMachineryData = async () => {  
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
      return response.data;
    } catch (error) {
      console.error("API request failed:", error);
  
      return {
        success: false,
        message: error.response?.data?.message || "Something went wrong. Please try again.",
      };
    }
  };

  //get Qube Data

  export const getQubeData = async () => {  
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

  //get MoKhhata Data

  export const getMokhataData = async () => {  
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

  // Add below each GET function

export const updateComplaintData = async (id, data) => {
  const token = localStorage.getItem("token");
  if (!token) return { success: false, message: "Unauthorized" };

  try {
    const response = await axios.put(
      `${API_BASE_URL}complaint/${id}`,   
      data,                               
      {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // optional, but ensures JSON
    },
  }
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update complaint data.",
    };
  }
};

export const updateMachineryData = async (id, data) => {
  const token = localStorage.getItem("token");
  if (!token) return { success: false, message: "Unauthorized" };

  try {
    const response = await axios.put(
      `${API_BASE_URL}machinery-defect/${id}`,
      data,
      {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // optional, but ensures JSON
    },
  }
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update machinery data.",
    };
  }
};


export const updateQubeData = async (id, data) => {
  const token = localStorage.getItem("token");
  if (!token) return { success: false, message: "Unauthorized" };

  try {
    const response = await axios.put(
      `${API_BASE_URL}queue-fulfillments/${id}`,
      data,
      {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // optional, but ensures JSON
    },
  }
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update qube data.",
    };
  }
};


export const updateMokhataData = async (id, data) => {
  const token = localStorage.getItem("token");
  if (!token) return { success: false, message: "Unauthorized" };

  try {
    const response = await axios.put(
      `${API_BASE_URL}mo-khatas/${id}`,
      data,
        {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // optional, but ensures JSON
    },
  }
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update mokhata data.",
    };
  }
};

