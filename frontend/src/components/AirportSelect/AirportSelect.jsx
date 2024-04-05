import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setAirportCodes } from '../../redux/actions.js';

const AirportSelect = ({ value, onChange }) => {
  const dispatch = useDispatch();
  const airportCodes = useSelector((state) => state.airportCodes);

  const fetchAirportCodes = useCallback(async () => {
    try {
      // Verifica si los códigos de aeropuerto ya están presentes en el estado global
      if (airportCodes.length === 0) {
        const response = await axios.get(
          'https://travelandz-backend.onrender.com/api/airport-codes'
        );
        const sortedAirportCodes = response.data.sort((a, b) =>
          a.iata.localeCompare(b.iata)
        );
        dispatch(setAirportCodes(sortedAirportCodes));
      }
    } catch (error) {
      console.error('Error fetching airport codes:', error);
    }
  }, [dispatch, airportCodes]);

  useEffect(() => {
    fetchAirportCodes();
  }, [fetchAirportCodes]);

  return (
    <select
      value={value}
      onChange={onChange}
      className="p-2 border border-gray-300 rounded-lg w-full focus:border-gray-400 outline-none"
    >
      <option value="">Selecciona un aeropuerto</option>
      {airportCodes.map((airport, index) => (
        <option
          key={index}
          value={airport.iata}
          className="py-1 px-2 bg-white hover:bg-gray-100 cursor-pointer"
        >
          {airport.iata} - {airport.name}
        </option>
      ))}
    </select>
  );
};

export default AirportSelect;
