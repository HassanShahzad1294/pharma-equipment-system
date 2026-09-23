const express = require("express");

const {
    createCalibration,
    getAllCalibrations,
    getCalibrationById,
    updateCalibration,
    deleteCalibration
} = require("../controllers/calibrationController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Get all calibration records
router.get(
    "/",
    protect,
    getAllCalibrations
);

// Get single calibration record
router.get(
    "/:id",
    protect,
    getCalibrationById
);

// Create calibration record
router.post(
    "/",
    protect,
    authorizeRoles("admin", "engineer"),
    createCalibration
);

// Update calibration record
router.put(
    "/:id",
    protect,
    authorizeRoles("admin", "engineer"),
    updateCalibration
);

// Delete calibration record
router.delete(
    "/:id",
    protect,
    authorizeRoles("admin"),
    deleteCalibration
);

module.exports = router;