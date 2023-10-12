import React, { useState } from 'react';
import { Container, Typography, TextField, } from '@mui/material';
import './cnt.css';
import {MdLocationPin} from 'react-icons/md';
import {IoMdCall} from 'react-icons/io';
import {MdEmail} from 'react-icons/md'
import Navbar from '../Header/Navbar';
import Footer from '../Footer/Footer';
const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement your form submission logic here
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <Navbar />
    <Container className="contact-container" >
        <h1 className='ttl'>PRESTOCLEAN</h1>
        <div className='cntsec'>
        <p><MdLocationPin/>Center 1 ,Hengrabari, Guwahati</p>
            <p><MdLocationPin/>Center 2 , Zoo Road, Guwahati</p>
            <p><IoMdCall/> +91 6003509743</p>
            <p><MdEmail/>  prestoclean@gmail.com</p>
        </div>
      <h1 className="contact-heading">
        Contact Us
      </h1>
      <Typography variant="body1" className="contact-message" style={{textAlign:'center', fontSize:"20px"}}>
        If you have any questions, feel free to reach out to us.
      </Typography>
      <form onSubmit={handleSubmit} className="contact-form">
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <textarea
          placeholder="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="message-input"
        />
        <div className='div-btn'>
        <button
          type="submit"
          variant="contained"
          className="submit-button"
        >
          Submit
        </button>
        </div>

      </form>
    </Container>
    <Footer />
    </div>
  );
};

export default ContactUs;
