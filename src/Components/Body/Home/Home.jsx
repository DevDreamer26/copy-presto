import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Laundry from "../../../assets/Laundry.png";
import iron from "../../../assets/iron.jpg";
import drycleaning from "../../../assets/dry-cleaning.jpg";
import fold from "../../../assets/fold.jpg";
import premium from "../../../assets/premium.jpg";
import homeservice from "../../../assets/home-service.jpg";
import "./Home.css";
import Navbar from "../../Header/Navbar";
import Footer from "../../Footer/Footer";

export default function Home() {
  const navigate = useNavigate();

  const handleSchedulePickup = () => {

    console.log("Current route:", window.location.pathname);
    navigate("/schedule");


  };


  return (
    <div className="home">
      <Navbar />
      <div className="home-main">
        <div className="home-container">
          <div className="intro">
            <div className="intro-text">
              <div className="intro-topic">
                <div className="companytitle">PrestoClean</div>
                <div className="tagline">Freshness delivered every wear</div>
              </div>
                <div className="intro-para">
                  <p>
                    Discover the perfect answer to your everyday laundry demands
                    with our top-notch service. Prestoclean is here to
                    revolutionize the way you approach laundry, saving you
                    valuable time and effort.
                  </p>
                  
                </div>
                <button
                  className="schedulebutton"
                  onClick={handleSchedulePickup}
                >
                  Schedule a pickup
                </button>
            </div>
            <div className="intro-image_container">
            <img className="intro-image" src={Laundry} alt="beautiful girl(introvert,shy)" />
            </div>
          </div>
          <div className="section2">
            <div className="header">How PrestoClean works</div>
            <div className="card-align">
              <div className="card">
                <h3>Schedule</h3>
                <p className="small">
                Schedule via our website, we are available for you
                </p>
              </div>
              <div className="card">
                <h3>Pickup</h3>
                <p className="small">
                  After you make a schedule, we will collect your laundry from your doorstep
                </p>
              </div>
              <div className="card">
                <h3>Clean</h3>
                <p className="small">
                Your clothes are expertly cleaned according to the Prestoclean's service you select.
                </p>
              </div>
              <div className="card">
                <h3>Deliver</h3>
                <p className="small">
                Standard turnaround time is 24-48 Hrs*, with same day express Delivery* available for a fee.
                </p>
              </div>
            </div>
          </div>
          <div className="svc"></div>
          <div className="section3">
            <div className="header">SERVICES</div>
            <div className="card-align">
              <a className="card" href="/">
                <img src={fold} />
                <h3>Wash and Fold</h3>
              </a>
              <a className="card" href="/">
                <img src={iron} />
                <h3>Iron</h3>
              </a>
              <a className="card">
                <img src={premium} />
                <h3>Premium Laundry</h3>
              </a>
              <a className="card">
                <img src={homeservice} />
                <h3>Home services</h3>
              </a>
              <a className="card">
                <img src={drycleaning} />
                <h3>Dry cleaning</h3>
              </a>
            </div>
          </div>
          <div>
            
          </div>
        </div>
      </div>
      {/* <button onClick={clearsession}>Logout</button> */}
      <Footer />
    </div>
  );
}
