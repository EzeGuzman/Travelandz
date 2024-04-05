import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAddress as setAddressAction } from '../../redux/actions.js';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const libraries = ['places'];

const SearchMap = ({ onAddressSelect, googlePlacesApiKey }) => {
  const dispatch = useDispatch();
  const address = useSelector((state) => state.address);

  const handleSelect = useCallback(
    async (value) => {
      try {
        let addressBeforeComma = value.split(',')[0];
        const match = addressBeforeComma.match(/^\d+\s+/);

        if (match) {
          const numericPart = match[0].trim();
          const restOfAddress = addressBeforeComma
            .substring(match[0].length)
            .trim();
          addressBeforeComma = `${restOfAddress}, ${numericPart}`;
        }

        const results = await geocodeByAddress(value);
        const countryCode = results[0].address_components.find((component) =>
          component.types.includes('country')
        ).short_name;
        const ll = await getLatLng(results[0]);
        const endGeoCode = `${ll.lat},${ll.lng}`;

        dispatch(setAddressAction(addressBeforeComma));
        onAddressSelect(addressBeforeComma, endGeoCode, countryCode);
      } catch (error) {
        console.error('Error:', error);
      }
    },
    [dispatch, onAddressSelect]
  );

  const setAddressModified = useCallback(
    (value) => {
      let addressModified = value;
      const match = value.match(/^\d+/);

      if (match) {
        const numericPart = match[0];
        const restOfAddress = value.substring(match[0].length).trim();
        addressModified = `${numericPart}, ${restOfAddress}`;
      }
      dispatch(setAddressAction(addressModified));
    },
    [dispatch]
  );

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      libraries={libraries}
      loadingElement={<div className="text-center">Cargando...</div>}
    >
      <PlacesAutocomplete
        value={address}
        onChange={setAddressModified}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="relative">
            <input
              {...getInputProps({
                placeholder: 'Ingresa una dirección',
                className:
                  'location-search-input p-2 border border-gray-300 rounded-lg w-full focus:border-gray-400 outline-none',
              })}
            />
            <div className="autocomplete-dropdown-container absolute z-10 top-auto w-full">
              {loading && <div className="text-center">Cargando...</div>}
              {suggestions.map((suggestion, index) => {
                const className = suggestion.active
                  ? 'suggestion-item--active border border-gray-300 bg-gray-100 cursor-pointer'
                  : 'suggestion-item border border-gray-300 bg-white cursor-pointer';
                return (
                  <div
                    key={index}
                    {...getSuggestionItemProps(suggestion, { className })}
                  >
                    <span className="block p-2">{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </LoadScript>
  );
};

export default SearchMap;
