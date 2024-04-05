import express from 'express';
import AirportCode from '../models/airportCodeModel.js';

const airportCodeRouter = express.Router();

airportCodeRouter.get('/', async (req, res) => {
  try {
    // Obtener solo los campos 'iata' y 'name' de los documentos
    const airportCodes = await AirportCode.find({}, { iata: 1, name: 1 });

    if (airportCodes.length === 0) {
      return res.status(204).end(); // No Content
    }

    // Enviar los códigos de aeropuerto como respuesta
    res.status(200).json(airportCodes);
  } catch (error) {
    console.error('Error obteniendo códigos de aeropuerto:', error);
    res.status(500).json({ message: 'Error obteniendo códigos de aeropuerto' });
  }
});

export default airportCodeRouter;
