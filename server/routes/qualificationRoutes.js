const express = require("express");

const {
    createQualification,
    getAllQualifications,
    getQualificationById,
    updateQualification,
    deleteQualification
} = require("../controllers/qualificationController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", protect, getAllQualifications);

router.get("/:id", protect, getQualificationById);

router.post(
    "/",
    protect,
    authorizeRoles("admin", "engineer"),
    createQualification
);

router.put(
    "/:id",
    protect,
    authorizeRoles("admin", "engineer"),
    updateQualification
);

router.delete(
    "/:id",
    protect,
    authorizeRoles("admin"),
    deleteQualification
);

module.exports = router;