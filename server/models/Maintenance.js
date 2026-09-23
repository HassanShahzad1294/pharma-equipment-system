const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema(
    {
        equipment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Equipment",
            required: true
        },

        performedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        maintenanceType: {
            type: String,
            enum: [
                "Preventive Maintenance",
                "Corrective Maintenance",
                "Scheduled Maintenance"
            ],
            required: true
        },

        maintenanceDate: {
            type: Date,
            required: true
        },

        nextDueDate: {
            type: Date
        },

        issue: {
            type: String,
            trim: true
        },

        workPerformed: {
            type: String,
            required: true,
            trim: true
        },

        partsReplaced: {
            type: String,
            trim: true
        },

        status: {
            type: String,
            enum: [
                "Scheduled",
                "In Progress",
                "Completed"
            ],
            default: "Scheduled"
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
    "Maintenance",
    maintenanceSchema
);