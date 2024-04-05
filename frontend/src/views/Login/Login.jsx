import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userSigninAction } from '../../redux/actions.js';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri'; // Importa los íconos de mostrar/ocultar contraseña
import './Login.css';
import '../../css/App.css';
import imgLogin from './assets/imgLogin.jpg';
import logo from '../../assets/logo.png';
import Swal from 'sweetalert2';
import axios from 'axios';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const [loginStatus, setLoginStatus] = useState('');
  const [statusHolder, setStatusHolder] = useState('message');
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar si se muestra la contraseña

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      dispatch(userSigninAction(name, password, navigateTo));
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setLoginStatus('Error al iniciar sesión');
      setStatusHolder('showMessage');
      setTimeout(() => {
        setStatusHolder('message');
      }, 4000);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setName('');
    setPassword('');
  };

  const handleForgotPassword = async () => {
    const { value: email } = await Swal.fire({
      title: 'Ingrese su correo electrónico',
      input: 'email',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Enviar',
    });

    if (email) {
      try {
        // Enviar solicitud al backend para restablecer la contraseña
        const response = await axios.post(
          'https://travelandz-backend.onrender.com/api/user/reset-password-request',
          {
            email,
          }
        );
        console.log('Respuesta del backend:', response.data);
        Swal.fire({
          icon: 'success',
          title: 'Correo electrónico enviado',
          text: 'Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña',
        });
      } catch (error) {
        console.error(
          'Error al enviar la solicitud para restablecer la contraseña:',
          error
        );
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al enviar la solicitud para restablecer la contraseña',
        });
      }
    }
  };

  return (
    <div className="login__page flex">
      <div className="container flex">
        <div className="img__div">
          <img src={imgLogin} alt="Imágen del Login de Test para Travelandz" />

          <div className="text__div">
            <h2 className="title">TravelTest</h2>
            <p className="subtitle">La mejor opción para tus viajes</p>
          </div>

          <div className="footer__div flex">
            <span className="text__footer">No tienes una cuenta?</span>
            <Link to={'/register'}>
              <button className="btn btn__footer">Registrate</button>
            </Link>
          </div>
        </div>

        <div className="form__div flex">
          <div className="header__div">
            <img src={logo} alt="Logo de test para Travelandz" />
            <h3 className="title__form">¡Hola nuevamente!</h3>
          </div>

          <form className="form grid" onSubmit={onSubmit}>
            <span className={statusHolder}>{loginStatus}</span>
            <div className="input__div">
              <label htmlFor="username">Nombre de Usuario</label>
              <div className="input flex">
                <FaUserShield className="icon" />
                <input
                  type="text"
                  id="username"
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
                  type={showPassword ? 'text' : 'password'} // Mostrar la contraseña si showPassword es true
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

            <button type="submit" className="btn flex" onClick={loginUser}>
              <span>Ingresar</span>
              <AiOutlineSwapRight className="icon" />
            </button>

            <span className="forgot__password" onClick={handleForgotPassword}>
              ¿Olvidaste tu contraseña? <a>Haz clic aquí</a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
