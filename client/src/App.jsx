import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppShell from "./components/AppShell";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Equipment from "./pages/Equipment";
import Calibration from "./pages/Calibration";
import Service from "./pages/Service";
import Maintenance from "./pages/Maintenance";
import Qualification from "./pages/Qualification";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route element={<AppShell />}>

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/equipment"
                        element={<Equipment />}
                    />

                    <Route
                        path="/calibration"
                        element={<Calibration />}
                    />

                    <Route
                        path="/service"
                        element={<Service />}
                    />

                    <Route
                        path="/maintenance"
                        element={<Maintenance />}
                    />

                    <Route
                        path="/qualification"
                        element={<Qualification />}
                    />

                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;