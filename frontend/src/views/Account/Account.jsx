import React, { useState, useEffect } from 'react';
import { Nav } from '../../components/index.js';
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

const Account = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      const parsedUserInfo = JSON.parse(storedUserInfo);
      setUserInfo(parsedUserInfo);
      fetchUserData(parsedUserInfo._id);
    }
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/user/get/${userId}`
      );
      const userData = response.data;
      setName(userData.name);
      setEmail(userData.email);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/user/update/${userInfo._id}`,
        {
          name,
          email,
        }
      );

      console.log(response.data);
      Swal.fire({
        icon: 'success',
        title: 'Tus datos fueron actualizados con éxito!',
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
      setEditable(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleChangePassword = () => {
    Swal.fire({
      title: '¿Estás seguro de cambiar tu contraseña?',
      text: 'Recibirás un correo electrónico para confirmar el cambio',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cambiar contraseña',
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí puedes implementar la lógica para enviar el correo electrónico para cambiar la contraseña
        // Esto podría incluir enviar una solicitud al backend que maneja el envío de correo electrónico
        // Después de confirmar el cambio, puedes redirigir al usuario a la página de cambio de contraseña
        sendChangePasswordEmail(); // Función para enviar el correo electrónico
        Swal.fire(
          'Correo electrónico enviado',
          'Se ha enviado un correo electrónico para cambiar tu contraseña.',
          'success'
        );
      }
    });
  };

  // Función para enviar el correo electrónico para cambiar la contraseña
  const sendChangePasswordEmail = async () => {
    try {
      await axios.post(`http://localhost:4000/api/user/change-password-email`, {
        userId: userInfo._id,
        userEmail: email, // Aquí podrías enviar el correo electrónico del usuario
      });
    } catch (error) {
      console.error('Error sending change password email:', error);
    }
  };

  return (
    <>
      <nav>
        <Nav />
      </nav>
      <div className="container mx-auto mt-8 p-4 bg-blue-100 rounded-lg shadow-md w-1/2">
        <h2 className="text-2xl font-bold my-4">Mi cuenta</h2>
        <form>
          <div className="mb-4">
            <label className="block mb-2">Nombre:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
              className={`border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500 ${
                editable ? '' : 'bg-gray-100'
              }`}
              disabled={!editable}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Correo electrónico:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              className={`border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500 ${
                editable ? '' : 'bg-gray-100'
              }`}
              disabled={!editable}
            />
          </div>
          <button
            type="button"
            onClick={editable ? handleUpdate : () => setEditable(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded-md mr-4"
          >
            {editable ? 'Actualizar' : 'Actualizar mis datos'}
          </button>
          <button
            type="button"
            onClick={handleChangePassword}
            className="bg-green-500 text-white py-2 px-4 rounded-md"
          >
            Cambiar contraseña
          </button>
        </form>
      </div>
    </>
  );
};

export default Account;
