import React, { useState, useEffect } from 'react';
import './Nav.css';
import axios from 'axios';
import { userSignoutAction } from '../../redux/actions.js';
import DesktopNav from './Components/DesktopNav.jsx';
import MobileNav from './Components/MobileNav.jsx';

const Nav = () => {
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

  const handleSignout = () => {
    userSignoutAction();
    setUserInfo(null);
    window.location.href = '/';
  };

  return <>{window.innerWidth <= 768 ? <MobileNav /> : <DesktopNav />}</>;
};

export default Nav;
