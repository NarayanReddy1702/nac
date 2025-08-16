import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { NotificationGet, NotificationPut } from "../api/notification";

export const useNotificationStore = create(
devtools((set) => ({
    loading: false,
    error: false,
    success: false,
    message: "",
    notification: [],
    seterror: false,

    getData: async() =>{
        set({ loading: true, error: false, success: false });
        try{
        const response = await NotificationGet();
        if (response.success) {
            set({ notification: response.notifications, success: true, error: false });
          } else {
            set({ notification:"",  error: true,success: false });
          }
        }
        catch(error){
           set({ error: true, success: false });
        console.error("Error in fetchData:", error);
      } finally {
        set({ loading: false });
      } 
        
    },
    updateData: async() =>{
      set({ loading: true, seterror: false, success: false });
      try{
        const response = await NotificationPut();
        if (response.success) {
            set({ success: true,  seterror: false });
          } else {
            set({ seterror: true,message: response.message, success: false });
          }
        }
        catch(error){
           set({ seterror: true, success: false });
        console.error("Error in fetchData:", error);
      } finally {
        set({ loading: false });
      } 
    }
}))
);
