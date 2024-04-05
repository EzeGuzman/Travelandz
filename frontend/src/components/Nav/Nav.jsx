import React, { useState, useEffect } from 'react';
import './Nav.css'; // Asegúrate de importar los estilos del componente Nav
import axios from 'axios';
import { userSignoutAction } from '../../redux/actions.js';
import DesktopNav from './Components/DesktopNav.jsx';
import MobileNav from './Components/MobileNav.jsx';

const Nav = ({ updateUserInfo }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
          const parsedUserInfo = JSON.parse(storedUserInfo);
          const response = await axios.get(
            `http://localhost:4000/api/user/get/${parsedUserInfo._id}`
          );
          const userData = response.data;
          setUserInfo(userData);
          updateUserInfo(userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [updateUserInfo]);

  const handleSignout = () => {
    userSignoutAction();
    setUserInfo(null);
    window.location.href = '/';
  };

  return <>{window.innerWidth <= 768 ? <MobileNav /> : <DesktopNav />}</>;
};

export default Nav;
