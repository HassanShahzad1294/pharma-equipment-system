const express = require("express");

const {
    createServiceRecord,
    getAllServiceRecords,
    getServiceRecordById,
    updateServiceRecord,
    deleteServiceRecord
} = require("../controllers/serviceController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Get all service records
router.get(
    "/",
    protect,
    getAllServiceRecords
);

// Get single service record
router.get(
    "/:id",
    protect,
    getServiceRecordById
);

// Create service record
router.post(
    "/",
    protect,
    authorizeRoles("admin", "engineer"),
    createServiceRecord
);

// Update service record
router.put(
    "/:id",
    protect,
    authorizeRoles("admin", "engineer"),
    updateServiceRecord
);

// Delete service record
router.delete(
    "/:id",
    protect,
    authorizeRoles("admin"),
    deleteServiceRecord
);

module.exports = router;