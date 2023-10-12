import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const OtpLogin = ({setIsAdminAuthenticated}) => {
  const navigate = useNavigate()
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleSendOtp = () => {

    setIsOtpSent(true);
  };

  const handleLogin = () => {
    alert('Login successful!');
    setIsAdminAuthenticated(true)
    navigate('/schedule')
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} className="otp-login">
        <Typography variant="h4" align="center" gutterBottom>
          Enter your Phone Number
        </Typography>
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
              Login
            </Button>
          </div>
      </Paper>
    </Container>
  );
};

export default OtpLogin;
