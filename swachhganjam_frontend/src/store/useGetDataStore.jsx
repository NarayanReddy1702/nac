import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { NotificationGet } from "../api/notification";
import { getComplaintData, getMachineryData, getMokhataData, getQubeData, updateComplaintData, updateMachineryData, updateMokhataData, updateQubeData } from "../api/getAllTables";
import { notify } from "../utils/utility";

export const useGetDataStore = create(
devtools((set) => ({
    loading: false,
    error: false,
    success: false,
    complaints: [],
    machinery:[],
    qubeData:[],
    moKhataData:[],

    getData: async() =>{
        set({ loading: true, error: false, success: false });
        try{
        const response = await getComplaintData();
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
        
    },

    // getMachiner
    getMachineryData: async() =>{
      set({ loading: true, error: false, success: false });
      try{
      const response = await getMachineryData();
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
      
  },

  //get Qube Data
   getQubeData: async() =>{
      set({ loading: true, error: false, success: false });
      try{
      const response = await getQubeData();
      if (response.success) {
          set({ qubeData: response.fulfillments, success: true, error: false });
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

  // get Mokhata Data

   getMokhataData: async() =>{
      set({ loading: true, error: false, success: false });
      try{
      const response = await getMokhataData();
      if (response.success) {
          set({ moKhataData: response.moKhatas, success: true, error: false });
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
  //  update complain data
  updateComaplain: async(rowId,formData) =>{
  set({ loading: true, error: false, success: false });
  
        try {
          const response = await updateComplaintData(rowId,formData);
          if (response.success) {
            notify(response.message, "success")
            set({ success: true, error: false });
          //   notify(`${response.message} success`)
          } else {
           notify(response.message, "error")
            set({ error: true, success: false });
          }
        } catch (error) {
          notify(response.message, "error")
          set({ error: true, success: false });
          console.error("Error in fetchData:", error);
        } finally {
          set({ loading: false });
        }
},
// update machinery data

updateMachinery: async(rowId,formData) =>{
  set({ loading: true, error: false, success: false });
  
        try {
          const response = await updateMachineryData(rowId,formData);
          if (response.success) {
            notify(response.message, "success")
            set({ success: true, error: false });
          //   notify(`${response.message} success`)
          } else {
            notify(response.message, "error")
            set({ error: true, success: false });
          }
        } catch (error) {
          notify(error, "error")
          set({ error: true, success: false });
          console.error("Error in fetchData:", error);
        } finally {
          set({ loading: false });
        }
},

//Update Qube Data
updateQube: async(rowId,formData) =>{
  set({ loading: true, error: false, success: false });
  
        try {
          const response = await updateQubeData(rowId,formData);
          if (response.success) {
            notify(response.message, "success")
            set({ success: true, error: false });
          //   notify(`${response.message} success`)
          } else {
            notify(response.message, "error")
            set({ error: true, success: false });
          }
        } catch (error) {
          notify(error, "error")
          set({ error: true, success: false });
          console.error("Error in fetchData:", error);
        } finally {
          set({ loading: false });
        }
},

updateMoKhata: async(rowId,formData) =>{
  set({ loading: true, error: false, success: false });
  
        try {
          const response = await updateMokhataData(rowId,formData);
          if (response.success) {
            notify(response.message, "success")
            set({ success: true, error: false });
          //   notify(`${response.message} success`)
          } else {
            notify(response.message, "error")
            set({ error: true, success: false });
          }
        } catch (error) {
          notify(error, "error")
          set({ error: true, success: false });
          console.error("Error in fetchData:", error);
        } finally {
          set({ loading: false });
        }
},

}))
);



