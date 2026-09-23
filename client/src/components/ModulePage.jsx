import { useEffect, useMemo, useState } from "react";

function ModulePage({
    eyebrow,
    title,
    description,
    columns,
    loadData
}) {
    const [data, setData] = useState([]);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const load = async () => {
            try {
                const result = await loadData();
                setData(result || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [loadData]);

    const filtered = useMemo(() => {
        return data.filter((item) =>
            JSON.stringify(item)
                .toLowerCase()
                .includes(query.toLowerCase())
        );
    }, [data, query]);

    return (
        <div>

            <section className="page-intro">

                <div>
                    <span className="section-kicker">
                        {eyebrow}
                    </span>

                    <h2>{title}</h2>

                    <p>{description}</p>
                </div>

                <div className="record-count">
                    <strong>{data.length}</strong>
                    <span>Records</span>
                </div>

            </section>

            <section className="luxury-table-card">

                <div className="table-toolbar">

                    <div>
                        <span className="table-kicker">
                            RECORDS
                        </span>

                        <h3>Operational Register</h3>
                    </div>

                    <input
                        className="table-search"
                        placeholder="Search records..."
                        value={query}
                        onChange={(e) =>
                            setQuery(e.target.value)
                        }
                    />

                </div>

                {loading && (
                    <div className="table-state">
                        Loading records...
                    </div>
                )}

                {error && (
                    <div className="table-state error">
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    <div className="table-scroll">

                        <table className="luxury-table">

                            <thead>
                                <tr>
                                    {columns.map((column) => (
                                        <th key={column.label}>
                                            {column.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>

                                {filtered.map((item, index) => (
                                    <tr key={item._id || index}>

                                        {columns.map((column) => (
                                            <td key={column.label}>
                                                {column.render
                                                    ? column.render(item)
                                                    : item[column.key] ?? "—"}
                                            </td>
                                        ))}

                                    </tr>
                                ))}

                            </tbody>

                        </table>

                        {filtered.length === 0 && (
                            <div className="table-state">
                                No matching records found.
                            </div>
                        )}

                    </div>
                )}

            </section>

        </div>
    );
}

export default ModulePage;