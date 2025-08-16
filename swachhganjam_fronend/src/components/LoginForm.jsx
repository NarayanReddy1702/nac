import React, { useEffect, useState, useTransition } from 'react';
import { TextField, Button, Box, Typography, CircularProgress, IconButton } from '@mui/material';
import useLoginStore from '../store/useLoginStore';
import { notify } from '../utils/utility';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { InputAdornment } from '@mui/material';

const LoginForm = ({ loginType, userType }) => {
  const [otpShow, setOtpShow] = useState(false);
  const { userRole, phoneNumber, otp, userName, userPassword, setUserRole, setPhoneNumber, setOtp, setUserName, setUserPassword, login } = useLoginStore();
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const navigate = useNavigate();

  useEffect(() =>{
    if(userType){
    setUserRole(userType)
    }
  },[userRole, userType])
  const handleGetOtp = () => {
    if (!phoneNumber || phoneNumber.length !== 10) {
      notify("Please enter a valid 10-digit phone number", "error");
      return;
    }
    setOtpShow(true);
  };

  // Function to handle Login Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();  
    startTransition(async () => {
      try {
        if (loginType === 'otp') {
          if (otp === '') {
            notify("Please enter the OTP", "error");
            return;
          }
          if (otp !== "1111") {

            notify("Incorrect OTP", "error");
            return;
          }
          const isSuccess = await login({phoneNumber, otp, userRole});
          console.log(isSuccess);
          
          if (isSuccess.success) {
            notify(isSuccess.message, "success");
            navigate("/complaint"); // Redirect to dashboard
          } else {
            notify(isSuccess.message, "error");
          }

        } else if (loginType === 'password') {
          if (!userName || !userPassword) {
            notify("Login Error: Username and Password are required", "error");
            return;
          }

          const isSuccess = await login({userName, userPassword, userRole});

          if (isSuccess.success) {
          
            notify(isSuccess.message, "success");
            {userRole === "supervisor" ?  navigate("/machinery") :  navigate("/admin/manageSupervisor");
              
             }

          } else {
            notify(isSuccess.message, "error");
          }
        } else {
          notify("Invalid login type", "error");
        }
      } catch (error) {
        notify("Login Failed: " + error.message, "error");
      }
    });
  };

  //function of handleKeyPress
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        if (loginType === 'otp' && !otpShow) {
          handleGetOtp();
        } else {
          handleSubmit(event);
        }
      }
    };
  
    window.addEventListener('keydown', handleKeyPress);
  
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [loginType, otpShow, phoneNumber, otp, userName, userPassword]);
  

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      {loginType === 'otp' ? (
        <>
          {/* Phone Number Field */}
          <TextField
          name="phoneNumber"
            label="Phone Number"
            fullWidth
            placeholder="Enter your Phone Number"
            margin="normal"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            disabled={otpShow}
            className='focus:border outline-none focus:border-orange-300'
          />

          {/* OTP Input Field */}
          {otpShow && (
            <>
              <TextField
              className='focus:border outline-none focus:border-orange-300'
                label="OTP"
                name="otp"
                fullWidth
                margin="normal"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                 
                }}
              
              />
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Use this OTP to log in: <strong>1111</strong>
              </Typography>
            </>
          )}
        </>
      ) : (
        <>
          {/* Username and Password Login */}
          <TextField
            label="Username"
            name="username"
            fullWidth
            margin="normal"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
           <TextField
      label="Password"
      type={showPassword ? 'text' : 'password'}
      fullWidth
      margin="normal"
      value={userPassword}
      onChange={(e) => setUserPassword(e.target.value)}
      required
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={handleTogglePassword}
              edge="end"
              aria-label="toggle password visibility"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
        </>
      )}

      {/* Get OTP Button (Only if OTP isn't already shown) */}
      {loginType === 'otp' && !otpShow ? (
        <Button className='bg-gradient-to-br from-orange-600 to-orange-500  '
          type="button"
          onClick={handleGetOtp}
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3, backgroundColor: "" }}
          disabled={isPending}
        >
          {isPending ? <CircularProgress size={24} /> : 'Get OTP'}
        </Button>
      ) : (
        <Button
        className='bg-gradient-to-br from-orange-800 to-orange-500'
          variant="contained"
          onClick={handleSubmit}
          color="primary"
          fullWidth
          sx={{ mt: 3, backgroundColor: "#16a249" }}
          disabled={isPending}
        >
          {isPending ? <CircularProgress size={24} /> : 'Login'}
        </Button>
      )}
    </Box>
  );
};

export default LoginForm;
