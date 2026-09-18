const express = require('express');
const router = express.Router();

router.use('/', require('./admissionRoutes.js'));
router.use('/', require('./courseRoutes.js'));
router.use('/', require('./donationRoutes.js'));
router.use('/', require('./jobRoutes.js'));
router.use('/', require('./mediaRoutes.js'));
router.use('/', require('./partnerRoutes.js'));
router.use('/', require('./bookingRoutes.js'));
router.use('/', require('./csrRoutes.js'));
router.use('/', require('./fileRoutes.js'));
router.use('/', require('./healthRoutes.js'));

module.exports = router;
