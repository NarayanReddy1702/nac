import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { moKhhataGet, moKhhataPost, moKhhataPUT } from "../api/machinery";



const useMoKhhataStore = create(
  devtools((set) => ({
    loading: false,
    error: false,
    success: false,
    data: [],

    fetchData: async (formData) => { 
      set({ loading: true, error: false, success: false });

      try {
        const response = await moKhhataPost(formData);

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
        const response = await moKhhataGet();
        if (response.success) {
            set({ data: response.moKhatas, success: true, error: false });
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
        
    },

    putData: async (rowId,formData) => {
      set({ loading: true, error: false, success: false });
      try {
        const response = await moKhhataPUT(rowId, formData);
        if (response.success) {

          const updatedList = getData().data.map((item) =>
            item.id === id ? { ...item, ...formData } : item
          );
          set({ data: updatedList, success: true });
        } else {
          set({ error: true });
        }
      } catch (error) {
        console.error("Error in putData:", error);
        set({ error: true });
      } finally {
        set({ loading: false });
      }
    },
  }))
);

export default useMoKhhataStore;
