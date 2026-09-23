import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGet } from "../api";

function Dashboard() {
    const navigate = useNavigate();

    const [stats, setStats] = useState({
        equipment: 0,
        calibration: 0,
        service: 0,
        maintenance: 0,
        qualification: 0
    });

    const [loading, setLoading] = useState(true);

    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    useEffect(() => {
        const loadStats = async () => {
            try {
                const [
                    equipment,
                    calibration,
                    service,
                    maintenance,
                    qualification
                ] = await Promise.all([
                    apiGet("/equipment"),
                    apiGet("/calibration"),
                    apiGet("/service"),
                    apiGet("/maintenance"),
                    apiGet("/qualification")
                ]);

                setStats({
                    equipment: equipment.count || 0,
                    calibration: calibration.count || 0,
                    service: service.count || 0,
                    maintenance: maintenance.count || 0,
                    qualification: qualification.count || 0
                });

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadStats();
    }, []);

    const cards = [
        {
            label: "Equipment",
            value: stats.equipment,
            note: "Registered assets",
            path: "/equipment",
            icon: "◈"
        },
        {
            label: "Calibration",
            value: stats.calibration,
            note: "Calibration records",
            path: "/calibration",
            icon: "◎"
        },
        {
            label: "Service",
            value: stats.service,
            note: "Service cases",
            path: "/service",
            icon: "◇"
        },
        {
            label: "Maintenance",
            value: stats.maintenance,
            note: "Maintenance records",
            path: "/maintenance",
            icon: "◌"
        }
    ];

    return (
        <div>

            <section className="hero-luxury">

                <div>
                    <span className="hero-kicker">
                        PHARMACEUTICAL EQUIPMENT CONTROL
                    </span>

                    <h2>
                        Precision, Compliance
                        <br />
                        <em>& Service in One Place.</em>
                    </h2>

                    <p>
                        Monitor equipment, maintenance,
                        calibration, service and qualification
                        activities from a unified workspace.
                    </p>
                </div>

                <div className="hero-seal">
                    <span>PS</span>
                    <small>QUALITY<br />SYSTEM</small>
                </div>

            </section>

            <section className="section-header">

                <div>
                    <span className="section-kicker">
                        LIVE OVERVIEW
                    </span>

                    <h3>Operational Snapshot</h3>
                </div>

                <span className="live-badge">
                    <i></i>
                    LIVE
                </span>

            </section>

            <section className="stats-luxury">

                {cards.map((card) => (
                    <div
                        className="stat-luxury"
                        key={card.label}
                        onClick={() =>
                            navigate(card.path)
                        }
                    >
                        <div className="stat-top">
                            <span>{card.label}</span>
                            <b>{card.icon}</b>
                        </div>

                        <strong>
                            {loading ? "—" : card.value}
                        </strong>

                        <small>{card.note}</small>
                    </div>
                ))}

            </section>

            <section className="section-header">

                <div>
                    <span className="section-kicker">
                        MANAGEMENT
                    </span>

                    <h3>Core Operations</h3>
                </div>

            </section>

            <section className="operation-grid">

                <button
                    onClick={() => navigate("/equipment")}
                    className="operation-card"
                >
                    <span className="operation-number">
                        01
                    </span>

                    <div className="operation-icon">
                        ◈
                    </div>

                    <h4>Equipment Registry</h4>

                    <p>
                        Manage equipment identity,
                        location, category and operational status.
                    </p>

                    <span className="operation-link">
                        Enter Registry →
                    </span>
                </button>

                <button
                    onClick={() => navigate("/calibration")}
                    className="operation-card"
                >
                    <span className="operation-number">
                        02
                    </span>

                    <div className="operation-icon">
                        ◎
                    </div>

                    <h4>Calibration Control</h4>

                    <p>
                        Track calibration history,
                        results, certificates and due dates.
                    </p>

                    <span className="operation-link">
                        Open Control →
                    </span>
                </button>

                <button
                    onClick={() => navigate("/service")}
                    className="operation-card"
                >
                    <span className="operation-number">
                        03
                    </span>

                    <div className="operation-icon">
                        ◇
                    </div>

                    <h4>Service & Troubleshooting</h4>

                    <p>
                        Record technical problems,
                        troubleshooting and corrective actions.
                    </p>

                    <span className="operation-link">
                        View Services →
                    </span>
                </button>

                <button
                    onClick={() => navigate("/maintenance")}
                    className="operation-card"
                >
                    <span className="operation-number">
                        04
                    </span>

                    <div className="operation-icon">
                        ◌
                    </div>

                    <h4>Maintenance Control</h4>

                    <p>
                        Manage preventive, corrective
                        and scheduled maintenance.
                    </p>

                    <span className="operation-link">
                        Open Maintenance →
                    </span>
                </button>

                <button
                    onClick={() => navigate("/qualification")}
                    className="operation-card"
                >
                    <span className="operation-number">
                        05
                    </span>

                    <div className="operation-icon">
                        ✓
                    </div>

                    <h4>IQ / OQ / PQ</h4>

                    <p>
                        Control qualification protocols,
                        results, deviations and approvals.
                    </p>

                    <span className="operation-link">
                        Open Qualification →
                    </span>
                </button>

            </section>

        </div>
    );
}

export default Dashboard;