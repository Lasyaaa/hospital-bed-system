const BedAvailability = require('../models/BedAvailability');

// @route  GET /api/beds
// @access Public
const getAllBeds = async (req, res) => {
  try {
    const beds = await BedAvailability.find()
      .populate('hospitalId', 'name city address phone')
      .sort({ lastUpdated: -1 });

    res.json({ beds });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route  GET /api/beds/:hospitalId
// @access Public
const getBedsByHospital = async (req, res) => {
  try {
    const beds = await BedAvailability.findOne({ hospitalId: req.params.hospitalId })
      .populate('hospitalId', 'name city address phone');

    if (!beds) {
      return res.status(404).json({ message: 'Bed data not found for this hospital' });
    }

    res.json({ beds });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route  PUT /api/beds/:hospitalId
// @access Private (ADMIN only)
const updateBeds = async (req, res) => {
  try {
    const { icuBeds, oxygenBeds, ventilatorBeds, oxygenAvailable } = req.body;

    const beds = await BedAvailability.findOneAndUpdate(
      { hospitalId: req.params.hospitalId },
      {
        icuBeds,
        oxygenBeds,
        ventilatorBeds,
        oxygenAvailable,
        lastUpdated: Date.now(),
      },
      { new: true, runValidators: true }
    );

    if (!beds) {
      return res.status(404).json({ message: 'Bed data not found for this hospital' });
    }

    // Socket.IO event will be emitted here in Phase 8
    // req.io.emit('bedUpdated', { hospitalId: req.params.hospitalId, beds });

    res.json({ message: 'Bed availability updated successfully', beds });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getAllBeds, getBedsByHospital, updateBeds };