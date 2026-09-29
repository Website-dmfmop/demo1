const mongoose = require('mongoose');

const letterRegistrySchema = new mongoose.Schema({
    referenceNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    dateOfIssue: {
        type: Date,
        required: true,
        default: Date.now
    },
    recipientName: {
        type: String,
        required: true,
        trim: true
    },
    recipientOrganization: {
        type: String,
        trim: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    letterType: {
        type: String,
        enum: [
            'Offer Letter',
            'Warning Letter',
            'Partnership Proposal',
            'No Objection Certificate (NOC)',
            'Recommendation',
            'Experience Letter',
            'General Correspondence',
            'Other'
        ],
        required: true
    },
    status: {
        type: String,
        enum: ['Draft', 'Dispatched', 'Delivered', 'Acknowledged', 'Cancelled'],
        default: 'Dispatched'
    },
    issuedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    attachmentUrl: {
        type: String,
        trim: true
    },
    remarks: {
        type: String,
        trim: true
    }
}, { timestamps: true });

// Indexing for faster search
letterRegistrySchema.index({ dateOfIssue: -1 });

module.exports = mongoose.model('LetterRegistry', letterRegistrySchema);
