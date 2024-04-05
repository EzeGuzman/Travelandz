import axios from 'axios';

// Constantes de acción
export const SET_START_LOCATION_CODE = 'SET_START_LOCATION_CODE';
export const SET_TRANSFER_TYPE = 'SET_TRANSFER_TYPE';
export const SET_START_DATE_TIME = 'SET_START_DATE_TIME';
export const SET_END_ADDRESS_LINE = 'SET_END_ADDRESS_LINE';
export const SET_END_GEO_CODE = 'SET_END_GEO_CODE';
export const SET_END_COUNTRY_CODE = 'SET_END_COUNTRY_CODE';
export const SET_SEARCH_CLICKED = 'SET_SEARCH_CLICKED';
export const SET_TRANSFER_OFFERS = 'SET_TRANSFER_OFFERS';
export const SET_SELECTED_OFFER = 'SET_SELECTED_OFFER';
export const SET_ADDRESS = 'SET_ADDRESS';
export const SET_SELECTED_DATE = 'SET_SELECTED_DATE';
export const SET_AIRPORT_CODES = 'SET_AIRPORT_CODES';
export const SET_CREDIT_CARD_DETAILS = 'SET_CREDIT_CARD_DETAILS';
export const SET_PAYMENT_METHOD = 'SET_PAYMENT_METHOD';
export const SET_USER_ID = 'SET_USER_ID';
export const USER_SIGNIN = 'USER_SIGNIN'; // Nueva acción para iniciar sesión
export const USER_SIGNOUT = 'USER_SIGNOUT'; // Nueva acción para cerrar sesión

// Acciones
export const setStartLocationCode = (locationCode) => ({
  type: SET_START_LOCATION_CODE,
  payload: locationCode,
});

export const setTransferType = (type) => ({
  type: SET_TRANSFER_TYPE,
  payload: type,
});

export const setStartDateTime = (dateTime) => ({
  type: SET_START_DATE_TIME,
  payload: dateTime,
});

export const setEndAddressLine = (address) => ({
  type: SET_END_ADDRESS_LINE,
  payload: address,
});

export const setEndGeoCode = (geoCode) => ({
  type: SET_END_GEO_CODE,
  payload: geoCode,
});

export const setEndCountryCode = (countryCode) => ({
  type: SET_END_COUNTRY_CODE,
  payload: countryCode,
});

export const setSearchClicked = (clicked) => ({
  type: SET_SEARCH_CLICKED,
  payload: clicked,
});

export const setTransferOffers = (offers) => ({
  type: SET_TRANSFER_OFFERS,
  payload: offers,
});

export const setSelectedOffer = (offer) => ({
  type: SET_SELECTED_OFFER,
  payload: offer,
});

export const setAddress = (address) => ({
  type: SET_ADDRESS,
  payload: address,
});

export const setSelectedDate = (date) => ({
  type: SET_SELECTED_DATE,
  payload: date,
});

export const setAirportCodes = (airportCodes) => ({
  type: SET_AIRPORT_CODES,
  payload: airportCodes,
});

export const setCreditCardDetails = (details) => ({
  type: SET_CREDIT_CARD_DETAILS,
  payload: details,
});

export const setPaymentMethod = (method) => ({
  type: SET_PAYMENT_METHOD,
  payload: method,
});

export const setUserId = () => {
  const userId = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))._id
    : '';
  return {
    type: SET_USER_ID,
    payload: userId,
  };
};

// Acción para iniciar sesión
export const userSigninAction =
  (name, password, navigateTo) => async (dispatch, getState) => {
    try {
      const { data } = await axios.post(
        'http://localhost:4000/api/user/signin',
        {
          name,
          password,
        }
      );

      dispatch({ type: USER_SIGNIN, payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigateTo('/home');
    } catch (error) {
      console.log(error);
    }
  };

// Acción para cerrar sesión
export const userSignoutAction = () => async (dispatch, getState) => {
  dispatch({ type: USER_SIGNOUT });
  localStorage.removeItem('userInfo');
};

// Función para obtener ofertas de transferencia
export const fetchTransferOffers = () => {
  return async (dispatch, getState) => {
    try {
      const {
        startLocationCode,
        transferType,
        startDateTime,
        endAddressLine,
        endCountryCode,
        endGeoCode,
      } = getState().search;

      const response = await axios.post(
        'http://localhost:4000/api/transfer/transfer-offers',
        {
          startLocationCode,
          transferType,
          startDateTime,
          endAddressLine,
          endCountryCode,
          endGeoCode,
        }
      );

      dispatch(setTransferOffers(response.data.data));
    } catch (error) {
      console.error('Error fetching transfer offers:', error);
    }
  };
};
