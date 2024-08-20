import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import { BsFillHouseDoorFill, BsCalendarCheck, BsPersonFill, BsFillGearFill } from 'react-icons/bs';
import Spinner from './Spinner';
import './dashboard.css';
import fontPath from './assets/CinzelDecorative-Regular.ttf';

function MainContent() {
  const [totalRooms, setTotalRooms] = useState(0);
  const [occupiedRooms, setOccupiedRooms] = useState(0);
  const [availableRooms, setAvailableRooms] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const styleSheet = document.styleSheets[0];
    const fontFace = `
      @font-face {
        font-family: 'MyCustomFont';
        src: url('${fontPath}') format('truetype');
        font-weight: normal;
        font-style: normal;
      }
    `;
    styleSheet.insertRule(fontFace, styleSheet.cssRules.length);
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/api/rooms')
      .then(response => response.json())
      .then(data => {
        setTotalRooms(data.length);
        setOccupiedRooms(data.filter(room => room.status === 'Occupied').length);
        setAvailableRooms(data.filter(room => room.status === 'Available').length);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load room data.');
        setLoading(false);
      });
  }, []);

  const data = [
    { name: 'Jan', bookings: 20, revenue: 3000 },
    { name: 'Feb', bookings: 25, revenue: 3500 },
    { name: 'Mar', bookings: 30, revenue: 4000 },
    { name: 'Apr', bookings: 20, revenue: 3000 },
    { name: 'May', bookings: 28, revenue: 3600 },
    { name: 'Jun', bookings: 35, revenue: 4500 },
    { name: 'Jul', bookings: 45, revenue: 5500 },
    { name: 'Aug', bookings: 25, revenue: 3300 },
  ];

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>DASHBOARD</h3>
      </div>

      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <h3>Total Rooms</h3>
            <BsFillHouseDoorFill className='card_icon' />
          </div>
          <h1>{loading ? <Spinner /> : totalRooms}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>Occupied</h3>
            <BsCalendarCheck className='card_icon' />
          </div>
          <h1>{loading ? <Spinner /> : occupiedRooms}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>Available</h3>
            <BsPersonFill className='card_icon' />
          </div>
          <h1>{loading ? <Spinner /> : availableRooms}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>Pending Requests</h3>
            <BsFillGearFill className='card_icon' />
          </div>
          <h1>8</h1>
        </div>
      </div>

      <div className='charts'>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="bookings" fill="#8884d8" />
            <Bar dataKey="revenue" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="bookings" stroke="#8884d8" />
            <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default MainContent;
