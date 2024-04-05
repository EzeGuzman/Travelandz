import React from 'react';

const DateSelect = ({ value, onChange }) => {
  const formatDate = (date) => {
    if (!date || isNaN(date.getTime())) {
      return ''; // Manejar fechas inválidas devolviendo una cadena vacía
    }

    const pad = (num) => (num < 10 ? '0' + num : num);

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  const formattedDate = formatDate(new Date(value));

  return (
    <div className="relative w-full">
      <input
        type="datetime-local"
        value={formattedDate}
        onChange={onChange}
        className="p-2 border border-gray-300 rounded-lg w-full focus:border-gray-400 outline-none"
      />
    </div>
  );
};

export default DateSelect;
