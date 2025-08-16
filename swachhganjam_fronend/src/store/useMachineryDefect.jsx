import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { enquiryGet, enquiryPost } from "../api/machinery";


const useMachineryStore = create(
  devtools((set) => ({
    loading: false,
    error: false,
    success: false,
    machinery: [],

    fetchData: async (formData) => { 
      set({ loading: true, error: false, success: false });

      try {
        const response = await enquiryPost(formData);

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
        const response = await enquiryGet();
        if (response.success) {
            set({ machinery: response.defects, success: true, error: false });
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

export default useMachineryStore;
