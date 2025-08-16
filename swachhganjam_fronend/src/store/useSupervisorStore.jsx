import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createUser, getUser } from "../api/auth";
import { notify } from "../utils/utility";


const userSupervisorStore = create(
  devtools((set) => ({
    loading: false,
    error: false,
    success: false,
    supervisor: [],
    citizen: [],

    fetchData: async (formData) => { 
      set({ loading: true, error: false, success: false });

      try {
        const response = await createUser(formData);

        if (response.success) {
          set({ success: true, error: false });
        notify(response.message, "success")
        } else {
          console.log(response)
          notify(response.message, "error")
          set({ error: true, success: false });
        }
      } catch (error) {
        set({ error: true, success: false });
        console.error("Error in fetchData:", error);
      } finally {
        set({ loading: false });
      }
    },
    getUser: async () => {
        set({ loading: true, error: false, success: false });
        try {
          const response = await getUser();
          if (response.success) {
            const supervisorUsers = response.users.filter(user => user.role === 'supervisor');
            set({ supervisor: supervisorUsers, success: true, error: false });
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

      getCitizenUser: async () => {
        set({ loading: true, error: false, success: false });
        try {
          const response = await getUser();
          if (response.success) {
            const supervisorUsers = response.users.filter(user => user.role === 'citizen');
            set({ citizen: supervisorUsers, success: true, error: false });
          } else {
            set({ error: true, success: false });
          }
        } catch (error) {
          set({ error: true, success: false });
          console.error("Error in fetchData:", error);
        } finally {
          set({ loading: false });
        }
      }
      
  }))
);

export default userSupervisorStore;
