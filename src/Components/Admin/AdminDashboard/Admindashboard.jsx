import React, { useState, useEffect } from "react";
import Axios from "axios";
import Adminnavbar from "../Adminnavbar/Adminnavbar";
import "./Admindashboard.css";
import Navbar from "../../Header/Navbar";
import { PieChart, Cell, Pie, Legend, ResponsiveContainer } from "recharts";
import Footer from "../../Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";


const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#EC33FF"];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);


  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export default function Admindashboard() {
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



  const fetchData = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:8000/api/pending/orders/hengrabari",
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
        "http://localhost:8000/api/pickup/orders/hengrabari",
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
        "http://localhost:8000/api/received/orders/hengrabari",
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
        "http://localhost:8000/api/delivered/orders/hengrabari",
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
        "http://localhost:8000/api/total/orders/hengrabari",
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

  const received = (order) => {
    setSelectedOrder(order);
    setIsOpen(true);
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

  const pieChartData = [
    { name: "Pending", value: jsonData.length },
    { name: "Pickup", value: PickupData.length },
    { name: "Received", value: ReceivedData.length },
    { name: "Delivered", value: DeliveryData.length },
    { name: "Total", value: TotalData.length },
  ];

  // const togglePopup = () => {
  //   setIsOpen(!isOpen);
  // };

  // const handleAddItem = () => {
  //   if (itemName && itemQuantity) {
  //     const newItem = {
  //       name: itemName,
  //       quantity: itemQuantity,
  //     };

  //     // Add the new item to the items array
  //     setItems([...items, newItem]);

  //     // Clear input fields
  //     setItemName("");
  //     setItemQuantity("");
  //   }
  // };

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
  
  



  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Filter options based on user input
    const filtered = option.filter(option =>
      option.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredOptions(filtered);
    setIsDropdownOpen(true);
  };

  const handleOptionClick = (option) => {
    setInputValue(option);
    setIsDropdownOpen(false);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };
    





  return (
    <div>
      <Adminnavbar />
      <div className="admincontainer">
      <div className="header">ORDERS</div>
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
            <div className="header">This month</div>
            <p>150600</p>
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
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                legend
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
                <Legend align="right" verticalAlign="right" layout="vertical" />
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
                  <tr key={order._id}>
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
                      {/* <div className="detbtn" onClick={togglePopup}>Details</div> */}
                    </td>
                    <td
                      className="table-cell-body"
                    >
                      <div className="detbtn" onClick={() => received(order)}>
                        {/* <Link to="#popup1" style={{textDecoration:"none", color:"rgb(36, 36, 36)"}} >Received</Link> */}
                        Received
                      </div>
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
      <Footer />
    </div>
  );
}
