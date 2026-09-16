const express = require('express');
const router = express.Router();
const { verifyToken, restrictTo } = require('../middleware/auth');
const { upload, privateUpload } = require('../middleware/upload');
const { verifyCaptcha } = require('../middleware/validation');
const SlotBooking = require('../models/SlotBooking');

const { validateObjectId } = require('../middleware/validation');
router.param('id', validateObjectId);

router.get('/api/slot-bookings', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  async (req, res) => {
    try {
        const bookings = await SlotBooking.find().sort({ createdAt: -1 });
        res.json(bookings);
    } catch (err) { res.status(500).json({ error: 'Internal Server Error' }); }
});

router.get('/api/slot-bookings/booked', async (req, res) => {
    try {
        const { date } = req.query;
        if (!date) return res.status(400).json({ error: 'Date is required' });
        
        const bookings = await SlotBooking.find({ 
            date, 
            status: { $ne: 'Cancelled' } 
        }).select('timeSlot');
        
        res.json(bookings.map(b => b.timeSlot));
    } catch (err) { res.status(500).json({ error: 'Internal Server Error' }); }
});

router.post('/api/slot-bookings', verifyCaptcha, async (req, res) => {
    try {
        const { date, timeSlot } = req.body;
        
        // Check if already booked
        const existingBooking = await SlotBooking.findOne({ 
            date, 
            timeSlot, 
            status: { $ne: 'Cancelled' } 
        });
        
        if (existingBooking) {
            return res.status(400).json({ error: 'This time slot is already booked. Please choose another one.' });
        }
        
        const newBooking = new SlotBooking(req.body);
        res.status(201).json(await newBooking.save());
    } catch (err) { res.status(400).json({ error: err.message }); }
});

router.put('/api/slot-bookings/:id/status', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  async (req, res) => {
    try {
        const { status } = req.body;
        if (!['Booked', 'Confirmed', 'Completed', 'Cancelled'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }
        const updated = await SlotBooking.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!updated) return res.status(404).json({ error: 'Booking not found' });
        res.json(updated);
    } catch (err) { res.status(500).json({ error: 'Internal Server Error' }); }
});

router.delete('/api/slot-bookings/:id', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  async (req, res) => {
    try {
        await SlotBooking.findByIdAndDelete(req.params.id);
        res.json({ message: 'Booking deleted' });
    } catch (err) { res.status(500).json({ error: 'Internal Server Error' }); }
});

router.get('/api/slot-bookings', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  async (req, res) => {
    try {
        const bookings = await SlotBooking.find().sort({ createdAt: -1 });
        res.json(bookings);
    } catch (err) { res.status(500).json({ error: 'Internal Server Error' }); }
});

router.get('/api/slot-bookings/booked', async (req, res) => {
    try {
        const { date } = req.query;
        if (!date) return res.status(400).json({ error: 'Date is required' });
        
        const bookings = await SlotBooking.find({ 
            date, 
            status: { $ne: 'Cancelled' } 
        }).select('timeSlot');
        
        res.json(bookings.map(b => b.timeSlot));
    } catch (err) { res.status(500).json({ error: 'Internal Server Error' }); }
});

router.post('/api/slot-bookings', verifyCaptcha, async (req, res) => {
    try {
        const { date, timeSlot } = req.body;
        
        // Check if already booked
        const existingBooking = await SlotBooking.findOne({ 
            date, 
            timeSlot, 
            status: { $ne: 'Cancelled' } 
        });
        
        if (existingBooking) {
            return res.status(400).json({ error: 'This time slot is already booked. Please choose another one.' });
        }
        
        const newBooking = new SlotBooking(req.body);
        res.status(201).json(await newBooking.save());
    } catch (err) { res.status(400).json({ error: err.message }); }
});

router.put('/api/slot-bookings/:id/status', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  async (req, res) => {
    try {
        const { status } = req.body;
        if (!['Booked', 'Confirmed', 'Completed', 'Cancelled'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }
        const updated = await SlotBooking.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!updated) return res.status(404).json({ error: 'Booking not found' });
        res.json(updated);
    } catch (err) { res.status(500).json({ error: 'Internal Server Error' }); }
});

router.delete('/api/slot-bookings/:id', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  async (req, res) => {
    try {
        await SlotBooking.findByIdAndDelete(req.params.id);
        res.json({ message: 'Booking deleted' });
    } catch (err) { res.status(500).json({ error: 'Internal Server Error' }); }
});

module.exports = router;
