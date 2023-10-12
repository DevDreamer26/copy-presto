import React, { useState, useEffect } from "react";
import Axios from "axios";

import "./Admindashboard.css";
import Navbar from '../../Header/Navbar'
import { PieChart, Cell,  Pie, Legend, ResponsiveContainer } from "recharts";
import Footer from "../../Footer/Footer";
import { useNavigate } from "react-router-dom";
import Adminnavbartotal from "../Adminnavbar/Adminnavbartotal";


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042' , '#FFFF00'];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
const x = cx + radius * Math.cos(-midAngle * RADIAN);
const y = cy + radius * Math.sin(-midAngle * RADIAN);

return (
  <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
    {`${(percent * 100).toFixed(0)}%`}
  </text>
);
};




function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export default function Admindashboardtotal() {
  const [jsonData, setJsonData] = useState([]);
  const [PickupData, setPickupData] = useState([]);
  const [ReceivedData, setReceivedData] = useState([]);

  const [DeliveryData, setDeliveryData] = useState([]);
  const [TotalData, setTotalData] = useState([]);



  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const response = await Axios.get("http://localhost:8000/api/pending/orders",
      { withCredentials: true });
      setJsonData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);


  const pickupData = async () => {
    try {


      const response = await Axios.get("http://localhost:8000/api/pickup/orders",
      { withCredentials: true });

      setPickupData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
    pickupData();
  }, []);


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



  const deliveryData = async () => {
    try {
      const response = await Axios.get("http://localhost:8000/api/delivered/orders",
      { withCredentials: true });
      setDeliveryData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
    deliveryData();
  }, []);


  const totalData = async () => {
    try {
      const response = await Axios.get("http://localhost:8000/api/total/orders",
      { withCredentials: true }

      );
      setTotalData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
    totalData();
  }, []);


  const pickup =(order) =>{
    const setpickup = async () => {
      try {

        const response = await Axios.put(`http://localhost:8000/api/update/pending/topickup/${order._id}`,
        { withCredentials: true });

        alert('Order Ready to be picked up')
        fetchData()
        pickupData()
        receivedDetails()
        deliveryData()
        totalData()
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

      setpickup();

  }

  const received =(order) =>{
    const setreceived = async () => {
      try {
        const response = await Axios.put(`http://localhost:8000/api/update/pickup/toreceived/${order._id}`,
        { withCredentials: true });
        alert('Order Received')
        fetchData()
        pickupData()
        receivedDetails()
        deliveryData()
        totalData()
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

      setreceived();

  }

  const delivery =(order) =>{
    const setdelivery = async () => {
      try {
        const response = await Axios.put(`http://localhost:8000/api/update/received/todelivery/${order._id}`,
        { withCredentials: true });
        alert('Order Ready to be delivered')
        fetchData()
        pickupData()
        receivedDetails()
        deliveryData()
        totalData()
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

      setdelivery();

  }


  const handleDetailsClick = (order) => {
    navigate(`/PersonalDetails/${order._id}`);
  };


  const pieChartData = [
    { name: 'Pending', value: jsonData.length },
    { name: 'Pickup', value: PickupData.length },
    { name: 'Received', value: ReceivedData.length },
    { name: 'Delivered', value: DeliveryData.length },
    { name: 'Total', value: TotalData.length },
  ];



  return (
    <div>
      <Adminnavbartotal/>
      <div className="admincontainer">
        <div className="card-align">
            <div className="ordercard">
              <div className="header">Pending Orders</div>
              <p>{jsonData.length}</p>
            </div>
      
          <div className="ordercard">
            <div className="header">Pickup Orders</div>
            <p>{PickupData.length}</p>
          </div>
      
          {/* Remove the duplicated section here */}
          <div className="ordercard">
            <div className="header">Received Orders</div>
            <p>{ReceivedData.length}</p>
          </div>
     
          <div className="ordercard">
            <div className="header">Delivered</div>
            <p>{DeliveryData.length}</p>
          </div>
          <div className="ordercard">
            <div className="header">Total Orders</div>
            <p>{TotalData.length}</p>
          </div>
        </div>

        {/* The following section should remain outside of the jsonData.map() loop */}
        <div className="pending leg" style={{ width: "100%", height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="detailtable" id="PO">
          <div className="header">Pending Orders</div>
          <div className="scrollable-table">
            <table>
              <thead>
                <tr>
                  <th className="table-cell-head">Name</th>
                  <th className="table-cell-head">Pickup Date</th>
                  <th className="table-cell-head">Ordered Date</th>
                  <th className="table-cell-head">Details</th>
                  <th className="table-cell-head">Pick Up</th>
                </tr>
              </thead>
              <tbody>
                {jsonData.map((order) => (
                  <tr key={order.id}>
                    <td className="table-cell-body">{order.name}</td>
                    <td className="table-cell-body">{formatDate(order.pickupdate)}</td>
                    <td className="table-cell-body">{formatDate(order.createdat)}</td>
                    <td className="table-cell-body">
                      <div className="detbtn" onClick={() => handleDetailsClick(order)}>Details</div>
                    </td>
                    <td className="table-cell-body" onClick={() => pickup(order)}>
                      <div className="detbtn">Pick up</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="detailtable" id="PD">
          <div className="header">Pickup Details</div>
          <div className="scrollable-table">
            <table>
              <thead>
                <tr>
                  <th className="table-cell-head">Name</th>
                  <th className="table-cell-head">Pickup Date</th>
                  <th className="table-cell-head">Ordered Date</th>
                  <th className="table-cell-head">Details</th>
                  <th className="table-cell-head">Received</th>
                </tr>
              </thead>
              <tbody>
                {PickupData.map((order) => (
                  <tr key={order.id}>
                    <td className="table-cell-body">{order.name}</td>
                    <td className="table-cell-body">{formatDate(order.pickupdate)}</td>
                    <td className="table-cell-body">{formatDate(order.createdat)}</td>
                    <td className="table-cell-body">
                      <div className="detbtn" onClick={() => handleDetailsClick(order)}>Details</div>
                    </td>
                    <td className="table-cell-body" onClick={() => received(order)}>
                      <div className="detbtn">Received</div>
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="detailtable" id="OR">
          <div className="header">Order Received</div>
          <div className="scrollable-table">
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
                    <td className="table-cell-body">{formatDate(order.pickupdate)}</td>
                    <td className="table-cell-body">{formatDate(order.createdat)}</td>
                    <td className="table-cell-body">
                      <div className="detbtn" onClick={() => handleDetailsClick(order)}>Details</div>
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
        <div className="detailtable" id="DO">
          <div className="header">Delivery Orders</div>
          <div className="scrollable-table">
            <table>
              <thead>
                <tr>
                  <th className="table-cell-head">Name</th>
                  <th className="table-cell-head">Pickup Date</th>
                  <th className="table-cell-head">Ordered Date</th>
                  <th className="table-cell-head">Details</th>
                  
                </tr>
              </thead>
              <tbody>
                {DeliveryData.map((order) => (
                  <tr key={order.id}>
                    <td className="table-cell-body">{order.name}</td>
                    <td className="table-cell-body">{formatDate(order.pickupdate)}</td>
                    <td className="table-cell-body">{formatDate(order.createdat)}</td>
                    <td className="table-cell-body">
                      <div className="detbtn" onClick={() => handleDetailsClick(order)}>Details</div>
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="detailtable" id="TO">
          <div className="header">Total Orders</div>
          <div className="scrollable-table">
            <table>
              <thead>
                <tr>
                  <th className="table-cell-head">Name</th>
                  <th className="table-cell-head">Pickup Date</th>
                  <th className="table-cell-head">Ordered Date</th>
                  <th className="table-cell-head">Details</th>
                  
                </tr>
              </thead>
              <tbody>
                {TotalData.map((order) => (
                  <tr key={order.id}>
                    <td className="table-cell-body">{order.name}</td>
                    <td className="table-cell-body">{formatDate(order.pickupdate)}</td>
                    <td className="table-cell-body">{formatDate(order.createdat)}</td>
                    <td className="table-cell-body">
                      <div className="detbtn" onClick={() => handleDetailsClick(order)}>Details</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
