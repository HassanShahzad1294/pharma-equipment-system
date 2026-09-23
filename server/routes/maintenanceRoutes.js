const express = require("express");

const {
    createMaintenance,
    getAllMaintenance,
    getMaintenanceById,
    updateMaintenance,
    deleteMaintenance
} = require("../controllers/maintenanceController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Get all maintenance records
router.get(
    "/",
    protect,
    getAllMaintenance
);

// Get single maintenance record
router.get(
    "/:id",
    protect,
    getMaintenanceById
);

// Create maintenance record
router.post(
    "/",
    protect,
    authorizeRoles("admin", "engineer"),
    createMaintenance
);

// Update maintenance record
router.put(
    "/:id",
    protect,
    authorizeRoles("admin", "engineer"),
    updateMaintenance
);

// Delete maintenance record
router.delete(
    "/:id",
    protect,
    authorizeRoles("admin"),
    deleteMaintenance
);

module.exports = router;