import { create } from "zustand";
import { complainGet, complainPost } from "../api/complain";
import { devtools } from "zustand/middleware";
import { notify } from "../utils/utility";

const useComplainStore = create(
  devtools((set) => ({
    loading: false,
    error: false,
    success: false,
    complaints: [],

    fetchData: async (formData) => { 
      set({ loading: true, error: false, success: false });

      try {
        const response = await complainPost(formData);

        if (response.success) {
          set({ success: true, error: false });
        //   notify(`${response.message} success`)
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
        const response = await complainGet();
        if (response.success) {
            set({ complaints: response.complaints, success: true, error: false });
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

export default useComplainStore;
