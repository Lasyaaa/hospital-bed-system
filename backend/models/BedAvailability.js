const mongoose = require('mongoose');

const bedAvailabilitySchema = new mongoose.Schema(
  {
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hospital',
      required: true,
      unique: true,
    },
    icuBeds: {
      total: { type: Number, default: 0 },
      available: { type: Number, default: 0 },
    },
    oxygenBeds: {
      total: { type: Number, default: 0 },
      available: { type: Number, default: 0 },
    },
    ventilatorBeds: {
      total: { type: Number, default: 0 },
      available: { type: Number, default: 0 },
    },
    oxygenAvailable: {
      type: Boolean,
      default: true,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('BedAvailability', bedAvailabilitySchema);