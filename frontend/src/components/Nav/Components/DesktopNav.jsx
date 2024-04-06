import React, { useState, useEffect } from 'react';
import { BiSolidUserCircle } from 'react-icons/bi';
import '../Nav.css';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { userSignoutAction } from '../../../redux/actions.js'

const DesktopNav = ({ updateUserInfo }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
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
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Función para cerrar sesión
  const handleSignout = () => {
    // Despacha la acción para cerrar sesión
    userSignoutAction();
    // Elimina el usuario del estado local
    setUserInfo(null);
    // Redirige al usuario a la página de inicio de sesión
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
      {userInfo && (
        <div className="user__icon relative z-50">
          <div className="h-[10vh] flex items-center">
            <BiSolidUserCircle className="text-white text-5xl" />
          </div>

          <div className="user__menu absolute bg-white border border-gray-300 rounded shadow w-auto">
            <div className="menu-item menu-user text-black text-lg py-3 px-5">
              <p className="font-bold">{userInfo.name}</p>{' '}
              <p>{userInfo.email}</p>
            </div>
            <Link to={'/account'}>
              <div className="menu-item text-black text-lg py-3 px-5 hover:bg-slate-300 cursor-pointer">
                Mi cuenta
              </div>
            </Link>
            <Link to={'/my-bookings'}>
              <div className="menu-item text-black text-lg py-3 px-5 hover:bg-slate-300 cursor-pointer">
                Mis reservas
              </div>
            </Link>
            <div
              className="menu-item text-black text-lg py-3 px-5 hover:bg-slate-300 cursor-pointer"
              onClick={handleSignout} // Asigna la función de cerrar sesión al evento onClick
            >
              Cerrar sesión
            </div>
          </div>
        </div>
      )}
      <div className="nav__toggler">
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
};

export default DesktopNav;
