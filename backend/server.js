import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import userRouter from './src/routes/userRouter.js';
import transferRouter from './src/routes/transferRouter.js';
import airportCodeRouter from './src/routes/airportCodeRouter.js';
import bookingRouter from './src/routes/bookingRouter.js';

dotenv.config();

// Conexión a la base de datos
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('DB is Connected!'))
  .catch((err) => console.error('Error connecting to database:', err));

const app = express();

// Middleware
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de CORS
const corsOptions = {
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));

// Rutas
app.use('/api/user', userRouter);
app.use('/api/transfer', transferRouter);
app.use('/api/airport-codes', airportCodeRouter);
app.use('/api/booking', bookingRouter);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Iniciar servidor
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
