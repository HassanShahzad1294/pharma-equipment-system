const express = require("express");

const {
    createEquipment,
    getAllEquipment,
    getEquipmentById,
    updateEquipment,
    deleteEquipment
} = require("../controllers/equipmentController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();


// Get all equipment
router.get(
    "/",
    protect,
    getAllEquipment
);


// Get single equipment
router.get(
    "/:id",
    protect,
    getEquipmentById
);


// Create equipment
router.post(
    "/",
    protect,
    authorizeRoles("admin", "engineer"),
    createEquipment
);


// Update equipment
router.put(
    "/:id",
    protect,
    authorizeRoles("admin", "engineer"),
    updateEquipment
);


// Delete equipment
router.delete(
    "/:id",
    protect,
    authorizeRoles("admin"),
    deleteEquipment
);


module.exports = router;