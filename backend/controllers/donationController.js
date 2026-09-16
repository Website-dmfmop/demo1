const Donation = require('../models/Donation');

exports.getDonations = async (req, res) => {
    try {
        const donations = await Donation.find().sort({ createdAt: -1 });
        res.json(donations);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.createDonation = async (req, res) => {
    try {
        const newDonation = new Donation(req.body);
        const savedDonation = await newDonation.save();
        res.status(201).json(savedDonation);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteDonation = async (req, res) => {
    try {
        const deletedDonation = await Donation.findByIdAndDelete(req.params.id);
        if (!deletedDonation) return res.status(404).json({ error: 'Donation not found' });
        res.json({ message: 'Donation deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
