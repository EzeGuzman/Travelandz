import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const transferRouter = express.Router();

let accessToken = null;
let tokenExpirationTime = 0;

// Función para obtener el access token de Amadeus
const getAccessToken = async () => {
  if (accessToken && Date.now() < tokenExpirationTime) {
    return accessToken;
  }

  try {
    const response = await fetch(
      'https://test.api.amadeus.com/v1/security/oauth2/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: process.env.AMADEUS_CLIENT_ID,
          client_secret: process.env.AMADEUS_CLIENT_SECRET,
        }),
      }
    );

    const responseData = await response.json();
    accessToken = responseData.access_token;
    tokenExpirationTime = Date.now() + responseData.expires_in * 1000; // Guardar el tiempo de expiración del token
    return accessToken;
  } catch (error) {
    console.error('Error obteniendo el access token:', error);
    throw error;
  }
};

transferRouter.post('/transfer-offers', async (req, res) => {
  try {
    // Obtener el access token
    const accessToken = await getAccessToken();

    // Validar la entrada
    const {
      startLocationCode,
      transferType,
      startDateTime,
      endAddressLine,
      endCountryCode,
      endGeoCode,
    } = req.body;

    if (
      !startLocationCode ||
      !transferType ||
      !startDateTime ||
      !endAddressLine ||
      !endCountryCode ||
      !endGeoCode
    ) {
      return res
        .status(400)
        .json({ message: 'Falta información en la solicitud' });
    }

    // Realizar la solicitud a la API de Amadeus
    const config = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startLocationCode,
        transferType,
        startDateTime,
        endAddressLine,
        endCountryCode,
        endGeoCode,
      }),
    };

    const response = await fetch(
      'https://test.api.amadeus.com/v1/shopping/transfer-offers',
      config
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `Error en la solicitud a la API de Amadeus: ${errorMessage}`
      );
    }

    const responseData = await response.json();

    res.status(response.status).json(responseData);
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ message: 'Error en la solicitud a la API de Amadeus' });
  }
});

export default transferRouter;
