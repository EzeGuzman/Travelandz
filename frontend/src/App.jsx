import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserId } from './redux/actions';

import {
  Home,
  Login,
  Register,
  Authentication,
  Account,
  ChangePassword,
  Bookings,
} from './views';
import './css/App.scss';

const App = () => {
  const dispatch = useDispatch();

  // Llama a la acción setUserId para establecer el ID de usuario en el estado de Redux
  useEffect(() => {
    dispatch(setUserId());
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password/:_id" element={<ChangePassword />} />
          <Route path="/home" element={<Home />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/account" element={<Account />} />
          <Route path="/my-bookings" element={<Bookings />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
