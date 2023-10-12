import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Otplogin.css'
import axios from 'axios'; 


const OtpLogin = ({ setIsUserAuthenticated}) => {
  const navigate = useNavigate()
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [Data, setData] = useState('');

  

  const handleSendOtp = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/api/auth/sendotp',
        {
          phoneNumber: phoneNumber,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 200) {
        setIsOtpSent(true);
      } else {
        // Handle error response from the backend
        alert('Failed to send OTP');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/api/auth/verifyotp',
        { phoneNumber: phoneNumber,
           otp: otp },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setIsUserAuthenticated(true);
        alert('Login successful!');
        navigate('/schedule');
      } else {
        // Handle error response from the backend
        alert('Failed to verify OTP');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='otpcard'>
    <Container maxWidth="xs">
      <Paper elevation={3} className="otp-login">
        <Typography variant="h4" align="center" gutterBottom>
          PrestoClean OTP Login
        </Typography>
        {isOtpSent ? (
          <div>
            <TextField
              label="OTP"
              fullWidth
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
            >
              Login
            </Button>
          </div>
        ) : (
          <div>
            <TextField
              label="Phone Number"
              fullWidth
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSendOtp}
            >
              Send OTP
            </Button>
          </div>
        )}
      </Paper>
    </Container>
    </div>
  );
};

export default OtpLogin;