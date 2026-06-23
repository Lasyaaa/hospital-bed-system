const express = require('express');
const router = express.Router();
const { getAllBeds, getBedsByHospital, updateBeds } = require('../controllers/bedController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.get('/', getAllBeds);
router.get('/:hospitalId', getBedsByHospital);
router.put('/:hospitalId', protect, authorizeRoles('ADMIN'), updateBeds);

module.exports = router;