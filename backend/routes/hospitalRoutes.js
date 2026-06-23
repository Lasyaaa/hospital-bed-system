const express = require('express');
const router = express.Router();
const {
  getHospitals,
  getHospitalById,
  createHospital,
  updateHospital,
} = require('../controllers/hospitalController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.get('/', getHospitals);
router.get('/:id', getHospitalById);
router.post('/', protect, authorizeRoles('ADMIN'), createHospital);
router.put('/:id', protect, authorizeRoles('ADMIN'), updateHospital);

module.exports = router;