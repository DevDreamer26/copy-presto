import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Admindashboard.css";
// import Navbar from "../../Header/Navbar";
import { PieChart, Cell, Pie, Legend, ResponsiveContainer } from "recharts";
import { Link, useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Adminnavbarzoo from "../../Adminnavbar/Adminnavbarzoo";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042' , '#EC33FF'];
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
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export default function Admindashboardzoo() {
  const [jsonData, setJsonData] = useState([]);
  const [PickupData, setPickupData] = useState([]);
  const [ReceivedData, setReceivedData] = useState([]);
  const [isOpen, setIsOpen] = useState(false)
  const [DeliveryData, setDeliveryData] = useState([]);
  const [TotalData, setTotalData] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [items, setItems] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [option, setOption] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [price, setPrice] = useState("");
  const [addedItems, setAddedItems] = useState([]);
  const [isAddItemPopupOpen, setIsAddItemPopupOpen] = useState(false);
  const [totalinc, setTotalinc] = useState("");

  const navigate = useNavigate();




  const fetchOptions = async () => {
    try {
      const response = await Axios.get("http://localhost:8000/api/finditems", { withCredentials: true });
      const names = response.data.map(item => item.item);
      setOption(names);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  useEffect(() => {
    fetchOptions();
  }, []);


  const handleOptionChange = (event, newValue) => {
    setSelectedOption(newValue);
  };


  const handleAddItem = () => {
    if (selectedOption && itemQuantity) {
      const newItem = {
        name: selectedOption,
        quantity: parseInt(itemQuantity), // Parse as integer
      };
      setAddedItems([...addedItems, newItem]);
      // Clear input fields
      setSelectedOption('');
      setItemQuantity('');
    }
  };

  const handleAddItemPopupClose = () => {
    // Clear added items when closing the popup
    setAddedItems([]);
    setIsAddItemPopupOpen(false);
    setIsOpen(false);
      
  };

  const handleFinalSubmit = async (selectedOrder) => {
    // Create an array of items with quantities
    const orderItems = addedItems.map((item) => ({
      item: item.name,
      quantity: item.quantity,
    }));
  
    // Log the added items to the console
    console.log("Added Items:", orderItems);
  
    // Optionally, you can clear the addedItems array here if needed
    setAddedItems([]);
  
    if (selectedOrder) {
      try {
        // Calculate price and update order
        await Axios.post(
          `http://localhost:8000/api/calculateprice/${selectedOrder._id}`,
          { items: orderItems },
          { withCredentials: true }
        );
  
        // Move order to the received state
        const response = await Axios.put(
          `http://localhost:8000/api/update/pickup/toreceived/${selectedOrder._id}`,
          {},
          { withCredentials: true }
        );
  
        alert("Order Received");
        fetchData();
        pickupData();
        receivedDetails();
        deliveryData();
        totalData();
        setIsOpen(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("data not submitted")
      }
    }
  
    // Clear the selected order and close the popup
    setSelectedOrder(null);
  
    // Close the popup
    setIsOpen(false);
  };

  const received = (order) => {
    setSelectedOrder(order);
    setIsOpen(true);
  };




  const totalincome = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:8000/api/calculatetotalprice",
        { withCredentials: true }
      );

      setTotalinc(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    totalincome();
  }, []);
  


  
  const fetchData = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:8000/api/pending/orders/zooroad",
        { withCredentials: true }
      );
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
      const response = await Axios.get(
        "http://localhost:8000/api/pickup/orders/zooroad",
        { withCredentials: true }
      );
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
      const response = await Axios.get(
        "http://localhost:8000/api/received/orders/zooroad",
        { withCredentials: true }
      );
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
      const response = await Axios.get(
        "http://localhost:8000/api/delivered/orders/zooroad",
        { withCredentials: true }
      );
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
      const response = await Axios.get(
        "http://localhost:8000/api/total/orders/zooroad",
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

  const pickup = (order) => {
    const setpickup = async () => {
      try {
        const response = await Axios.put(
          `http://localhost:8000/api/update/pending/topickup/${order._id}`,
          { withCredentials: true }
        );
        alert("Order Ready to be picked up");
        fetchData();
        pickupData();
        receivedDetails();
        deliveryData();
        totalData();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    setpickup();
  };



  const delivery = (order) => {
    const setdelivery = async () => {
      try {
        const response = await Axios.put(
          `http://localhost:8000/api/update/received/todelivery/${order._id}`,
          { withCredentials: true }
        );
        alert("Order Ready to be delivered");
        fetchData();
        pickupData();
        receivedDetails();
        deliveryData();
        totalData();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    setdelivery();
  };

  const handleDetailsClick = (order) => {
    navigate(`/PersonalDetails/${order._id}`);
  };


  const pieChartDataa = [
    { name: 'Pending', value: jsonData.length },
    { name: 'Pickup', value: PickupData.length },
    { name: 'Received', value: ReceivedData.length },
    { name: 'Delivered', value: DeliveryData.length },
    { name: 'Total', value: TotalData.length },
  ];

  return (
    <div>
      <Adminnavbarzoo />
      <div className="admincontainer">
      <div className="header">INCOME</div>
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
        <div className="header">INCOME</div>
        <div className="card-align">
        <div className="ordercard">
        <div className="header">Total</div>
            <p>{totalinc}</p>
          </div>
          <div className="ordercard">
            <div className="header">This Month</div>
            <p>105880</p>
          </div>
        </div>


        {/* The following section should remain outside of the jsonData.map() loop */}
        <div className="pending leg" style={{ width: "100%", height: "300px" }}>
          {/* <ResponsiveContainer width="60%" height="100%">
            <PieChart className="pi">
              <Pie
                dataKey="users"
                isAnimationActive={true}
                data={jsonData}
                cx="70%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8" // Default fill color for the pie chart
                label
                legend
              />
              <Legend align="middle" verticalAlign="middle" layout="vertical" />
            </PieChart>
          </ResponsiveContainer> */}
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                data={pieChartDataa}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartDataa.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
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
                    <td className="table-cell-body">
                      {formatDate(order.pickupdate)}
                    </td>
                    <td className="table-cell-body">
                      {formatDate(order.createdat)}
                    </td>
                    <td className="table-cell-body">
                      <div
                        className="detbtn"
                        onClick={() => handleDetailsClick(order)}
                      >
                        Details
                      </div>
                    </td>
                    <td
                      className="table-cell-body"
                      onClick={() => pickup(order)}
                    >
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
                    <td className="table-cell-body">
                      {formatDate(order.pickupdate)}
                    </td>
                    <td className="table-cell-body">
                      {formatDate(order.createdat)}
                    </td>
                    <td className="table-cell-body">
                      <div
                        className="detbtn"
                        onClick={() => handleDetailsClick(order)}
                      >
                        Details
                      </div>
                    </td>
                    <td
                      className="table-cell-body"
                      onClick={() => received(order)}
                    >
                      <div className="detbtn" onClick={() => received(order)}>Received</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {isOpen && (
          <div className="popup">
            <div className="popup_inner">
              <div className="input-section">
              <div>
      <h1>Add Items</h1>
      <div>
        <div className="input1">
        <Autocomplete
          className="iteminput"
          options={option}
          value={selectedOption}
          onChange={handleOptionChange}
          renderInput={(params) => (
            <TextField {...params} label="Select an option" />
          )}
        />
        <TextField
                    label="Enter Number of Items"
                    type="number"
                    value={itemQuantity}
                    onChange={(e) => setItemQuantity(e.target.value)}
                  />
          </div>
        <button onClick={handleAddItem}>Add Item</button>
      </div>
     
        <h3>Added Items:</h3>
        <ul className="added-items-list">
          {addedItems.map((item, index) => (
            <li key={index}>{`${item.name}: ${item.quantity} items`}</li>
          ))}
        </ul>
      </div>
      <div className="endingbuttons">
      <button onClick={handleAddItemPopupClose}>Close</button>
                  <button onClick={() => handleFinalSubmit(selectedOrder)} className="submitt-button">
                    Final Submit
                  </button>
                </div>
                <div>
                </div>
              </div>
            </div>
          </div>
        )}
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
                    <td className="table-cell-body">
                      {formatDate(order.pickupdate)}
                    </td>
                    <td className="table-cell-body">
                      {formatDate(order.createdat)}
                    </td>
                    <td className="table-cell-body">
                      <div
                        className="detbtn"
                        onClick={() => handleDetailsClick(order)}
                      >
                        Details
                      </div>
                    </td>
                    <td
                      className="table-cell-body"
                      onClick={() => delivery(order)}
                    >
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
                    <td className="table-cell-body">
                      {formatDate(order.pickupdate)}
                    </td>
                    <td className="table-cell-body">
                      {formatDate(order.createdat)}
                    </td>
                    <td className="table-cell-body">
                      <div
                        className="detbtn"
                        onClick={() => handleDetailsClick(order)}
                      >
                        Details
                      </div>
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
                    <td className="table-cell-body">
                      {formatDate(order.pickupdate)}
                    </td>
                    <td className="table-cell-body">
                      {formatDate(order.createdat)}
                    </td>
                    <td className="table-cell-body">
                      <div
                        className="detbtn"
                        onClick={() => handleDetailsClick(order)}
                      >
                        Details
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
