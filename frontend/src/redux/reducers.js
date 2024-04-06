import { combineReducers } from 'redux';
import {
  SET_START_LOCATION_CODE,
  SET_TRANSFER_TYPE,
  SET_START_DATE_TIME,
  SET_END_ADDRESS_LINE,
  SET_END_GEO_CODE,
  SET_END_COUNTRY_CODE,
  SET_SEARCH_CLICKED,
  SET_TRANSFER_OFFERS,
  SET_SELECTED_OFFER,
  SET_ADDRESS,
  SET_SELECTED_DATE,
  SET_AIRPORT_CODES,
  SET_CREDIT_CARD_DETAILS,
  SET_PAYMENT_METHOD,
  SET_USER_ID,
  USER_SIGNIN,
  USER_SIGNOUT,
} from './actions';

// Reductores
const searchInitialState = {
  startLocationCode: '',
  transferType: '',
  startDateTime: '',
  endAddressLine: '',
  endGeoCode: '',
  endCountryCode: '',
  searchClicked: false,
  transferOffers: [],
  paymentMethod: '',
  userId: '',
};

const searchReducer = (state = searchInitialState, action) => {
  switch (action.type) {
    case SET_START_LOCATION_CODE:
      return { ...state, startLocationCode: action.payload };
    case SET_TRANSFER_TYPE:
      return { ...state, transferType: action.payload };
    case SET_START_DATE_TIME:
      return { ...state, startDateTime: action.payload };
    case SET_END_ADDRESS_LINE:
      return { ...state, endAddressLine: action.payload };
    case SET_END_GEO_CODE:
      return { ...state, endGeoCode: action.payload };
    case SET_END_COUNTRY_CODE:
      return { ...state, endCountryCode: action.payload };
    case SET_SEARCH_CLICKED:
      return { ...state, searchClicked: action.payload };
    case SET_TRANSFER_OFFERS:
      return { ...state, transferOffers: action.payload };
    case SET_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    case SET_USER_ID:
      return { ...state, userId: action.payload };
    default:
      return state;
  }
};

const addressInitialState = '';

const addressReducer = (state = addressInitialState, action) => {
  switch (action.type) {
    case SET_ADDRESS:
      return action.payload;
    default:
      return state;
  }
};

const selectedDateInitialState = '';

const selectedDateReducer = (state = selectedDateInitialState, action) => {
  switch (action.type) {
    case SET_SELECTED_DATE:
      return action.payload;
    default:
      return state;
  }
};

const airportCodesInitialState = [];

const airportCodesReducer = (state = airportCodesInitialState, action) => {
  switch (action.type) {
    case SET_AIRPORT_CODES:
      return action.payload;
    default:
      return state;
  }
};

const creditCardInitialState = {};

const creditCardReducer = (state = creditCardInitialState, action) => {
  switch (action.type) {
    case SET_CREDIT_CARD_DETAILS:
      return action.payload;
    default:
      return state;
  }
};

const paymentInitialState = '';

const paymentReducer = (state = paymentInitialState, action) => {
  switch (action.type) {
    case SET_PAYMENT_METHOD:
      return action.payload;
    default:
      return state;
  }
};

const transferInitialState = null;

const transferReducer = (state = transferInitialState, action) => {
  switch (action.type) {
    case SET_SELECTED_OFFER:
      return action.payload;
    default:
      return state;
  }
};

const userInitialState = {
  isAuthenticated: false,
  userId: null,
};

const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case USER_SIGNIN:
      return { ...state, isAuthenticated: true, userId: action.payload.userId };
    case USER_SIGNOUT:
      return { ...state, isAuthenticated: false, userId: null };
    default:
      return state;
  }
};

// Combina todos los reductores en un solo reductor raíz
const rootReducer = combineReducers({
  search: searchReducer,
  address: addressReducer,
  selectedDate: selectedDateReducer,
  airportCodes: airportCodesReducer,
  creditCardDetails: creditCardReducer,
  selectedOffer: transferReducer,
  paymentMethod: paymentReducer,
  user: userReducer,
});

export default rootReducer;
