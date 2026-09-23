const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const equipmentRoutes = require("./routes/equipmentRoutes");
const calibrationRoutes = require("./routes/calibrationRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");
const qualificationRoutes = require("./routes/qualificationRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/calibration", calibrationRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/qualification", qualificationRoutes);

// Home / Health Check
app.get("/", (req, res) => {
    res.json({
        message: "Pharma Equipment API is running"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});