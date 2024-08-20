import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import Bookings from './Bookings';
import Tenants from './Tenants';
import Requests from './Requests';
import Reports from './Reports';
import fontPath from './assets/CinzelDecorative-Regular.ttf';
import './dashboard.css';

function Dashboard() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className={`grid-container ${isOpen ? '' : 'sidebar-closed'}`}>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isOpen} />
      <div className='main'>
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="tenants" element={<Tenants />} />
          <Route path="requests" element={<Requests />} />
          <Route path="reports" element={<Reports />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;

