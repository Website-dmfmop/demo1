const express = require('express');
const router = express.Router();
const { verifyToken, restrictTo } = require('../middleware/auth');
const { upload, privateUpload } = require('../middleware/upload');
const { verifyCaptcha } = require('../middleware/validation');

const admissionController = require('../controllers/admissionController');

const { validateObjectId } = require('../middleware/validation');
router.param('id', validateObjectId);

// Admissions
router.get('/api/admissions', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'), admissionController.getAdmissions);
router.post('/api/admissions', verifyCaptcha, admissionController.createAdmission);
router.put('/api/admissions/:id/status', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'), admissionController.updateAdmissionStatus);
router.delete('/api/admissions/:id', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'), admissionController.deleteAdmission);

// Competitive Exam Admissions
router.get('/api/competitive-exam-admissions', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'), admissionController.getCompetitiveExamAdmissions);
router.post('/api/competitive-exam-admissions', admissionController.createCompetitiveExamAdmission);
router.put('/api/competitive-exam-admissions/:id/status', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'), admissionController.updateCompetitiveExamAdmissionStatus);
router.delete('/api/competitive-exam-admissions/:id', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'), admissionController.deleteCompetitiveExamAdmission);

// Joinees
router.get('/api/joinees', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'), admissionController.getJoinees);
router.post('/api/joinees', verifyCaptcha, admissionController.createJoinee);
router.put('/api/joinees/:id/status', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'), admissionController.updateJoineeStatus);
router.delete('/api/joinees/:id', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'), admissionController.deleteJoinee);

module.exports = router;
