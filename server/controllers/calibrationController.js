const Calibration = require("../models/Calibration");

// Create Calibration Record
const createCalibration = async (req, res) => {
    try {
        const {
            equipment,
            calibrationDate,
            dueDate,
            performedBy,
            calibrationType,
            standardReference,
            result,
            observations,
            correctiveAction,
            certificateNumber,
            remarks
        } = req.body;

        const calibration = await Calibration.create({
            equipment,
            calibrationDate,
            dueDate,
            performedBy: performedBy || req.user.id,
            calibrationType,
            standardReference,
            result,
            observations,
            correctiveAction,
            certificateNumber,
            remarks
        });

        res.status(201).json({
            message: "Calibration record created successfully",
            calibration
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create calibration record",
            error: error.message
        });
    }
};


// Get All Calibration Records
const getAllCalibrations = async (req, res) => {
    try {
        const calibrations = await Calibration.find()
            .populate(
                "equipment",
                "equipmentId name category manufacturer model serialNumber"
            )
            .populate(
                "performedBy",
                "name email role"
            )
            .sort({ calibrationDate: -1 });

        res.json({
            count: calibrations.length,
            calibrations
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch calibration records",
            error: error.message
        });
    }
};


// Get Single Calibration Record
const getCalibrationById = async (req, res) => {
    try {
        const calibration = await Calibration.findById(
            req.params.id
        )
            .populate(
                "equipment",
                "equipmentId name category manufacturer model serialNumber"
            )
            .populate(
                "performedBy",
                "name email role"
            );

        if (!calibration) {
            return res.status(404).json({
                message: "Calibration record not found"
            });
        }

        res.json(calibration);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch calibration record",
            error: error.message
        });
    }
};


// Update Calibration Record
const updateCalibration = async (req, res) => {
    try {
        const calibration = await Calibration.findById(
            req.params.id
        );

        if (!calibration) {
            return res.status(404).json({
                message: "Calibration record not found"
            });
        }

        const updatedCalibration =
            await Calibration.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            )
                .populate(
                    "equipment",
                    "equipmentId name category manufacturer model serialNumber"
                )
                .populate(
                    "performedBy",
                    "name email role"
                );

        res.json({
            message: "Calibration record updated successfully",
            calibration: updatedCalibration
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update calibration record",
            error: error.message
        });
    }
};


// Delete Calibration Record
const deleteCalibration = async (req, res) => {
    try {
        const calibration = await Calibration.findById(
            req.params.id
        );

        if (!calibration) {
            return res.status(404).json({
                message: "Calibration record not found"
            });
        }

        await calibration.deleteOne();

        res.json({
            message: "Calibration record deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete calibration record",
            error: error.message
        });
    }
};


module.exports = {
    createCalibration,
    getAllCalibrations,
    getCalibrationById,
    updateCalibration,
    deleteCalibration
};