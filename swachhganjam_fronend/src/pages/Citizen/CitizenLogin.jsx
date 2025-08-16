import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  Tabs,
  Tab
} from "@mui/material";
import LoginForm from "../../components/LoginForm";
import whiteLogo from "../../assets/white-logo.png";
import mainLogo from "../../assets/logo.jpg";
import greenLogo from "../../assets/green-logo.png";
import whitMainLogo from "../../assets/white-main-logo.png"
import useLoginStore from "../../store/useLoginStore";
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import HelpSupport from "../../components/HelpSupport";

const CitizenLogin = () => {
  const [loginType, setLoginType] = useState("otp");
  const [userType, setUserType] = useState("citizen")
  const { setPhoneNumber, setOtp, setUserName, setUserPassword } = useLoginStore();
  const [helpSupport, setHelpSupport] = useState(false)
  const getYear = new Date().getFullYear();
  

  const {userRole, setUserRole} = useLoginStore();

  const handleLogin = (data) => {
    console.log("Citizen Login Data:", data);
  };

  const handleChange = (event, newValue) => {
    setUserType(newValue);
    setLoginType(newValue === "citizen" ? "otp" : "password");
    setPhoneNumber("");
    setOtp("");
    setUserName("");
    setUserPassword("")
  };

  useEffect(() =>{
    setUserRole(userType)
  },[])

  console.log(userRole);
  
  const openHelpSupport = () =>{
    setHelpSupport(true)
  }
  const handleClose = () =>{
    setHelpSupport(false)
  }
  return (
    <>
    {helpSupport &&(
      <HelpSupport open ={helpSupport} close={handleClose} />
    )}
    <div className="md:hidden w-full bg-orange-600 text-white px-4 py-2"> 
      <div className="flex items-center gap-2 ">
            <img src={mainLogo} alt="Logo" className="h-12" />
            <h1 className="text-2xl font-bold">Solid Waste Management</h1>
          </div>
          </div>
    <Box className="h-screen flex">
      {/* Left Side: Information Panel */}
      <div className="relative hidden md:flex md:flex-5 bg-gradient-to-br from-orange-800 to-orange-500 text-white">
        <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: "url('https://kzmovhe0yz63330cxncb.lite.vusercontent.net/placeholder.svg?height=800&width=800')" }} />
        <div className="relative z-10 flex flex-col h-full p-8 md:p-12">
          <div className="flex items-center gap-2 mb-8">
            <img src={mainLogo} alt="Logo" className="h-15 rounded-full" />
            <h1 className="text-2xl font-bold">GOPALPUR N.A.C</h1>
          </div>
          <div className="my-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Solid Waste Management System
            </h2>
            <p className="text-lg md:text-xl max-w-md mb-8 text-green-50">
              Join our community effort to create a cleaner, greener environment through responsible waste management.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
              {["Paper", "Glass", "Organic", "Plastic"].map((type) => (
                <div
                  key={type}
                  className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-center border border-white/20"
                >
                  <div className="uppercase text-xs font-semibold tracking-wider mb-2 text-green-200">
                    {type}
                  </div>
                  <div className="w-12 h-12 mx-auto rounded-full bg-white/20 flex items-center justify-center">
                    <img src={whiteLogo} alt={type} className="h-12" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-auto text-sm text-green-200">
            © {getYear} Solid Waste Management System
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex-4 flex items-center justify-center min-h-screen bg-white overflow-x-hidden px-2">
  <div className="w-full max-w-sm sm:max-w-md px-4 py-4 sm:py-8 min-h-screen sm:min-h-fit text-center justify-center border-none shadow-none sm:shadow-lg sm:border border-gray-300 bg-white">
    <div className="text-center flex items-center justify-center flex-col">
      <div className="h-40 w-40 sm:h-25 sm:w-25 rounded-full bg-[#eaeaea] flex items-center justify-center mb-6 sm:mb-4">
        <img src={mainLogo} alt="Logo" className="h-30 w-30 sm:h-25  object-contain" />
      </div>

      <div className="w-full overflow-x-auto">
        <Tabs
          className="grid grid-cols-3 mb-6 min-w-[300px] "
          value={userType}
          onChange={handleChange}
          centered
          textColor="black"
           TabIndicatorProps={{
        style: {
          backgroundColor: "orange", // ✅ works
          height: 3                 // optional: thickness
        }
      }}
        >
          <Tab label="Citizen" value="citizen" />
          <Tab label="Supervisor" value="supervisor" />
          <Tab label="Admin" value="admin" />
        </Tabs>
      </div>

      <h3 className="text-3xl sm:text-2xl font-bold mb-3">
        {userType === "citizen" ? "Citizen Login" : userType === "admin" ? "Admin Login" : "Supervisor Login"}
      </h3>

      <Typography variant="body2" className="text-gray-600 text-lg sm:text-sm">
        Welcome to the Solid Waste Management System
      </Typography>
    </div>

    <div className="mt-6">
      <LoginForm
        onLogin={handleLogin}
        loginType={loginType}
        userType={userType}
        setLoginType={setLoginType}
      />
    </div>

    <div className="flex flex-col space-y-2 text-center text-[14px] sm:text-[12px] text-gray-600 mt-4">
      <div>
        By logging in, you agree to our Terms of Service and Privacy Policy
      </div>
    </div>
  </div>
</div>


    </Box>
    <div className="absolute bottom-2 right-2 bg-gradient-to-br from-orange-800 to-orange-500 text-white px-4 py-4 rounded-full cursor-pointer" onClick={openHelpSupport}>
       <ContactSupportIcon />
    </div>
    </>
  );
};

export default CitizenLogin;
