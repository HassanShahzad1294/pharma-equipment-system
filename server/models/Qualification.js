const mongoose = require("mongoose");

const qualificationSchema = new mongoose.Schema(
    {
        equipment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Equipment",
            required: true
        },

        qualificationType: {
            type: String,
            enum: ["IQ", "OQ", "PQ"],
            required: true
        },

        protocolNumber: {
            type: String,
            required: true,
            trim: true
        },

        executionDate: {
            type: Date,
            required: true
        },

        performedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        result: {
            type: String,
            enum: [
                "Passed",
                "Failed",
                "Passed with Deviations"
            ],
            required: true
        },

        observations: {
            type: String,
            trim: true
        },

        deviations: {
            type: String,
            trim: true
        },

        correctiveAction: {
            type: String,
            trim: true
        },

        status: {
            type: String,
            enum: [
                "Draft",
                "In Progress",
                "Completed",
                "Approved"
            ],
            default: "Draft"
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
    "Qualification",
    qualificationSchema
);