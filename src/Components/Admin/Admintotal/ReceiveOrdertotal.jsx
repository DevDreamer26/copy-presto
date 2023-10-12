import React, { useState, useEffect } from "react";
import Axios from "axios";

import "./Admindashboard.css";
import Adminnavbartotal from "../Adminnavbar/Adminnavbartotal";

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function ReceiveOrdertotal() {
    const [ReceivedData, setReceivedData] = useState([]);
    const receivedDetails = async () => {
        try {
          const response = await Axios.get("http://localhost:8000/api/received/orders",
          { withCredentials: true });
          setReceivedData(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
    
      useEffect(() => {
        receivedDetails();
      }, []);

      const handleDetailsClick = (order) => {
        navigate(`/PersonalDetails/${order._id}`);
      };


  return (
    <div>
      <Adminnavbartotal />
      <div className="tables">
        <table>
          <thead>
            <tr>
              <th className="table-cell-head">Name</th>
              <th className="table-cell-head">Pickup Date</th>
              <th className="table-cell-head">Ordered Date</th>
              <th className="table-cell-head">Details</th>
              <th className="table-cell-head">Delivery</th>
            </tr>
          </thead>
          <tbody>
            {ReceivedData.map((order) => (
              <tr key={order.id}>
                <td className="table-cell-body">{order.name}</td>
                <td className="table-cell-body">
                  {formatDate(order.pickupdate)}
                </td>
                <td className="table-cell-body">
                  {formatDate(order.createdat)}
                </td>
                <td className="table-cell-body">
                  <div className="detbtn" onClick={handleDetailsClick}>Details</div>
                </td>
                <td className="table-cell-body" onClick={() => delivery(order)}>
                  <div className="detbtn">Delivery</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReceiveOrdertotal;
