const ServiceRecord = require("../models/ServiceRecord");

// Create Service Record
const createServiceRecord = async (req, res) => {
    try {
        const {
            equipment,
            reportedBy,
            assignedEngineer,
            reportedDate,
            priority,
            problemTitle,
            errorDetails,
            troubleshootingPerformed,
            rootCause,
            actionTaken,
            status,
            resolutionDate,
            remarks
        } = req.body;

        const serviceRecord = await ServiceRecord.create({
            equipment,
            reportedBy: reportedBy || req.user.id,
            assignedEngineer,
            reportedDate,
            priority,
            problemTitle,
            errorDetails,
            troubleshootingPerformed,
            rootCause,
            actionTaken,
            status,
            resolutionDate,
            remarks
        });

        res.status(201).json({
            message: "Service record created successfully",
            serviceRecord
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create service record",
            error: error.message
        });
    }
};


// Get All Service Records
const getAllServiceRecords = async (req, res) => {
    try {
        const serviceRecords = await ServiceRecord.find()
            .populate(
                "equipment",
                "equipmentId name category manufacturer model serialNumber location"
            )
            .populate(
                "reportedBy",
                "name email role"
            )
            .populate(
                "assignedEngineer",
                "name email role"
            )
            .sort({ createdAt: -1 });

        res.json({
            count: serviceRecords.length,
            serviceRecords
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch service records",
            error: error.message
        });
    }
};


// Get Single Service Record
const getServiceRecordById = async (req, res) => {
    try {
        const serviceRecord = await ServiceRecord.findById(
            req.params.id
        )
            .populate(
                "equipment",
                "equipmentId name category manufacturer model serialNumber location"
            )
            .populate(
                "reportedBy",
                "name email role"
            )
            .populate(
                "assignedEngineer",
                "name email role"
            );

        if (!serviceRecord) {
            return res.status(404).json({
                message: "Service record not found"
            });
        }

        res.json(serviceRecord);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch service record",
            error: error.message
        });
    }
};


// Update Service Record
const updateServiceRecord = async (req, res) => {
    try {
        const serviceRecord = await ServiceRecord.findById(
            req.params.id
        );

        if (!serviceRecord) {
            return res.status(404).json({
                message: "Service record not found"
            });
        }

        const updatedServiceRecord =
            await ServiceRecord.findByIdAndUpdate(
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
                    "reportedBy",
                    "name email role"
                )
                .populate(
                    "assignedEngineer",
                    "name email role"
                );

        res.json({
            message: "Service record updated successfully",
            serviceRecord: updatedServiceRecord
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update service record",
            error: error.message
        });
    }
};


// Delete Service Record
const deleteServiceRecord = async (req, res) => {
    try {
        const serviceRecord = await ServiceRecord.findById(
            req.params.id
        );

        if (!serviceRecord) {
            return res.status(404).json({
                message: "Service record not found"
            });
        }

        await serviceRecord.deleteOne();

        res.json({
            message: "Service record deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete service record",
            error: error.message
        });
    }
};


module.exports = {
    createServiceRecord,
    getAllServiceRecords,
    getServiceRecordById,
    updateServiceRecord,
    deleteServiceRecord
};