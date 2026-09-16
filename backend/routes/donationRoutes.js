const express = require('express');
const router = express.Router();
const { verifyToken, restrictTo } = require('../middleware/auth');
const { upload, privateUpload } = require('../middleware/upload');
const { verifyCaptcha } = require('../middleware/validation');


const { validateObjectId } = require('../middleware/validation');
router.param('id', validateObjectId);

const donationController = require('../controllers/donationController');

router.get('/api/donations', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'), donationController.getDonations);

router.post('/api/donations', verifyCaptcha, donationController.createDonation);

router.delete('/api/donations/:id', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'), donationController.deleteDonation);

module.exports = router;
