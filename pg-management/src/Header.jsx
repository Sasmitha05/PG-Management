// Header.jsx
import React from 'react';
import { BsJustify, BsSearch, BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle } from 'react-icons/bs';
import logo from './assets/La Villa.png';
import './dashboard.css';

function Header({ toggleSidebar }) {
  return (
    <header className='header'>
      <div className='header-left'>
        <div className='menu-icon' onClick={toggleSidebar}>
          <BsJustify className='icon_header' />
        </div>
        <div className='sidebar-brand'>
          <img src={logo} alt="La Villa Logo" className='sidebar-logo' />
          <span className='brand-text'>La Villa</span>
        </div>
      </div>
      <div className='header-right'>
        <BsSearch className='icon' />
        <BsFillBellFill className='icon' />
        <BsFillEnvelopeFill className='icon' />
        <BsPersonCircle className='icon' />
      </div>
    </header>
  );
}

export default Header;
