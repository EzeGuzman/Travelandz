import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  offer_id: { type: String, required: true, unique: true },
  offer: {
    id: String,
    type: String,
    language: String,
    transferType: String,
    start: {
      dateTime: String,
      locationCode: String,
    },
    end: {
      dateTime: String,
      address: {
        line: String,
        zip: String,
        countryCode: String,
        cityName: String,
        latitude: Number,
        longitude: Number,
      },
    },
    vehicle: {
      code: String,
      category: String,
      description: String,
      imageURL: String,
      seats: [
        {
          count: Number,
        },
      ],
    },
    serviceProvider: {
      code: String,
      name: String,
      termsUrl: String,
      logoUrl: String,
    },
    quotation: {
      monetaryAmount: String,
      currencyCode: String,
      taxes: [
        {
          monetaryAmount: String,
        },
      ],
      totalTaxes: {
        monetaryAmount: String,
      },
      base: {
        monetaryAmount: String,
      },
      totalFees: {
        monetaryAmount: String,
      },
    },
    cancellationRules: [
      {
        feeType: String,
        feeValue: String,
        metricType: String,
        metricMax: String,
        metricMin: String,
        ruleDescription: String,
      },
    ],
    converted: {
      monetaryAmount: String,
      currencyCode: String,
      taxes: [
        {
          monetaryAmount: String,
        },
      ],
      totalTaxes: {
        monetaryAmount: String,
      },
      base: {
        monetaryAmount: String,
      },
      totalFees: {
        monetaryAmount: String,
      },
    },
    distance: {
      value: Number,
      unit: String,
    },
    passengerCharacteristics: [
      {
        passengerTypeCode: String,
        age: Number,
      },
    ],
    methodsOfPaymentAccepted: [String],
  },
  fecha_reserva: { type: Date, default: Date.now },
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
