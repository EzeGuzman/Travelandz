import mongoose from 'mongoose';

const airportCodeSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId('65f7677f18019aca3740ae58'), // Utiliza una función para generar un nuevo ObjectId por defecto
  },
  iata: {
    type: String,
    required: true,
  },
  lon: String,
  iso: String,
  status: Number,
  name: String,
  continent: String,
  type: String,
  lat: String,
  size: String,
});

const AirportCode = mongoose.model('AirportCode', airportCodeSchema);

export default AirportCode;
