import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./PersonalDetails.css";
import Adminnavbar from "../Adminnavbar/Adminnavbar";
import Axios from 'axios'
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";




function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}


function PersonalDetails() {
  const { id } = useParams();
  const [details, setDetails] = useState({})


  const detail = async () => {
    try {
      const response = await Axios.get(`http://localhost:8000/api/single/order/${id}`,
        { withCredentials: true });

      setDetails(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    detail();
  }, []);



  return (
    <div>
      <Adminnavbar />
      <div className="admincont" key={details._id}>
        <div className="PDMain">
          <div className="Details">
            <div className="cont-left">
              <h5>Name: </h5>
              <h5>{details.name}</h5>
            </div>
            <div className="cont-right">
              <h5>Phone Number: </h5>
              <h5>{details.phoneno}</h5>
            </div>
          </div>
          <div className="Details1">
            <div className="cont-left">
              <h5>Order Date: </h5>
              <h5>{formatDate(details.createdat)}</h5>
            </div>
            <div className="cont-right">
              <h5>Pickup Date: </h5>
              <h5>{formatDate(details.pickupdate)}</h5>
            </div>
          </div>
          <div className="Details1">
            <div className="cont-left">
              <h5>Pincode: </h5>
              <h5>{details.Pincode}</h5>
            </div>
            <div className="cont-right">
              <h5>House No:</h5>
              <h5>{details.hno}</h5>
            </div>
          </div>
          <div className="Details1">
            <div className="cont-left">
              <h5>Address: </h5>
              <h5>{details.address}</h5>
            </div>
            <div className="cont-right">
              <h5>Landmark:</h5>
              <h5>{details.Landmark}</h5>
            </div>
          </div>
          <div className="Details1">
            <div className="cont-left">
              <h5>Status: </h5>
              <h5>{details.orderreceived}</h5>
            </div>
            <div className="cont-right">
              <h5>Store: </h5>
              <h5>{details.servicelocation}</h5>
            </div>
            </div>
            <div className="Details1">
            {details._id && (
            <div className="cont-left">
              <h5>QR:</h5>
              <QRCode value={`http://192.168.1.43:5173/PersonalDetails/order/${id}`} />

            </div>
          )}
              <div className="cont-right">
              <h5>Service: </h5>
              <h5>{details.service}</h5>
            </div>
            </div>
            <div className="Details1">
            <div className="cont-left">
              <h5>price: </h5>
              <h5>{details.price}</h5>
            </div>
            </div>

          
        </div>
      </div>
    </div>
  );
}

export default PersonalDetails;
