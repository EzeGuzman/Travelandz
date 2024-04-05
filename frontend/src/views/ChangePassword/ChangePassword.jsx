import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import logo from './assets/logo.png';
import Swal from 'sweetalert2';
import './ChangePassword.css';

const ChangePassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { _id } = useParams(); // Obtener el ID del usuario de la URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Las contraseñas no coinciden!',
        showConfirmButton: true,
        confirmButtonText: 'Entendido',
      });
      return;
    }

    try {
      await axios.put(`http://localhost:4000/api/user/change-password`, {
        userId: _id,
        newPassword: password,
      });
      Swal.fire({
        icon: 'success',
        title: 'Contraseña actualizada exitosamente!',
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        window.location.href = '/'; // Redirige a la página de inicio de sesión
      }, 2000);
    } catch (error) {
      console.error('Error actualizando la contraseña:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar la contraseña. Inténtelo más tarde!',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <nav className="nav relative">
        <div className="brand__logo">
          <img src={logo} alt="" className="imgLogo" />
          <p className="nav__brand">Travelandz</p>
        </div>
      </nav>
      <div className="container mx-auto mt-8 p-4 bg-blue-100 rounded-lg shadow-md w-full sm:w-1/2">
        {' '}
        {/* Adjust width for small screens */}
        <h2 className="text-2xl font-bold my-4">Cambiar Contraseña</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label className="block mb-2">Nueva Contraseña:</label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="eye-icon"
              >
                {showPassword ? (
                  <IoMdEyeOff size={24} />
                ) : (
                  <IoMdEye size={24} />
                )}
              </button>
            </div>
          </div>
          <div className="mb-4 relative">
            <label className="block mb-2">Confirmar Contraseña:</label>
            <div className="password-input-container">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="eye-icon"
              >
                {showConfirmPassword ? (
                  <IoMdEyeOff size={24} />
                ) : (
                  <IoMdEye size={24} />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md w-full" // Make button full width for small screens
          >
            Cambiar Contraseña
          </button>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
