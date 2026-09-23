const mongoose = require("mongoose");

const serviceRecordSchema = new mongoose.Schema(
    {
        equipment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Equipment",
            required: true
        },

        reportedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        assignedEngineer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        reportedDate: {
            type: Date,
            required: true,
            default: Date.now
        },

        priority: {
            type: String,
            enum: [
                "Low",
                "Medium",
                "High",
                "Critical"
            ],
            default: "Medium"
        },

        problemTitle: {
            type: String,
            required: true,
            trim: true
        },

        errorDetails: {
            type: String,
            required: true,
            trim: true
        },

        troubleshootingPerformed: {
            type: String,
            trim: true
        },

        rootCause: {
            type: String,
            trim: true
        },

        actionTaken: {
            type: String,
            trim: true
        },

        status: {
            type: String,
            enum: [
                "Open",
                "In Progress",
                "Resolved",
                "Closed"
            ],
            default: "Open"
        },

        resolutionDate: {
            type: Date
        },

        remarks: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "ServiceRecord",
    serviceRecordSchema
);