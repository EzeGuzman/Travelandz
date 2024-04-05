import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

const Button = ({ to, children, type, className, onClick }) => (
  <Link
    to={to}
    className={`button  button--${type} ${className}`}
    onClick={onClick}
  >
    {children}
  </Link>
);

export default Button;
