const express = require("express");
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get(
    "/protected",
    protect,
    authorizeRoles("admin", "engineer"),
    (req, res) => {
        res.json({
            message: "Protected route accessed successfully",
            user: req.user
        });
    }
);

module.exports = router;