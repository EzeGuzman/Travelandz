import React, { useState } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import './ProductCard.scss';

const ProductCard = ({ offer, onSelect }) => {
  const [isSelected, setIsSelected] = useState(false); // Estado para el checkbox

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

  const toggleSelection = () => {
    setIsSelected(!isSelected); // Cambia el estado del checkbox
    onSelect(offer, !isSelected); // Llama a la función onSelect pasando la oferta y el estado actual del checkbox
  };

  const handleCheckboxClick = () => {
    onSelect(offer, true); // Pasar true para indicar que proviene del checkbox
  };

  return (
    <div
      className={`product-card relative flex flex-row items-center overflow-hidden shadow-lg ${
        isSelected ? 'selected' : ''
      }`}
    >
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

      {/* Checkbox para seleccionar la oferta */}
      <input
        type="checkbox"
        checked={isSelected}
        onChange={toggleSelection}
        className="checkbox"
      />
    </div>
  );
};

export default ProductCard;
