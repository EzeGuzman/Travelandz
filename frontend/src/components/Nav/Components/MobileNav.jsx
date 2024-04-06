import React, { useState, useEffect } from 'react';
import '../Nav.css';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { userSignoutAction } from '../../../redux/actions.js';

const MobileNav = ({ updateUserInfo }) => {
  const [active, setActive] = useState('nav__menu');
  const [icon, setIcon] = useState('nav__toggler');
  const [userInfo, setUserInfo] = useState(null);

  const navToggle = () => {
    setActive(active === 'nav__menu' ? 'nav__menu nav__active' : 'nav__menu');
    setIcon(icon === 'nav__toggler' ? 'nav__toggler toggle' : 'nav__toggler');
  };

  const fetchUserData = async () => {
    try {
      const storedUserInfo = localStorage.getItem('userInfo');
      if (storedUserInfo) {
        const parsedUserInfo = JSON.parse(storedUserInfo);
        const response = await axios.get(
          `https://travelandz-backend.onrender.com/api/user/get/${parsedUserInfo._id}`
        );
        const userData = response.data;
        setUserInfo(userData);
        updateUserInfo(userData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [updateUserInfo]);

  const handleSignout = () => {
    userSignoutAction();
    setUserInfo(null);
    window.location.href = '/';
  };

  return (
    <nav className="nav relative">
      <Link to={'/home'}>
        <div className="brand__logo">
          <img src={logo} alt="" className="imgLogo" />
          <p className="nav__brand">Travelandz</p>
        </div>
      </Link>
      <ul className={active}>
        {userInfo && (
          <div style={{ height: '100vh' }}>
            <li className="nav__item">
              <div className="menu-item menu-user text-white text-lg py-3 px-5">
                <p className="font-bold">{userInfo.name}</p>{' '}
                <p>{userInfo.email}</p>
              </div>
            </li>
            <li className="nav__item">
              <Link to={'/account'}>
                <div className="menu-item text-white text-lg py-3 px-5 hover:bg-slate-300 cursor-pointer">
                  Mi cuenta
                </div>
              </Link>
            </li>
            <li className="nav__item">
              <Link to={'/my-bookings'}>
                <div className="menu-item text-white text-lg py-3 px-5 hover:bg-slate-300 cursor-pointer">
                  Mis reservas
                </div>
              </Link>
            </li>
            <li className="nav__item">
              <div
                className="menu-item text-white text-lg px-5 hover:bg-slate-300 cursor-pointer"
                onClick={handleSignout}
              >
                Cerrar sesión
              </div>
            </li>
          </div>
        )}
      </ul>
      <div onClick={navToggle} className={icon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
};

export default MobileNav;
