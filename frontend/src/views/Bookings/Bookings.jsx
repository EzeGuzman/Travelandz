import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Nav, ReserveCard } from '../../components/index.js';

const Bookings = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controlar la carga de datos

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const storedUserInfo = localStorage.getItem('userInfo');
        if (!storedUserInfo) {
          console.error(
            'No se encontró información de usuario en localStorage'
          );
          return;
        }
        const parsedUserInfo = JSON.parse(storedUserInfo);
        setUserInfo(parsedUserInfo);
        const userId = parsedUserInfo._id;
        const response = await axios.get(
          `https://travelandz-backend.onrender.com/api/booking/user/${userId}/bookings`
        );
        setBookings(response.data);
        setLoading(false); // Marca la carga como completada después de recibir los datos
      } catch (error) {
        console.error('Error fetching user bookings:', error);
        setLoading(false); // Marca la carga como completada incluso en caso de error
      }
    };

    fetchUserBookings();
  }, []);

  return (
    <>
      <nav>
        <Nav />
      </nav>
      <div className="container mx-auto mt-8 p-4 bg-blue-100 rounded-lg shadow-md w-3/4">
        <h2 className="text-2xl font-bold my-4">Mis Reservas</h2>
        {loading ? ( // Verifica si los datos están cargando
          <p>Cargando reservas...</p>
        ) : bookings.length === 0 ? ( // Verifica si no hay reservas
          <>
            <p>No hay reservas realizadas</p>
            <Link to="/home" className="text-blue-500 hover:underline">
              Hacer una reserva
            </Link>
          </>
        ) : (
          bookings.map((booking, index) => (
            <ReserveCard key={index} booking={booking} />
          ))
        )}
      </div>
    </>
  );
};

export default Bookings;
