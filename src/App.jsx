import { useEffect, useState} from 'react';
import './App.css';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Header/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Components/Body/Home/Home';
import Schedule from './Components/Schedule/Schedule';
import Login from './Components/Register/Login';
import Signup from './Components/Register/Signup';
import Admindashboard from './Components/Admin/AdminDashboard/Admindashboard';
import OtpLogin from './Components/Otplogin/Otplogin';
import ContactUs from './Components/Contactpage/cnt';
import PersonalDetails from './Components/Admin/PersonalDetails/PersonalDetails';
import Services from "./Components/Services/srv"
import PendingOrder from './Components/Admin/AdminDashboard/PendingOrder';
import PickupOrder from './Components/Admin/AdminDashboard/PickupOrder';
import ReceiveOrder from './Components/Admin/AdminDashboard/ReceiveOrder';
import DeliverOrder from './Components/Admin/AdminDashboard/DeliverOrder';
import TotalOrder from './Components/Admin/AdminDashboard/TotalOrder';
import Shop from './Components/Admin/OwnerDasboard/Shop';
import Items from './Components/Admin/OwnerDasboard/Items'
import PendingOrderzoo from './Components/Admin/AdminDashboardzoo/AdminDashboard/PendingOrderzoo';
import PickupOrderzoo from './Components/Admin/AdminDashboardzoo/AdminDashboard/PickupOrderzoo';
import ReceiveOrderzoo from './Components/Admin/AdminDashboardzoo/AdminDashboard/ReceiveOrderzoo';
import DeliverOrderzoo from './Components/Admin/AdminDashboardzoo/AdminDashboard/DeliverOrderzoo';
import TotalOrderzoo from './Components/Admin/AdminDashboardzoo/AdminDashboard/TotalOrderzoo';
import Admindashboardzoo from './Components/Admin/AdminDashboardzoo/AdminDashboard/Admindasboardzoo';


import TotalOrdertotal from './Components/Admin/Admintotal/TotalOrder';
import DeliverOrdertotal from './Components/Admin/Admintotal/DeliverOrdertotal';
import ReceiveOrdertotal from './Components/Admin/Admintotal/ReceiveOrdertotal';
import PickupOrdertotal from './Components/Admin/Admintotal/PickupOrdertotal';
import PendingOrdertotal from './Components/Admin/Admintotal/PendingOrdertotal';
import Admindashboardtotal from './Components/Admin/Admintotal/Admindashboardtotal';
import Terms from './Components/Terms/Terms';
import Invoice from './Components/Invoice/Invoice';


function App() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);


  const navigate = useNavigate()

  return (
    <>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="otplogin"
            element={
              <OtpLogin
                setIsUserAuthenticated={setIsUserAuthenticated}

                isUserAuthenticated={isUserAuthenticated}
                />
                    }
              />
              {isUserAuthenticated ? (
            <Route path="/schedule" element={<Schedule />} />
          ) : (
                null

          )}          
          <Route path='/contactus' element={<ContactUs/>}/>
          <Route path='/services' element={<Services/>}/>
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/PendingOrder" element={<PendingOrder />} />
          <Route path="/PickupOrder" element={<PickupOrder />} />
          <Route path="/ReceiveOrder" element={<ReceiveOrder />} />
          <Route path="/DeliverOrder" element={<DeliverOrder />} />
          <Route path="/TotalOrder" element={<TotalOrder />} />
          <Route path="/Shop" element={<Shop />} />
          <Route path="/Items" element={<Items />} />
          <Route path="/Terms" element={<Terms />} />
          <Route path="/Invoice" element={<Invoice />} />
          
          {/* <Route path='/Table' element={<Table/>}/> */}

          <Route
            path="/Admin_login"
            element={
              <Login
                setIsAdminAuthenticated={setIsAdminAuthenticated}

                isAdminAuthenticated={isAdminAuthenticated}
              />
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/PersonalDetails/:id" element={<PersonalDetails />} />


          {/* {isAdminAuthenticated ? ( */}
          <Route path="/Admin_Dashboard" element={<Admindashboard />} />
        {/* ) : null} */}

        <Route path="/Admin_Dashboardzoo" element={<Admindashboardzoo />} />


        <Route path="/PendingOrderzoo" element={<PendingOrderzoo />} />
          <Route path="/PickupOrderzoo" element={<PickupOrderzoo />} />
          <Route path="/ReceiveOrderzoo" element={<ReceiveOrderzoo />} />
          <Route path="/DeliverOrderzoo" element={<DeliverOrderzoo />} />
          <Route path="/TotalOrderzoo" element={<TotalOrderzoo />} />





          <Route path="/Admin_Dashboardtotal" element={<Admindashboardtotal />} />
          <Route path="/PendingOrdertotal" element={<PendingOrdertotal />} />
          <Route path="/PickupOrdertotal" element={<PickupOrdertotal />} />
          <Route path="/ReceiveOrdertotal" element={<ReceiveOrdertotal />} />
          <Route path="/DeliverOrdertotal" element={<DeliverOrdertotal />} />
          <Route path="/TotalOrdertotal" element={<TotalOrdertotal />} />

        </Routes>

    </>
  );
}

export default App;


