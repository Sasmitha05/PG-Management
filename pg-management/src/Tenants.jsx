import React, { useState, useEffect } from 'react';
import { fetchBookings } from './api';

function Tenants() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBookings = async () => {
      try {
        const response = await fetchBookings();
        if (Array.isArray(response.data)) {
          setBookings(response.data);
        } else {
          setError('Unexpected data format.');
        }
      } catch (err) {
        setError('Error fetching bookings. Please try again later.');
        console.error('Error fetching bookings:', err);
      }
    };

    getBookings();
  }, []);

  const containerStyle = {
    margin: '20px',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    justifyContent: 'center', 
  };

  const headerStyle = {
    marginBottom: '20px',
    textAlign: 'center',
    color: '#424242', 
  };

  const errorMessageStyle = {
    color: '#e91e63', 
    textAlign: 'center',
    marginBottom: '20px',
  };

  const tableStyle = {
    width: '80%', 
    maxWidth: '1200px', 
    borderCollapse: 'collapse',
    margin: '0 auto',
  };

  const thTdStyle = {
    border: '1px solid #ddd',
    padding: '6px', 
    textAlign: 'left',
    fontSize: '14px', 
  };

  const thStyle = {
    ...thTdStyle,
    backgroundColor: '#f2f4ed', 
    color: '#8b002f', 
    fontWeight: 'bold',
  };

  const trEvenStyle = {
    backgroundColor: '#f9e5ec', 
  };

  const trHoverStyle = {
    backgroundColor: '#e4d8e5', 
  };

  return (
    <div style={containerStyle}>
      <div>
        <h2 style={headerStyle}>Tenants Details</h2>

        {error && <p style={errorMessageStyle}>{error}</p>}
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Contact</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Marital Status</th>
              <th style={thStyle}>Guardian Name</th>
              <th style={thStyle}>Guardian Contact</th>
              <th style={thStyle}>Address</th>
              <th style={thStyle}>Check-In Date</th>
              <th style={thStyle}>Check-Out Date</th>
              <th style={thStyle}>Food Preference</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Room ID</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr
                key={booking._id}
                style={booking._id % 2 === 0 ? trEvenStyle : null}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = trHoverStyle.backgroundColor}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = booking._id % 2 === 0 ? trEvenStyle.backgroundColor : null}
              >
                <td style={thTdStyle}>{booking.name || 'N/A'}</td>
                <td style={thTdStyle}>{booking.contact || 'N/A'}</td>
                <td style={thTdStyle}>{booking.email || 'N/A'}</td>
                <td style={thTdStyle}>{booking.maritalStatus || 'N/A'}</td>
                <td style={thTdStyle}>{booking.guardianName || 'N/A'}</td>
                <td style={thTdStyle}>{booking.guardianContact || 'N/A'}</td>
                <td style={thTdStyle}>{booking.address || 'N/A'}</td>
                <td style={thTdStyle}>{booking.checkInDate ? new Date(booking.checkInDate).toLocaleDateString() : 'N/A'}</td>
                <td style={thTdStyle}>{booking.checkOutDate ? new Date(booking.checkOutDate).toLocaleDateString() : 'N/A'}</td>
                <td style={thTdStyle}>{booking.foodPreference || 'N/A'}</td>
                <td style={thTdStyle}>{booking.category || 'N/A'}</td>
                <td style={thTdStyle}>{booking.roomId ? booking.roomId._id : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tenants;
