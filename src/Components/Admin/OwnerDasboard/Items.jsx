import React from "react";
import Navbar from "../../Header/Navbar";
import "./OwnerDashboard.css";
import Footer from "../../Footer/Footer";

function Items() {
  return (
    <div>
      
      <Navbar />
      <br />
      <div className="container">
        <table style={{marginTop: "5rem"}}>
          <thead>
            <tr>
              <th>Items</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Basic T-Shirt</td>
              <td>&#x20B9; 50</td>
            </tr>
            <tr>
              <td>Jeans</td>
              <td>&#x20B9; 100</td>
            </tr>
            <tr>
              <td>Socks(per piece)</td>
              <td>&#x20B9; 100</td>
            </tr>
            <tr>
              <td>Innerwear(per piece)</td>
              <td>&#x20B9; 100</td>
            </tr>
            <tr>
              <td>Bath Towel</td>
              <td>&#x20B9; 100</td>
            </tr>
            <tr>
              <td>Bed Sheet</td>
              <td>&#x20B9; 150</td>
            </tr>
            <tr>
              <td>Pillowcase</td>
              <td>&#x20B9; 150</td>
            </tr>
            <tr>
              <td>Duvet Cover</td>
              <td>&#x20B9; 150</td>
            </tr>
            <tr>
              <td>Blouse</td>
              <td>&#x20B9; 150</td>
            </tr>
            <tr>
              <td>Pants</td>
              <td>&#x20B9; 150</td>
            </tr>
            <tr>
              <td>Sweater</td>
              <td>&#x20B9; 150</td>
            </tr>
            <tr>
              <td>Curtains(per panel)</td>
              <td>&#x20B9; 150</td>
            </tr>
            <tr>
              <td>Table cloth</td>
              <td>&#x20B9; 150</td>
            </tr>
            <tr>
              <td>Baby Onesie</td>
              <td>&#x20B9; 150</td>
            </tr>
            <tr>
              <td>Hand Towel</td>
              <td>&#x20B9; 150</td>
            </tr>
            <tr>
              <td>Skirt</td>
              <td>&#x20B9; 150</td>
            </tr>
            <tr>
              <td>Blazer</td>
              <td>&#x20B9; 150</td>
            </tr>
            <tr>
              <td>Cushion Cover</td>
              <td>&#x20B9; 150</td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />
      <br />
      <Footer/>
    </div>
  );
}

export default Items;
