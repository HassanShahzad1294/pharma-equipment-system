const Equipment = require("../models/Equipment");

// Create Equipment
const createEquipment = async (req, res) => {
    try {
        const {
            equipmentId,
            name,
            category,
            manufacturer,
            model,
            serialNumber,
            location,
            installationDate,
            status,
            assignedEngineer,
            description
        } = req.body;

        const existingEquipment = await Equipment.findOne({
            $or: [
                { equipmentId },
                { serialNumber }
            ]
        });

        if (existingEquipment) {
            return res.status(400).json({
                message: "Equipment ID or Serial Number already exists"
            });
        }

        const equipment = await Equipment.create({
            equipmentId,
            name,
            category,
            manufacturer,
            model,
            serialNumber,
            location,
            installationDate,
            status,
            assignedEngineer,
            description,
            createdBy: req.user.id
        });

        res.status(201).json({
            message: "Equipment created successfully",
            equipment
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create equipment",
            error: error.message
        });
    }
};


// Get All Equipment
const getAllEquipment = async (req, res) => {
    try {
        const equipment = await Equipment.find()
            .populate("assignedEngineer", "name email role")
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 });

        res.json({
            count: equipment.length,
            equipment
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch equipment",
            error: error.message
        });
    }
};


// Get Single Equipment
const getEquipmentById = async (req, res) => {
    try {
        const equipment = await Equipment.findById(req.params.id)
            .populate("assignedEngineer", "name email role")
            .populate("createdBy", "name email");

        if (!equipment) {
            return res.status(404).json({
                message: "Equipment not found"
            });
        }

        res.json(equipment);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch equipment",
            error: error.message
        });
    }
};


// Update Equipment
const updateEquipment = async (req, res) => {
    try {
        // Debug: check what data is coming from Postman
        console.log("UPDATE BODY:", req.body);

        const equipment = await Equipment.findById(
            req.params.id
        );

        if (!equipment) {
            return res.status(404).json({
                message: "Equipment not found"
            });
        }

        const updatedEquipment = await Equipment.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )
            .populate("assignedEngineer", "name email role")
            .populate("createdBy", "name email");

        res.json({
            message: "Equipment updated successfully",
            equipment: updatedEquipment
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update equipment",
            error: error.message
        });
    }
};


// Delete Equipment
const deleteEquipment = async (req, res) => {
    try {
        const equipment = await Equipment.findById(
            req.params.id
        );

        if (!equipment) {
            return res.status(404).json({
                message: "Equipment not found"
            });
        }

        await equipment.deleteOne();

        res.json({
            message: "Equipment deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete equipment",
            error: error.message
        });
    }
};


module.exports = {
    createEquipment,
    getAllEquipment,
    getEquipmentById,
    updateEquipment,
    deleteEquipment
};