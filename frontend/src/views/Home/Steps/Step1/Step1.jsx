import React, { useState, useEffect, useCallback } from 'react';
import {
  ProductCard,
  AirportSelect,
  Select,
  DateSelect,
  SearchMap,
} from '../../../../components/index.js';
import axios from 'axios';
import './Step1.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [offersPerPage] = useState(5);

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

  const showWarningToast = (message) => {
    toast.warning(message, {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      theme: 'light',
      transition: 'Bounce',
      className: 'visibility-toast',
    });
  };

  const showErrorToast = (message) => {
    toast.error(message, {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: 'Bounce',
      className: 'visibility-toast',
    });
  };

  const handleSelectOffer = async (offer) => {
    try {
      const response = await axios.get(
        `https://travelandz-backend.onrender.com/api/booking/offer/${offer.id}/bookings`
      );
      const offerBookings = response.data;
      // Llamadas a las funciones de los toasts
      if (offerBookings.length > 0) {
        showWarningToast('Esta oferta ya ha sido elegida!');
      } else {
        const selectedOffers = transferOffers.filter((o) => o.isSelected);
        if (selectedOffers.length > 0) {
          showErrorToast('No puedes seleccionar más de una oferta!');
        } else {
          onSelectOffer(offer);
          setTransferOffers((prevOffers) =>
            prevOffers.map((prevOffer) =>
              prevOffer === offer
                ? { ...prevOffer, isSelected: true }
                : prevOffer
            )
          );
        }
      }
    } catch (error) {
      console.error('Error fetching offer bookings:', error);
    }
  };

  // Obtener las ofertas para la página actual
  const indexOfLastOffer = currentPage * offersPerPage;
  const indexOfFirstOffer = indexOfLastOffer - offersPerPage;
  const currentOffers = transferOffers.slice(
    indexOfFirstOffer,
    indexOfLastOffer
  );

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
          onClick={() => {
            setSearchClicked(true);
            setCurrentPage(1); // Resetea la página actual al hacer una nueva búsqueda
          }}
          className="w-24 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mt-4 mx-auto cursor-pointer"
        >
          Buscar
        </button>
      </div>
      <div className="flex flex-col justify-between mx-auto mt-9 w-2/3 w-responsive">
        {loading ? (
          <div className="loading-animation mt-4">Cargando...</div>
        ) : currentOffers && currentOffers.length > 0 ? (
          currentOffers.map((offer, index) => (
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
      {/* Paginación */}
      <div className="flex justify-center mt-4">
        {transferOffers.length > offersPerPage && (
          <ul className="flex">
            {[...Array(Math.ceil(transferOffers.length / offersPerPage))].map(
              (number, index) => (
                <li key={index} className="mx-1">
                  <button
                    onClick={() => paginate(index + 1)}
                    className={`${
                      currentPage === index + 1
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-300 text-gray-700'
                    } py-2 px-4 rounded-md focus:outline-none`}
                  >
                    {index + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        )}
      </div>
    </>
  );
};

export default Step1;
