import React from "react";
import './Invoice.css';

export default function Invoice() {
  return (
    <>
      <div className="invoice">
        <div className="page">
          <div className="logo">
            
            {/* <img src="your_logo.png" alt="Company Logo" width={150} /> */}
          </div>
          <div className="header">
            <h1>Invoice</h1>
            <p>Invoice Number: INV12345</p>
            <p>Date: 2023-09-20</p>
          </div>
          <div className="company-details">
            <h2>Company Contact Details:</h2>
            <p>Prestoclean</p>
            <p>Address: Zoo Road,Guwahati</p>
            <p>City: Guwahati</p>
            <p>Email: contact@prestoclean.com</p>
            <p>Phone: +1 (123) 456-7890</p>
          </div>
          <div className="bill-to">
            <h2>Bill To:</h2>
            <p>Customer Name: </p>
            <p>Address: </p>
            <p>City: </p>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Item 1</td>
                <td></td>
                <td>2</td>
                <td>₹50.00</td>
                <td>₹100.00</td>
              </tr>
              <tr>
                <td>Item 2</td>
                <td></td>
                <td>3</td>
                <td>₹30.00</td>
                <td>₹90.00</td>
              </tr>
             
            </tbody>
          </table>
          <div className="total">
            <p>
              <strong>Total:</strong> ₹190.00
            </p>
          </div>
          <div className="qr-code">
            
            <img
              src="https://imgs.search.brave.com/Y0DW_1tUej-G0Cy3KOiYLwDZR-U-tHnM0lDbeBCrJpM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvODEy/OTYwNTk0L3Bob3Rv/L3FyLWNvZGUtc2Nh/bm5pbmcuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPW5YNlUx/NllpSU9haEF4Qk9s/UTh2X1ZDXzZocGVI/YTg4LXoxY1dPUGNK/ZW89"
              alt="QR Code"
              width={150}
            />
          </div>
        </div>
      </div>
    </>
  );
}
