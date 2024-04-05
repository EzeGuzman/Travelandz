import express from 'express';
const router = express.Router();
import Booking from '../models/bookingModel.js';

// Ruta para crear una nueva reserva
router.post('/reserve', async (req, res) => {
  try {
    const bookingData = req.body; // Los datos de la reserva enviados desde el cliente
    const newBooking = await Booking.create(bookingData);
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener las reservas de un usuario específico
router.get('/user/:user_id/bookings', async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const userBookings = await Booking.find({ user_id });
    res.status(200).json(userBookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener las reservas asociadas a una oferta específica
router.get('/offer/:offer_id/bookings', async (req, res) => {
  try {
    const offer_id = req.params.offer_id;
    const offerBookings = await Booking.find({ offer_id });
    res.status(200).json(offerBookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para eliminar una reserva por su ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Booking.findByIdAndDelete(id);
    res.status(200).send('Reserva eliminada correctamente');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
