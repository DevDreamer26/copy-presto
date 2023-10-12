import React from "react";

import "./srv.css";
import Navbar from '../Header/Navbar';
import fold from "../../assets/fold.jpeg";
import iron from "../../assets/iron.jpg";
import premium from "../../assets/premium.jpg";
import homeservice from "../../assets/home.jpg";
import drycleaning from "../../assets/dry.jpeg";
import Footer from "../Footer/Footer";

const services = () => {
  return (
    <div className="srv">
    <Navbar />
      <div className="svc" id="services"></div>
      <div className="section3">
        <div className="header">Our Services</div>
        <div className="card-align">
          <a className="card">
            <img src={fold} alt="djfbjs" />
            <h3>Wash and Fold</h3>
          </a>
          <a className="card">
            <img src={iron} alt="djfbjs" />
            <h3>Iron</h3>
          </a>
          <a className="card">
            <img src={premium} alt="djfbjs" />
            <h3>Premium Laundry</h3>
          </a>
          <a className="card">
            <img src={homeservice} alt="djfbjs" />
            <h3>Home services</h3>
          </a>
          <a className="card">
            <img src={drycleaning} alt="djfbjs" />
            <h3>Dry cleaning</h3>
          </a>
        </div>
      </div>
      <div className="content">
        <div className="wash">
          <h2>Wash and Fold</h2>
         
          <p>
           Wash and Fold is a convenient laundry service that takes
            the hassle out of doing your own laundry. With this service, you
            simply drop off your dirty clothes, and our professional team takes
            care of the rest. We carefully sort, wash, dry, and fold your
            garments to perfection, ensuring they come back to you fresh, clean,
            and neatly folded. Whether you're a busy professional, a parent with
            a busy schedule, or simply looking to save time and effort, our Wash
            and Fold service is the perfect solution for maintaining clean and
            well-organized laundry without the fuss.
          </p>
        </div>
        <div className="iron">
          <h2>Iron</h2>
          
          <p>
          Ironing: Our expert touch ensures your clothes are perfectly pressed and crease-free, enhancing your overall look with a neat and polished finish.
          </p>
        </div>
        <div className="prm">
          <h2>Premium Laundry</h2>
          
          <p>
          Elevate your laundry experience with our premium service. We go the extra mile to provide a top-tier cleaning and care for your garments. From luxurious fabrics to delicate items, our premium laundry service caters to your most treasured clothing. Using the latest technology and the gentlest detergents, we ensure that your clothes retain their color, softness, and quality. Our attention to detail extends to stain removal, careful handling, and expert folding. Experience the pinnacle of laundry care with our premium service, where your clothing is treated with the utmost respect and expertise.
          </p>
        </div>
        <div className="homeservice">
          <h2>Home Services</h2>
          
          <p>
            Convenience meets quality with our Home Services. We bring the laundry experience right to your doorstep, eliminating the need for you to step out. Our professional team collects your laundry, carefully washes and dries it, and returns it to your home, all within your preferred schedule.

          </p>
        </div>
        <div className="dry">
          <h2>Dry Cleaning</h2>
        
          <p>
          When it comes to delicate fabrics and garments that require special care, our Dry Cleaning service is the answer. We use advanced cleaning techniques that gently remove stains, odors, and dirt without subjecting your clothes to water. This process is ideal for items like suits, evening gowns, and delicate fabrics that can't be washed conventionally. 
          </p>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default services;
