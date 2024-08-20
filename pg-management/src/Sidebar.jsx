
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BsFillHouseDoorFill, BsCalendarCheck, BsPersonFill, BsFillGearFill, BsFillBarChartFill
} from 'react-icons/bs';
import './dashboard.css';

function Sidebar({ isOpen }) {
  const location = useLocation(); 

  return (
    <aside className={`sidebar ${isOpen ? '' : 'sidebar-closed'}`}>
      <ul className='sidebar-list'>
        <li className={`sidebar-list-item ${location.pathname === "/dashboard" ? "active" : ""}`}>
          <Link to="/dashboard">
            <BsFillHouseDoorFill className='icon' /> Dashboard
          </Link>
        </li>
        <li className={`sidebar-list-item ${location.pathname === "/dashboard/bookings" ? "active" : ""}`}>
          <Link to="/dashboard/bookings">
            <BsCalendarCheck className='icon' /> Bookings
          </Link>
        </li>
        <li className={`sidebar-list-item ${location.pathname === "/dashboard/tenants" ? "active" : ""}`}>
          <Link to="/dashboard/tenants">
            <BsPersonFill className='icon' /> Tenants
          </Link>
        </li>
        <li className={`sidebar-list-item ${location.pathname === "/dashboard/requests" ? "active" : ""}`}>
          <Link to="/dashboard/requests">
            <BsFillGearFill className='icon' /> Requests
          </Link>
        </li>
        <li className={`sidebar-list-item ${location.pathname === "/dashboard/reports" ? "active" : ""}`}>
          <Link to="/dashboard/reports">
            <BsFillBarChartFill className='icon' /> Reports
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
