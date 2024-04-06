import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { useDispatch } from 'react-redux';

const Step2 = ({ onSelectPayment, onCreditCardDetails }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
    paymentMethod: '',
    selectedOffer: null,
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: value }));

    // Llama a la función onCreditCardDetails para actualizar los detalles de la tarjeta
    onCreditCardDetails({ ...state, [name]: value });
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  // Función para formatear el número de tarjeta
  const formatCardNumber = (input) => {
    let cardNumber = input.replace(/\D/g, '');

    cardNumber = cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ');

    return cardNumber;
  };

  // Función para formatear la fecha de expiración
  const formatExpiry = (input) => {
    let expiry = input.replace(/\D/g, '');

    expiry = expiry.replace(/(\d{2})(?=\d)/g, '$1/');

    return expiry;
  };

  const handlePaymentMethodChange = (evt) => {
    const value = evt.target.value;
    setState((prevState) => ({
      ...prevState,
      paymentMethod: value,
    }));
    onSelectPayment(value);
  };

  const handlePaymentSelection = (method) => {
    dispatch({ type: 'SET_PAYMENT_METHOD', payload: method });
    onSelectPayment(method);
  };

  const handleCreditCardDetails = (details) => {
    dispatch({ type: 'SET_CREDIT_CARD_DETAILS', payload: details });
    onCreditCardDetails(details);
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <div className="mt-6">
        <label className="block mb-2 font-bold" htmlFor="paymentMethod">
          Método de Pago
        </label>
        <select
          id="paymentMethod"
          value={state.paymentMethod}
          onChange={handlePaymentMethodChange}
          className="p-2 border border-gray-300 rounded-lg w-full focus:border-gray-400 outline-none"
        >
          <option value="">Seleccione un método de pago</option>
          <option value="efectivo">Efectivo</option>
          <option value="tarjeta">Tarjeta de débito/crédito</option>
        </select>

        {/* Renderiza el componente Cards o el mensaje basado en el método de pago seleccionado */}
        {state.paymentMethod === 'tarjeta' && (
          <div className="mt-4">
            <Cards
              number={state.number}
              expiry={state.expiry}
              cvc={state.cvc}
              name={state.name}
              focused={state.focus}
            />
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-bold" htmlFor="number">
                    Número de Tarjeta
                  </label>
                  <input
                    id="number"
                    type="text"
                    name="number"
                    placeholder="Número de Tarjeta"
                    value={formatCardNumber(state.number)}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    maxLength="19"
                    className="p-2 border border-gray-300 rounded-lg w-full focus:border-gray-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-bold" htmlFor="name">
                    Nombre
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Nombre completo"
                    value={state.name}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    maxLength="50"
                    className="p-2 border border-gray-300 rounded-lg w-full focus:border-gray-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-bold" htmlFor="expiry">
                    Fecha de Expiración
                  </label>
                  <input
                    id="expiry"
                    type="text"
                    name="expiry"
                    placeholder="Fecha de expiración"
                    value={formatExpiry(state.expiry)}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    maxLength="5"
                    className="p-2 border border-gray-300 rounded-lg w-full focus:border-gray-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-bold" htmlFor="cvc">
                    CVC
                  </label>
                  <input
                    id="cvc"
                    type="text"
                    name="cvc"
                    placeholder="Ingrese los 3 número detrás de la tarjeta"
                    value={state.cvc}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    maxLength="3"
                    className="p-2 border border-gray-300 rounded-lg w-full focus:border-gray-400 outline-none"
                  />
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Muestra mensaje si se selecciona efectivo */}
        {state.paymentMethod === 'efectivo' && (
          <div className="mt-4">
            <p className="text-center bg-lime-200 text-lime-950 py-3 px-8 rounded-lg">
              Usted abonará el monto prescripto al finalizar el viaje. Tenga en
              cuenta tener el dinero correctamente para no tener problemas con
              su conductor designado.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step2;
