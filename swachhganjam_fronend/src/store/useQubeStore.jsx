import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { quobeGet, quobePost } from "../api/machinery";



const useQubeStore = create(
  devtools((set) => ({
    loading: false,
    error: false,
    success: false,
    data: [],

    fetchData: async (formData) => { 
      set({ loading: true, error: false, success: false });

      try {
        const response = await quobePost(formData);

        if (response.success) {
          set({ success: true, error: false });
        } else {
          set({ error: true, success: false });
        }
      } catch (error) {
        set({ error: true, success: false });
        console.error("Error in fetchData:", error);
      } finally {
        set({ loading: false });
      }
    },
    getData: async() =>{
        set({ loading: true, error: false, success: false });
        try{
        const response = await quobeGet();
        if (response.success) {
            set({ data: response.fulfillments, success: true, error: false });
          } else {
            set({ error: true, success: false });
          }
        }
        catch(error){
           set({ error: true, success: false });
        console.error("Error in fetchData:", error);
      } finally {
        set({ loading: false });
      } 
        
    }
  }))
);

export default useQubeStore;
