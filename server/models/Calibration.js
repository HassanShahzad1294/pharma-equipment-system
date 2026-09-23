const mongoose = require("mongoose");

const calibrationSchema = new mongoose.Schema(
    {
        equipment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Equipment",
            required: true
        },

        calibrationDate: {
            type: Date,
            required: true
        },

        dueDate: {
            type: Date,
            required: true
        },

        performedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        calibrationType: {
            type: String,
            enum: [
                "Routine Calibration",
                "Initial Calibration",
                "Recalibration"
            ],
            required: true
        },

        standardReference: {
            type: String,
            trim: true
        },

        result: {
            type: String,
            enum: [
                "Passed",
                "Failed",
                "Passed with Adjustment"
            ],
            required: true
        },

        observations: {
            type: String,
            trim: true
        },

        correctiveAction: {
            type: String,
            trim: true
        },

        certificateNumber: {
            type: String,
            trim: true
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
    "Calibration",
    calibrationSchema
);