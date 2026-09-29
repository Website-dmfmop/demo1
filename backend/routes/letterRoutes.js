const express = require('express');
const router = express.Router();
const LetterRegistry = require('../models/LetterRegistry');
const { verifyToken, restrictTo } = require('../middleware/auth');

// Get all letters
router.get('/', verifyToken, async (req, res) => {
    try {
        let filter = {};
        
        // If the user is a BRANCH_OFFICE, restrict to their own records
        if (req.user.role === 'BRANCH_OFFICE') {
            filter.issuedBy = req.user.id || req.user._id;
        }

        const letters = await LetterRegistry.find(filter)
            .populate('issuedBy', 'name loginId role')
            .sort({ dateOfIssue: -1 });
        res.json(letters);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch letter records' });
    }
});

// Add a new letter
router.post('/', verifyToken, async (req, res) => {
    try {
        const newLetter = new LetterRegistry({
            ...req.body,
            issuedBy: req.user.id || req.user._id
        });
        await newLetter.save();
        
        const populatedLetter = await LetterRegistry.findById(newLetter._id).populate('issuedBy', 'name loginId role');
        res.status(201).json(populatedLetter);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ error: 'Reference Number already exists. Please use a unique one.' });
        }
        res.status(500).json({ error: 'Failed to create letter record' });
    }
});

// Update a letter
router.put('/:id', verifyToken, async (req, res) => {
    try {
        // Find first to check permissions if needed
        const letter = await LetterRegistry.findById(req.params.id);
        if (!letter) {
            return res.status(404).json({ error: 'Letter not found' });
        }
        
        // Super admin can edit any, otherwise only the issuer can edit
        const isSuperAdmin = req.user.role === 'SUPER_ADMIN' || req.user.isSuperDelegate;
        const isIssuer = letter.issuedBy.toString() === (req.user.id || req.user._id).toString();
        
        if (!isSuperAdmin && !isIssuer) {
            return res.status(403).json({ error: 'You are not authorized to edit this record.' });
        }

        const updatedLetter = await LetterRegistry.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            { new: true, runValidators: true }
        ).populate('issuedBy', 'name loginId role');
        
        res.json(updatedLetter);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ error: 'Reference Number already exists.' });
        }
        res.status(500).json({ error: 'Failed to update letter record' });
    }
});

// Delete a letter
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const letter = await LetterRegistry.findById(req.params.id);
        if (!letter) {
            return res.status(404).json({ error: 'Letter not found' });
        }

        const isSuperAdmin = req.user.role === 'SUPER_ADMIN' || req.user.isSuperDelegate;
        const isIssuer = letter.issuedBy.toString() === (req.user.id || req.user._id).toString();
        
        if (!isSuperAdmin && !isIssuer) {
            return res.status(403).json({ error: 'You are not authorized to delete this record.' });
        }

        await LetterRegistry.findByIdAndDelete(req.params.id);
        res.json({ message: 'Letter record deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete letter record' });
    }
});

module.exports = router;
