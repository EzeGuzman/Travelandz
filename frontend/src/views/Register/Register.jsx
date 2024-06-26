import React, { useState } from 'react';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';
import { MdMarkEmailRead } from 'react-icons/md';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';
import Swal from 'sweetalert2';

import './Register.css';
import '../../css/App.css';
import imgLogin from './assets/imgLogin.jpg';
import logo from '../../assets/logo.png';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar si se muestra la contraseña
  const [registrationStatus, setRegistrationStatus] = useState(''); // Estado para controlar el mensaje de advertencia
  const [statusHolder, setStatusHolder] = useState('message');
  const navigateTo = useNavigate();

  const createUser = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post(
        'https://travelandz-backend.onrender.com/api/user/signup',
        {
          email: email,
          name: name,
          password: password,
        }
      );
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Revisa tu correo para finalizar el registro!',
          showConfirmButton: false,
          timer: 1500,
        });

        setTimeout(() => {
          navigateTo('/'); // Redirige a la página de inicio de sesión
        }, 2000);
      }
    } catch (error) {
      // Maneja errores de red u otros errores aquí
      setRegistrationStatus(
        'Error al registrar el usuario. Por favor, inténtalo de nuevo.'
      );
      setStatusHolder('showMessage');
      setTimeout(() => {
        setStatusHolder('message');
      }, 4000);
      console.error('Error al registrar el usuario:', error);
    }
  };

  return (
    <div className="register__page flex">
      <div className="container flex">
        <div className="img__div">
          <img
            src={imgLogin}
            alt="Imagen del Registro de Test para Travelandz"
          />
          <div className="text__div">
            <h2 className="title">TravelTest</h2>
            <p className="subtitle">La mejor opción para tus viajes</p>
          </div>
          <div className="footer__div flex">
            <span className="text__footer">¿Tienes una cuenta?</span>
            <Link to={'/'}>
              <button className="btn btn__footer">Ingresa</button>
            </Link>
          </div>
        </div>
        <div className="form__div flex">
          <div className="header__div">
            <img src={logo} alt="Logo de Test para Travelandz" />
            <h3 className="title__form">¡Bienvenido!</h3>
          </div>
          <form className="form grid">
            {/* Mensaje de advertencia */}
            {registrationStatus && (
              <span className={statusHolder}>{registrationStatus}</span>
            )}
            <div className="input__div">
              <label htmlFor="email">Correo Electrónico</label>
              <div className="input flex">
                <MdMarkEmailRead className="icon" />
                <input
                  type="email"
                  id="email"
                  placeholder="Ingrese su correo electrónico"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </div>
            <div className="input__div">
              <label htmlFor="name">Nombre de Usuario</label>
              <div className="input flex">
                <FaUserShield className="icon" />
                <input
                  type="text"
                  id="name"
                  placeholder="Ingrese su nombre de usuario"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
            </div>
            <div className="input__div">
              <label htmlFor="password">Contraseña</label>
              <div className="input flex">
                <BsFillShieldLockFill className="icon" />
                <input
                  type={showPassword ? 'text' : 'password'} // Muestra la contraseña si showPassword es true
                  id="password"
                  placeholder="Ingrese su contraseña"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                {/* Botón para mostrar/ocultar la contraseña */}
                {showPassword ? (
                  <RiEyeCloseLine
                    className="toggle-password"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <RiEyeLine
                    className="toggle-password"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </div>
            <button type="submit" className="btn flex" onClick={createUser}>
              <span>Registrarse</span>
              <AiOutlineSwapRight className="icon" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
