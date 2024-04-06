import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Step3.css';

const Step3 = ({
  selectedOffer,
  paymentMethod,
  creditCardDetails,
  onConfirm,
}) => {
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
  const handleConfirmation = () => {
    // Realiza cualquier validación necesaria antes de confirmar la reserva
    // Por ejemplo, verifica que se hayan seleccionado una oferta y un método de pago
    if (!selectedOffer || !paymentMethod) {
      showErrorToast(
        'Por favor, selecciona una oferta y un método de pago antes de confirmar!'
      );
      return;
    }

    // Llama a la función onConfirm para enviar la reserva al servidor
    onConfirm();
  };

  return (
    <div className="container mx-auto mt-8 p-4 bg-blue-100 rounded-lg shadow-md w-1/2">
      <h2 className="text-2xl font-bold my-4">Resumen de la reserva</h2>

      {/* Muestra los detalles de la oferta seleccionada */}
      {selectedOffer ? (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            Detalles de la oferta seleccionada:
          </h3>
          <div className="border border-gray-300 p-4 rounded-lg">
            <p className="font-semibold">
              {selectedOffer.serviceProvider.name}
            </p>
            <p>{selectedOffer.vehicle.description}</p>
            <p>Capacidad: {selectedOffer.vehicle.capacity}</p>
            <p>Tipo de Servicio: {selectedOffer.transferType}</p>
            <p>
              Precio: {selectedOffer.converted.currencyCode}{' '}
              {selectedOffer.converted.monetaryAmount}
            </p>
            <p>
              Origen:{' '}
              {selectedOffer.start?.locationCode || 'Dirección no disponible'}
            </p>
            <p>
              Destino:{' '}
              {selectedOffer.end?.address?.line || 'Dirección no disponible'},{' '}
              {selectedOffer.end?.address?.countryCode ||
                'Código de país no disponible'}
            </p>
          </div>
        </div>
      ) : (
        <p>No se ha seleccionado ninguna oferta.</p>
      )}

      {/* Muestra el método de pago */}
      {/* Muestra los detalles de la tarjeta si se selecciona tarjeta como método de pago */}
      {paymentMethod === 'tarjeta' && creditCardDetails && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            Detalles de la tarjeta de crédito:
          </h3>
          <p>Número de Tarjeta: {creditCardDetails.number}</p>
          <p>Nombre: {creditCardDetails.name}</p>
          <p>Fecha de Expiración: {creditCardDetails.expiry}</p>
          <p>CVC: {creditCardDetails.cvc}</p>
        </div>
      )}
      {paymentMethod === 'efectivo' && (
        <div className="mt-4">
          <p className="text-lg font-semibold mb-2">Método de Pago</p>
          <p className="text-center bg-lime-200 text-lime-950 py-3 px-8 rounded-lg">
            El pago lo realizará en efectivo
          </p>
        </div>
      )}
    </div>
  );
};

export default Step3;
