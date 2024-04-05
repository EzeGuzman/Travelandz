import React from 'react';

const Select = ({ value, onChange, options }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="p-2 border border-gray-300 rounded-lg w-full focus:border-gray-400 outline-none"
    >
      <option value="">Selecciona un tipo de Traslado</option>
      {options.map(({ value, label }, index) => (
        <option
          key={index}
          value={value}
          className="py-1 px-2 bg-white hover:bg-gray-100 cursor-pointer"
        >
          {label}
        </option>
      ))}
    </select>
  );
};

export default Select;
