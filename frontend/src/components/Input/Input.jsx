import React from 'react';
import './Input.css';

const Input = ({
  type,
  className,
  disabled,
  title,
  onClick,
  displayName,
  icon,
  id,
  name,
  labelClassName,
  onChange,
  value,
  placeholder,
  required,
  checked,
  multiple,
  step,
  accept,
  errorMessage,
}) => (
  <div
    className={`
      ${type}-container 
      ${className}
      ${disabled ? `${type}-container--disabled` : ''}
    `}
    title={title}
    onClick={onClick}
  >
    {displayName && (
      <label
        htmlFor={id ?? name}
        className={`${type}__label ${labelClassName} flex items-center gap-3`}
      >
        {displayName} {icon}
      </label>
    )}

    <input
      type={type}
      id={id}
      name={name}
      className={type}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      required={required}
      checked={checked}
      multiple={multiple}
      step={step}
      accept={accept}
      disabled={disabled}
    />

    {errorMessage && (
      <div className="bg-red-600 rounded-md w-80 p-2 absolute z-50 mt-[9rem]">
        <p className="text-white text-lg">{errorMessage}</p>
      </div>
    )}
  </div>
);

export default Input;
