const Hospital = require('../models/Hospital');
const BedAvailability = require('../models/BedAvailability');

// @route  GET /api/hospitals
// @access Public
const getHospitals = async (req, res) => {
  try {
    const { city } = req.query;

    const filter = {};
    if (city) {
      filter.city = city.toLowerCase().trim();
    }

    const hospitals = await Hospital.find(filter).sort({ createdAt: -1 });

    res.json({ count: hospitals.length, hospitals });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route  GET /api/hospitals/:id
// @access Public
const getHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);

    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    // Fetch bed availability for this hospital
    const beds = await BedAvailability.findOne({ hospitalId: req.params.id });

    res.json({ hospital, beds });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route  POST /api/hospitals
// @access Private (ADMIN only)
const createHospital = async (req, res) => {
  try {
    const { name, city, address, phone, email } = req.body;

    const hospital = await Hospital.create({ name, city, address, phone, email });

    // Automatically create an empty bed availability record for this hospital
    await BedAvailability.create({ hospitalId: hospital._id });

    res.status(201).json({ message: 'Hospital created successfully', hospital });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route  PUT /api/hospitals/:id
// @access Private (ADMIN only)
const updateHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    res.json({ message: 'Hospital updated successfully', hospital });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getHospitals, getHospitalById, createHospital, updateHospital };