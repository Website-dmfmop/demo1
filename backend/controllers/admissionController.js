const Admission = require('../models/Admission');
const CompetitiveExamAdmission = require('../models/CompetitiveExamAdmission');
const Joinee = require('../models/Joinee');

// --- Admissions ---
exports.getAdmissions = async (req, res) => {
    try {
        const admissions = await Admission.find().sort({ createdAt: -1 });
        res.json(admissions);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.createAdmission = async (req, res) => {
    try {
        const newAdmission = new Admission(req.body);
        const savedAdmission = await newAdmission.save();
        res.status(201).json(savedAdmission);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateAdmissionStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (!['Pending', 'Under Review', 'Approved', 'Rejected'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }
        const updatedAdmission = await Admission.findByIdAndUpdate(
            req.params.id, 
            { status }, 
            { returnDocument: 'after' }
        );
        if (!updatedAdmission) return res.status(404).json({ error: 'Admission not found' });
        res.json(updatedAdmission);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteAdmission = async (req, res) => {
    try {
        const deletedAdmission = await Admission.findByIdAndDelete(req.params.id);
        if (!deletedAdmission) return res.status(404).json({ error: 'Admission not found' });
        res.json({ message: 'Admission deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// --- Competitive Exam Admissions ---
exports.getCompetitiveExamAdmissions = async (req, res) => {
    try {
        const admissions = await CompetitiveExamAdmission.find().sort({ createdAt: -1 });
        res.json(admissions);
    } catch (err) { res.status(500).json({ error: 'Internal Server Error' }); }
};

exports.createCompetitiveExamAdmission = async (req, res) => {
    try {
        const newAdmission = new CompetitiveExamAdmission(req.body);
        res.status(201).json(await newAdmission.save());
    } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.updateCompetitiveExamAdmissionStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (!['Pending', 'Under Review', 'Approved', 'Rejected'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }
        const updated = await CompetitiveExamAdmission.findByIdAndUpdate(req.params.id, { status }, { returnDocument: 'after' });
        res.json(updated);
    } catch (err) { res.status(500).json({ error: 'Internal Server Error' }); }
};

exports.deleteCompetitiveExamAdmission = async (req, res) => {
    try {
        await CompetitiveExamAdmission.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted successfully' });
    } catch (err) { res.status(500).json({ error: 'Internal Server Error' }); }
};


// --- Joinees ---
exports.getJoinees = async (req, res) => {
    try {
        const joinees = await Joinee.find().sort({ createdAt: -1 });
        res.json(joinees);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.createJoinee = async (req, res) => {
    try {
        const newJoinee = new Joinee(req.body);
        const savedJoinee = await newJoinee.save();
        res.status(201).json(savedJoinee);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateJoineeStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (!['Pending', 'Contacted', 'Approved', 'Rejected'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }
        const updatedJoinee = await Joinee.findByIdAndUpdate(
            req.params.id, 
            { status }, 
            { returnDocument: 'after' }
        );
        if (!updatedJoinee) return res.status(404).json({ error: 'Joinee not found' });
        res.json(updatedJoinee);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteJoinee = async (req, res) => {
    try {
        const deletedJoinee = await Joinee.findByIdAndDelete(req.params.id);
        if (!deletedJoinee) return res.status(404).json({ error: 'Joinee not found' });
        res.json({ message: 'Joinee deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
