import React from 'react';
import { Link } from 'react-router-dom';

import vectorVerification from './assets/vectorVerification.jpg';
import { Button, Nav } from '../../components/index.js';
import './Authentication.scss';

import { AiOutlineSwapRight } from 'react-icons/ai';

const Authentication = () => {
  return (
    <>
      <Nav />
      <div
        className="verification-body"
        style={{ position: 'absolute', zIndex: '-1' }}
      >
        <div className="top-container">
          <img
            className="top-img"
            src={vectorVerification}
            alt="Verificación"
          />
          <h1 className="top-title">Bienvenido a la familia Moving360</h1>
        </div>
        <div className="bottom-container">
          <h3 className="bottom-title">
            Tu cuenta ha sido verificada con éxito!
          </h3>
          <p className="bottom-text">
            Con tu cuenta ya verificada podes navegar a lo largo de todo
            TravelTest teniendo acceso a cada una de las funciones que
            ofrecemos, tales como:{' '}
            <b>
              REALIZAR BÚSQUEDAS DE TRANSFERS, VER DETALLES DE TRANSFERS
              DISPONIBLES, SELECCIONAR Y VER RESERVAS
            </b>
          </p>

          <Link to={'/'}>
            <button className="btn btn__verify">
              <span>Iniciar sesión</span>
              <AiOutlineSwapRight className="icon" />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Authentication;
