import React, { useState, useEffect, useCallback } from 'react';
import {
  ProductCard,
  AirportSelect,
  Select,
  DateSelect,
  SearchMap,
} from '../../../../components/index.js';
import axios from 'axios';
import './Step1.css'; // Importar el archivo CSS para la animación

const Step1 = ({ onNext, onSelectOffer }) => {
  const [transferOffers, setTransferOffers] = useState([]);
  const [startLocationCode, setStartLocationCode] = useState('');
  const [searchClicked, setSearchClicked] = useState(false);
  const [transferType, setTransferType] = useState('');
  const [startDateTime, setStartDateTime] = useState('');
  const [endAddressLine, setEndAddressLine] = useState('');
  const [endGeoCode, setEndGeoCode] = useState('');
  const [endCountryCode, setEndCountryCode] = useState('');
  const [loading, setLoading] = useState(false);

  const transferOptions = [
    { value: 'PRIVATE', label: 'Private' },
    { value: 'SHARED', label: 'Shared' },
  ];

  const fetchTransferOffers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://travelandz-backend.onrender.com/api/transfer/transfer-offers',
        {
          startLocationCode,
          transferType,
          startDateTime,
          endAddressLine,
          endCountryCode,
          endGeoCode,
        }
      );
      setTransferOffers(response.data.data);
    } catch (error) {
      console.error('Error fetching transfer offers:', error);
    } finally {
      setLoading(false);
    }
  }, [
    startLocationCode,
    transferType,
    startDateTime,
    endAddressLine,
    endCountryCode,
    endGeoCode,
  ]);

  useEffect(() => {
    if (searchClicked) {
      fetchTransferOffers();
      setSearchClicked(false);
    }
  }, [searchClicked, fetchTransferOffers]);

  const setFormattedStartDateTime = (dateTime) => {
    if (!dateTime.endsWith(':00')) {
      return dateTime + ':00';
    }
    return dateTime;
  };

  const handleSelectOffer = async (offer) => {
    try {
      const response = await axios.get(
        `https://travelandz-backend.onrender.com/api/booking/offer/${offer.id}/bookings`
      );
      const offerBookings = response.data;
      if (offerBookings.length > 0) {
        alert('Esta oferta ya ha sido seleccionada.');
      } else {
        onSelectOffer(offer);
      }
    } catch (error) {
      console.error('Error fetching offer bookings:', error);
    }
  };

  return (
    <>
      <div className="container mx-auto mt-8 p-4 bg-blue-100 rounded-lg shadow-md w-1/2">
        <h2 className="text-2xl font-bold my-4">Realiza tu búsqueda</h2>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="w-full sm:w-full">
              <SearchMap
                onAddressSelect={(address, coordinates, countryCode) => {
                  setEndAddressLine(address);
                  setEndGeoCode(coordinates);
                  setEndCountryCode(countryCode);
                }}
              />
            </div>
            <div className="w-full sm:w-full">
              <AirportSelect
                value={startLocationCode}
                onChange={(e) => setStartLocationCode(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="w-full sm:w-full">
              <Select
                value={transferType}
                onChange={(e) => setTransferType(e.target.value)}
                options={transferOptions}
              />
            </div>
            <div className="w-full sm:w-full">
              <DateSelect
                value={startDateTime}
                onChange={(e) =>
                  setStartDateTime(setFormattedStartDateTime(e.target.value))
                }
              />
            </div>
          </div>
        </div>
        <button
          onClick={() => setSearchClicked(true)}
          className="w-24 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mt-4 mx-auto cursor-pointer"
        >
          Buscar
        </button>
      </div>
      <div className="flex flex-col justify-between mx-auto w-2/3 w-responsive">
        {loading ? (
          <div className="loading-animation mt-4">Cargando...</div>
        ) : transferOffers && transferOffers.length > 0 ? (
          transferOffers.map((offer, index) => (
            <div key={index} className="w-full">
              <ProductCard
                offer={offer}
                onSelect={() => handleSelectOffer(offer)}
              />
            </div>
          ))
        ) : (
          <div className="text-center mt-4 text-gray-600">
            No hay reservas disponibles
          </div>
        )}
      </div>
    </>
  );
};

export default Step1;
