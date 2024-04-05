import React from 'react';
import { FaAngleRight } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

const ReserveCard = ({ booking }) => {
  const offer = JSON.parse(booking.offer); // Parsear el campo offer de JSON a objeto JavaScript

  const getCurrencySymbol = (currencyCode) => {
    switch (currencyCode) {
      case 'USD':
        return '$';
      case 'EUR':
        return '€';
      case 'GBP':
        return '£';
      // Agrega más casos según las monedas que necesites manejar
      default:
        return currencyCode; // Por defecto, devuelve el código de la moneda
    }
  };

  const currencySymbol = getCurrencySymbol(offer.quotation.currencyCode);

  const handleCancelBooking = async () => {
    try {
      await axios.delete(
        `https://travelandz-backend.onrender.com/api/booking/delete/${booking._id}`
      );
      // Si la eliminación es exitosa, podrías mostrar un mensaje de éxito o actualizar la lista de reservas.
      Swal.fire({
        icon: 'success',
        title: 'Tu reserva fue eliminada con éxito!',
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error canceling booking:', error);
    }
  };

  return (
    <div className="product-card relative flex flex-row items-center overflow-hidden shadow-lg">
      <div className="image-container w-64 h-64 flex items-center justify-center relative flex-shrink-0">
        {/* Contenedor con tamaño fijo */}
        <div className="overlay absolute h-full w-22 opacity-50 z-1"></div>
        <img
          className="w-full h-full object-contain z-2 relative p-4"
          src={offer.vehicle.imageURL}
          alt={offer.vehicle.description}
        />
      </div>

      <div className="details flex-grow">
        <p className="provider-name font-bold text-base">
          {offer.serviceProvider.name.toUpperCase()}
        </p>
        <div className="vehicle-description font-normal text-xl mb-2">
          {offer.vehicle.description.replace(' or similar', '')}
        </div>
        <p className="text-base weight">por {offer.serviceProvider.name}</p>
        <p className="price text-4xl font-bold my-2 mb-4 text-lime-500">
          {currencySymbol} {offer.quotation.monetaryAmount}
        </p>
        <span className="transfer-type text-base font-bold bg-sky-200 px-3 py-1 rounded-2xl">
          {offer.transferType}
        </span>
      </div>

      <div className="px-6 py-4 cancellation-rules">
        <p className="text-base text-gray-700">Cancellation Rules:</p>
        <ul className="pl-5">
          {offer.cancellationRules &&
            offer.cancellationRules.map((rule, index) => (
              <li key={index} className="flex py-2 items-center">
                <FaAngleRight className="text-xl text-sky-900 mr-2" />
                <span className="rule-description w-64">
                  {rule.ruleDescription}
                </span>
              </li>
            ))}
        </ul>
      </div>

      <button
        onClick={handleCancelBooking}
        className="absolute top-4 right-4 bg-red-500 text-white px-5 py-1 rounded-lg"
      >
        Cancelar
      </button>
      {/* Resto del contenido de la tarjeta de reserva */}
    </div>
  );
};

export default ReserveCard;
