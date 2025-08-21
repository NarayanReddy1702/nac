import { toast } from "react-toastify";
import {jwtDecode} from 'jwt-decode';

export const notify = (msg, type, position, time) => {
    position = position ? position : "BOTTOM_LEFT";
    time = time ? time : 4000;
    type = type ? type : "error";
    toast[type](msg, {
      position: 'bottom-left',
      autoClose: time,
      theme: "colored",
    });
  };

  export const localStorageFunc = {
    set: (key, value, expirySeconds) => {
      const expiryDate = new Date().getTime() + expirySeconds * 1000; // Convert to milliseconds
      const data = {
        value: value, 
        expiry: expiryDate
      };
      localStorage.setItem(key, JSON.stringify(data)); 
    },
  
    get: (key) => {
      const item = localStorage.getItem(key);
      if (!item) return null; 
  
      try {
        const data = JSON.parse(item);
        if (data.expiry && new Date().getTime() > data.expiry) {
          localStorage.removeItem(key); 
          return null;
        }
        return data.value; 
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
        return null;
      }
    },
  
    erase: (key) => {
      localStorage.removeItem(key);
    },
  
    eraseAll: () => {
      localStorage.clear();
    }
  };
  