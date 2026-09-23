import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

function AppShell() {
    const navigate = useNavigate();
    const location = useLocation();

    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    const menuItems = [
        { title: "Dashboard", path: "/dashboard", icon: "⌂" },
        { title: "Equipment", path: "/equipment", icon: "◈" },
        { title: "Calibration", path: "/calibration", icon: "◎" },
        { title: "Service", path: "/service", icon: "◇" },
        { title: "Maintenance", path: "/maintenance", icon: "◌" },
        { title: "IQ / OQ / PQ", path: "/qualification", icon: "✓" }
    ];

    const currentPage =
        menuItems.find((item) => item.path === location.pathname)
        ?.title || "Dashboard";

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <div className="luxury-app">

            <aside className="luxury-sidebar">

                <div className="luxury-brand">
                    <div className="brand-mark">P</div>

                    <div>
                        <div className="brand-name">
                            PHARMA<span>SYS</span>
                        </div>

                        <div className="brand-caption">
                            SERVICE MANAGEMENT
                        </div>
                    </div>
                </div>

                <div className="nav-label">
                    WORKSPACE
                </div>

                <nav className="luxury-nav">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                isActive
                                    ? "luxury-nav-item active"
                                    : "luxury-nav-item"
                            }
                        >
                            <span className="nav-symbol">
                                {item.icon}
                            </span>

                            <span>{item.title}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="sidebar-bottom">

                    <div className="system-status">
                        <span className="status-dot"></span>

                        <div>
                            <strong>System Online</strong>
                            <small>API Connected</small>
                        </div>
                    </div>

                    <button
                        className="logout-button"
                        onClick={logout}
                    >
                        <span>↪</span>
                        Logout
                    </button>

                </div>

            </aside>

            <main className="luxury-content">

                <header className="luxury-topbar">

                    <div>
                        <span className="topbar-eyebrow">
                            PHARMACEUTICAL OPERATIONS
                        </span>

                        <h1>{currentPage}</h1>
                    </div>

                    <div className="topbar-user">

                        <div className="topbar-avatar">
                            {(user.name || "U")
                                .charAt(0)
                                .toUpperCase()}
                        </div>

                        <div className="topbar-user-info">
                            <strong>
                                {user.name || "User"}
                            </strong>

                            <span>
                                {user.role || "viewer"}
                            </span>
                        </div>

                    </div>

                </header>

                <div className="luxury-page">
                    <Outlet />
                </div>

            </main>

        </div>
    );
}

export default AppShell;