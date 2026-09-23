const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema(
    {
        equipmentId: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: String,
            required: true,
            enum: [
                "Incubator",
                "Particle Counter",
                "Air Sampler",
                "Autoclave",
                "Stability Chamber",
                "HVAC",
                "Other"
            ]
        },

        manufacturer: {
            type: String,
            required: true,
            trim: true
        },

        model: {
            type: String,
            trim: true
        },

        serialNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        location: {
            type: String,
            required: true,
            trim: true
        },

        installationDate: {
            type: Date
        },

        status: {
            type: String,
            enum: [
                "Operational",
                "Under Maintenance",
                "Out of Service",
                "Decommissioned"
            ],
            default: "Operational"
        },

        assignedEngineer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        description: {
            type: String,
            trim: true
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Equipment", equipmentSchema);