import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../api";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const data = await apiPost("/auth/login", {
                email,
                password
            });

            localStorage.setItem(
                "token",
                data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            navigate("/dashboard");

        } catch (error) {
            setError(
                error.message || "Unable to connect to server."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-luxury">

            <div className="login-left">

                <div className="login-decoration top"></div>
                <div className="login-decoration bottom"></div>

                <div className="login-brand">
                    <div className="brand-mark large">
                        P
                    </div>

                    <div>
                        <div className="brand-name">
                            PHARMA<span>SYS</span>
                        </div>

                        <small>
                            PHARMACEUTICAL SERVICE MANAGEMENT
                        </small>
                    </div>
                </div>

                <div className="login-copy">

                    <span className="hero-kicker">
                        ENGINEERED FOR PRECISION
                    </span>

                    <h1>
                        Pharmaceutical
                        <br />
                        <em>Equipment Intelligence.</em>
                    </h1>

                    <p>
                        A unified platform for equipment
                        management, calibration, service,
                        maintenance and qualification.
                    </p>

                </div>

                <div className="login-footer">
                    SECURE OPERATIONS · CONTROLLED ACCESS · TRACEABLE RECORDS
                </div>

            </div>

            <div className="login-right">

                <div className="login-panel">

                    <span className="section-kicker">
                        SECURE ACCESS
                    </span>

                    <h2>Welcome back.</h2>

                    <p className="login-subtitle">
                        Sign in to your operations workspace.
                    </p>

                    <form onSubmit={handleLogin}>

                        <label>Email Address</label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="you@company.com"
                            required
                        />

                        <label>Password</label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="Enter your password"
                            required
                        />

                        {error && (
                            <div className="login-error">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="luxury-submit"
                            disabled={loading}
                        >
                            {loading
                                ? "AUTHENTICATING..."
                                : "ENTER SYSTEM"}
                        </button>

                    </form>

                    <div className="secure-note">
                        <span>◉</span>
                        Protected by authenticated access
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;