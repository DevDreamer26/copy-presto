import React from "react";
import { Link } from "react-router-dom";
import Ownernavbar from "./Ownernavbar";
import photo from "../../../assets/laundry-room-ideas-1673364594.jpeg";

function Shop() {
  return (
    <div>
      <Ownernavbar />
      <div className="shop-div">
        <Link to="/Admin_Dashboard" style={{ textDecoration: "none" }}>
          <div className="shop-cards">
            <div className="shop-photo">
              <img src={photo} alt="Laundry" width={250} />
            </div>
            <div className="place">Hengerabari, Guwahati</div>
            <div className="time">Open: 9 AM to 8 PM</div>
          </div>
        </Link>
        <Link to="/Admin_Dashboardzoo" style={{ textDecoration: "none" }}>
          <div className="shop-cards">
            <div className="shop-photo">
              <img src={photo} alt="Laundry" width={250} />
            </div>
            <div className="place">Zoo-Road, Guwahati</div>
            <div className="time">Open: 9 AM to 8 PM</div>
          </div>
        </Link>
        <Link to="/Admin_Dashboardtotal" style={{ textDecoration: "none" }}>
        <div
          className="shop-cards"
          style={{
            paddingLeft: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="shop-photo">
            <img src={photo} alt="Laundry" width={250} />
          </div>
          <div style={{ paddingLeft: "none" }}>Total Details</div>
        </div>
        </Link>
      </div>
    </div>
  );
}

export default Shop;
