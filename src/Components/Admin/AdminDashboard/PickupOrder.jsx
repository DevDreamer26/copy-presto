import React, {useEffect, useState} from 'react'
import Axios from "axios";
import Adminnavbar from '../Adminnavbar/Adminnavbar'

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

function PickupOrder() {
    
    const [PickupData, setPickupData] = useState([]);
    const pickupData = async () => {
        try {
          const response = await Axios.get("http://localhost:8000/api/pickup/orders/hengrabari",
          { withCredentials: true });
          setPickupData(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
    
      useEffect(() => {
        pickupData();
      }, []);

      const handleDetailsClick = (order) => {
        navigate(`/PersonalDetails/${order._id}`);
      };

  return (
    <div>
        <Adminnavbar />
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
                {PickupData.map((order) => (
                  <tr key={order.id}>
                    <td className="table-cell-body">{order.name}</td>
                    <td className="table-cell-body">{formatDate(order.pickupdate)}</td>
                    <td className="table-cell-body">{formatDate(order.createdat)}</td>
                    <td className="table-cell-body">
                      <div className="detbtn" onClick={handleDetailsClick}>Details</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
    </div>
  )
}

export default PickupOrder