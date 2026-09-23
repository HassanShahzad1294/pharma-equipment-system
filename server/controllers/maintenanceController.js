const Maintenance = require("../models/Maintenance");

// Create Maintenance Record
const createMaintenance = async (req, res) => {
    try {
        const {
            equipment,
            performedBy,
            maintenanceType,
            maintenanceDate,
            nextDueDate,
            issue,
            workPerformed,
            partsReplaced,
            status,
            remarks
        } = req.body;

        const maintenance = await Maintenance.create({
            equipment,
            performedBy: performedBy || req.user.id,
            maintenanceType,
            maintenanceDate,
            nextDueDate,
            issue,
            workPerformed,
            partsReplaced,
            status,
            remarks
        });

        res.status(201).json({
            message: "Maintenance record created successfully",
            maintenance
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create maintenance record",
            error: error.message
        });
    }
};


// Get All Maintenance Records
const getAllMaintenance = async (req, res) => {
    try {
        const maintenance = await Maintenance.find()
            .populate(
                "equipment",
                "equipmentId name category manufacturer model serialNumber location"
            )
            .populate(
                "performedBy",
                "name email role"
            )
            .sort({ maintenanceDate: -1 });

        res.json({
            count: maintenance.length,
            maintenance
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch maintenance records",
            error: error.message
        });
    }
};


// Get Single Maintenance Record
const getMaintenanceById = async (req, res) => {
    try {
        const maintenance = await Maintenance.findById(
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

        if (!maintenance) {
            return res.status(404).json({
                message: "Maintenance record not found"
            });
        }

        res.json(maintenance);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch maintenance record",
            error: error.message
        });
    }
};


// Update Maintenance Record
const updateMaintenance = async (req, res) => {
    try {
        const maintenance = await Maintenance.findById(
            req.params.id
        );

        if (!maintenance) {
            return res.status(404).json({
                message: "Maintenance record not found"
            });
        }

        const updatedMaintenance =
            await Maintenance.findByIdAndUpdate(
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

        res.json({
            message: "Maintenance record updated successfully",
            maintenance: updatedMaintenance
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update maintenance record",
            error: error.message
        });
    }
};


// Delete Maintenance Record
const deleteMaintenance = async (req, res) => {
    try {
        const maintenance = await Maintenance.findById(
            req.params.id
        );

        if (!maintenance) {
            return res.status(404).json({
                message: "Maintenance record not found"
            });
        }

        await maintenance.deleteOne();

        res.json({
            message: "Maintenance record deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete maintenance record",
            error: error.message
        });
    }
};


module.exports = {
    createMaintenance,
    getAllMaintenance,
    getMaintenanceById,
    updateMaintenance,
    deleteMaintenance
};