const Qualification = require("../models/Qualification");

// Create Qualification
const createQualification = async (req, res) => {
    try {
        const {
            equipment,
            qualificationType,
            protocolNumber,
            executionDate,
            performedBy,
            result,
            observations,
            deviations,
            correctiveAction,
            status,
            remarks
        } = req.body;

        const qualification = await Qualification.create({
            equipment,
            qualificationType,
            protocolNumber,
            executionDate,
            performedBy: performedBy || req.user.id,
            result,
            observations,
            deviations,
            correctiveAction,
            status,
            remarks
        });

        res.status(201).json({
            message: "Qualification record created successfully",
            qualification
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create qualification record",
            error: error.message
        });
    }
};

// Get All
const getAllQualifications = async (req, res) => {
    try {
        const qualifications = await Qualification.find()
            .populate(
                "equipment",
                "equipmentId name category manufacturer model serialNumber location"
            )
            .populate(
                "performedBy",
                "name email role"
            )
            .sort({ executionDate: -1 });

        res.json({
            count: qualifications.length,
            qualifications
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch qualification records",
            error: error.message
        });
    }
};

// Get Single
const getQualificationById = async (req, res) => {
    try {
        const qualification = await Qualification.findById(
            req.params.id
        )
            .populate(
                "equipment",
                "equipmentId name category manufacturer model serialNumber location"
            )
            .populate(
                "performedBy",
                "name email role"
            );

        if (!qualification) {
            return res.status(404).json({
                message: "Qualification record not found"
            });
        }

        res.json(qualification);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch qualification record",
            error: error.message
        });
    }
};

// Update
const updateQualification = async (req, res) => {
    try {
        const qualification =
            await Qualification.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            )
            .populate(
                "equipment",
                "equipmentId name category manufacturer model serialNumber location"
            )
            .populate(
                "performedBy",
                "name email role"
            );

        if (!qualification) {
            return res.status(404).json({
                message: "Qualification record not found"
            });
        }

        res.json({
            message: "Qualification record updated successfully",
            qualification
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update qualification record",
            error: error.message
        });
    }
};

// Delete
const deleteQualification = async (req, res) => {
    try {
        const qualification =
            await Qualification.findByIdAndDelete(req.params.id);

        if (!qualification) {
            return res.status(404).json({
                message: "Qualification record not found"
            });
        }

        res.json({
            message: "Qualification record deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete qualification record",
            error: error.message
        });
    }
};

module.exports = {
    createQualification,
    getAllQualifications,
    getQualificationById,
    updateQualification,
    deleteQualification
};