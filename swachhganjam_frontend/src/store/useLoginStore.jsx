import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { loginWithCredentials, loginWithPhone } from '../api/auth';
import { jwtDecode } from 'jwt-decode';

const loginStore = (set, get) => ({
  phoneNumber: '',
  otp: '',
  isLoggedIn: false,
  userName: '',
  userPassword: '',
  token: null,
  userRole: null,
  logoutTimer: null,
  loginMessage: "",

  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setOtp: (otp) => set({ otp }),
  setUserName: (userName) => set({ userName }),
  setUserPassword: (userPassword) => set({ userPassword }),
  setUserRole: (userRole) => {
    localStorage.setItem('userRole', userRole);
    set({ userRole });
  },
  setLoginMessage: (msg) => set({ loginMessage: msg }),

  
  handleTokenExpiry: () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found, logging out...");
      get().logout();
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const { exp } = decodedToken;
      const expiryTime = exp * 1000;
      const currentTime = Date.now();
      const timeUntilExpiry = expiryTime - currentTime;

      if (timeUntilExpiry <= 0) {
        console.log("Token already expired, logging out...");
        get().logout();
      } else {
        const logoutTimer = setTimeout(() => {
          get().logout();
          console.log("Token expired! User logged out.");
        }, timeUntilExpiry);

        set({ logoutTimer });
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      get().logout();
    }
  },

  login: async ({ phoneNumber, otp, userRole, userName, userPassword }) => {

    let result = { success: false };
  
    if (phoneNumber && otp === '1111') {
      result = await loginWithPhone(phoneNumber, otp, userRole);
    } else if (userName && userPassword) {
      result = await loginWithCredentials(userName, userPassword, userRole);
    }
    get().setLoginMessage(result.message);
  
    if (result.success) {
      set({
        isLoggedIn: true,
        phoneNumber: "",
        otp: "",
        userName: "",
        userPassword: "",
        token: result.token,
        userRole: userRole,
      
      });
  
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('token', result.token);
      localStorage.setItem('userRole', userRole);
  
      get().handleTokenExpiry(result.token);
      return result;
    } else {
      return result;
    }
  },

  
  

  logout: async () => {
    set({
      isLoggedIn: false,
      phoneNumber: '',
      otp: '',
      userName: '',
      userPassword: '',
      token: null,
      userRole: null,
      loginMessage: " ",
    });

    const { logoutTimer } = get();
    if (logoutTimer) {
      clearTimeout(logoutTimer);
      set({ logoutTimer: null });
    }

    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');

    console.log("User logged out.");
  },
});

const useLoginStore = create(
  devtools(
    persist(loginStore, {
      name: 'login',
      getStorage: () => localStorage,
    })
  )
);

export default useLoginStore;
