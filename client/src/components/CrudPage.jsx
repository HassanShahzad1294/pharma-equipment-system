import {
    useCallback,
    useEffect,
    useMemo,
    useState
} from "react";

import {
    apiGet,
    apiPost,
    apiPut,
    apiDelete
} from "../api";

function formatDate(value) {
    if (!value) {
        return "—";
    }

    return new Date(value).toLocaleDateString(
        "en-GB"
    );
}

function inputDate(value) {
    if (!value) {
        return "";
    }

    return new Date(value)
        .toISOString()
        .slice(0, 10);
}

function normalizeValue(field, value) {
    if (value === null || value === undefined) {
        return "";
    }

    if (field.type === "date") {
        return inputDate(value);
    }

    if (
        typeof value === "object" &&
        value._id
    ) {
        return value._id;
    }

    return value;
}

function CrudPage({
    eyebrow,
    title,
    description,
    endpoint,
    responseKey,
    fields,
    columns,
    createTitle = "Add Record"
}) {
    const [records, setRecords] = useState([]);
    const [lookups, setLookups] = useState({});
    const [loading, setLoading] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({});
    const [search, setSearch] = useState("");

    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    const canWrite =
        user.role === "admin" ||
        user.role === "engineer";

    const canDelete =
        user.role === "admin";

    const emptyForm = useMemo(() => {
        return Object.fromEntries(
            fields.map((field) => [
                field.key,
                field.defaultValue ?? ""
            ])
        );
    }, [fields]);

    const loadRecords = useCallback(
        async () => {
            try {
                setLoading(true);

                const data =
                    await apiGet(endpoint);

                setRecords(
                    data[responseKey] || []
                );

                setError("");

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        },
        [endpoint, responseKey]
    );

    useEffect(() => {
        loadRecords();
    }, [loadRecords]);

    useEffect(() => {
        const sources = fields
            .filter(
                (field) =>
                    field.optionsFrom
            )
            .map(
                (field) =>
                    field.optionsFrom
            );

        const uniqueSources = [
            ...new Set(
                sources.map(
                    (source) =>
                        source.endpoint
                )
            )
        ];

        if (!uniqueSources.length) {
            return;
        }

        const loadLookups = async () => {
            const result = {};

            for (
                const sourceEndpoint
                of uniqueSources
            ) {
                try {
                    const data =
                        await apiGet(
                            sourceEndpoint
                        );

                    const source = sources.find(
                        (item) =>
                            item.endpoint ===
                            sourceEndpoint
                    );

                    result[
                        source.key
                    ] =
                        data[
                            source.responseKey
                        ] || [];
                } catch (err) {
                    console.error(
                        err
                    );
                }
            }

            setLookups(result);
        };

        loadLookups();
    }, [fields]);

    const filteredRecords =
        records.filter((record) =>
            JSON.stringify(record)
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );

    const openCreate = () => {
        setEditingId(null);
        setForm(emptyForm);
        setError("");
        setMessage("");
        setModalOpen(true);
    };

    const openEdit = (record) => {
        const values = {};

        fields.forEach((field) => {
            values[field.key] =
                normalizeValue(
                    field,
                    record[field.key]
                );
        });

        setEditingId(record._id);
        setForm(values);
        setError("");
        setMessage("");
        setModalOpen(true);
    };

    const closeModal = () => {
        if (saving) {
            return;
        }

        setModalOpen(false);
        setEditingId(null);
        setForm(emptyForm);
    };

    const handleChange = (
        key,
        value
    ) => {
        setForm((previous) => ({
            ...previous,
            [key]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setSaving(true);
        setError("");
        setMessage("");

        try {
            const payload = {};

            fields.forEach((field) => {
                const value =
                    form[field.key];

                if (
                    value !== "" &&
                    value !== null &&
                    value !== undefined
                ) {
                    payload[
                        field.key
                    ] = value;
                }
            });

            if (editingId) {
                const data =
                    await apiPut(
                        `${endpoint}/${editingId}`,
                        payload
                    );

                setMessage(
                    data.message ||
                    "Record updated successfully"
                );

            } else {
                const data =
                    await apiPost(
                        endpoint,
                        payload
                    );

                setMessage(
                    data.message ||
                    "Record created successfully"
                );
            }

            setModalOpen(false);
            setEditingId(null);
            setForm(emptyForm);

            await loadRecords();

        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (record) => {
        if (!canDelete) {
            return;
        }

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this record?"
            );

        if (!confirmed) {
            return;
        }

        try {
            setError("");
            setMessage("");

            const data =
                await apiDelete(
                    `${endpoint}/${record._id}`
                );

            setMessage(
                data.message ||
                "Record deleted successfully"
            );

            await loadRecords();

        } catch (err) {
            setError(err.message);
        }
    };

    const getFieldOptions = (
        field
    ) => {
        if (field.options) {
            return field.options;
        }

        if (
            field.optionsFrom
        ) {
            return (
                lookups[
                    field.optionsFrom.key
                ] || []
            );
        }

        return [];
    };

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

                <div className="page-intro-actions">

                    <div className="record-count">
                        <strong>
                            {records.length}
                        </strong>

                        <span>
                            Records
                        </span>
                    </div>

                    {canWrite && (
                        <button
                            className="gold-button"
                            onClick={
                                openCreate
                            }
                        >
                            + {createTitle}
                        </button>
                    )}

                </div>

            </section>

            {(message || error) && (
                <div
                    className={
                        error
                            ? "notice error-notice"
                            : "notice success-notice"
                    }
                >
                    {error || message}
                </div>
            )}

            <section className="luxury-table-card">

                <div className="table-toolbar">

                    <div>
                        <span className="table-kicker">
                            RECORDS
                        </span>

                        <h3>
                            Operational Register
                        </h3>
                    </div>

                    <input
                        className="table-search"
                        placeholder="Search records..."
                        value={search}
                        onChange={(event) =>
                            setSearch(
                                event.target.value
                            )
                        }
                    />

                </div>

                {loading ? (
                    <div className="table-state">
                        Loading records...
                    </div>
                ) : (
                    <div className="table-scroll">

                        <table className="luxury-table">

                            <thead>
                                <tr>

                                    {columns.map(
                                        (column) => (
                                            <th
                                                key={
                                                    column.label
                                                }
                                            >
                                                {
                                                    column.label
                                                }
                                            </th>
                                        )
                                    )}

                                    {(canWrite ||
                                        canDelete) && (
                                        <th>
                                            Actions
                                        </th>
                                    )}

                                </tr>
                            </thead>

                            <tbody>

                                {filteredRecords.map(
                                    (record) => (
                                        <tr
                                            key={
                                                record._id
                                            }
                                        >

                                            {columns.map(
                                                (
                                                    column
                                                ) => (
                                                    <td
                                                        key={
                                                            column.label
                                                        }
                                                    >
                                                        {column.render
                                                            ? column.render(
                                                                record,
                                                                formatDate
                                                            )
                                                            : record[
                                                                column.key
                                                            ] ??
                                                            "—"}
                                                    </td>
                                                )
                                            )}

                                            {(canWrite ||
                                                canDelete) && (
                                                <td>

                                                    <div className="row-actions">

                                                        {canWrite && (
                                                            <button
                                                                className="edit-button"
                                                                onClick={() =>
                                                                    openEdit(
                                                                        record
                                                                    )
                                                                }
                                                            >
                                                                Edit
                                                            </button>
                                                        )}

                                                        {canDelete && (
                                                            <button
                                                                className="delete-button"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        record
                                                                    )
                                                                }
                                                            >
                                                                Delete
                                                            </button>
                                                        )}

                                                    </div>

                                                </td>
                                            )}

                                        </tr>
                                    )
                                )}

                            </tbody>

                        </table>

                        {!filteredRecords.length && (
                            <div className="table-state">
                                No records found.
                            </div>
                        )}

                    </div>
                )}

            </section>

            {modalOpen && (
                <div
                    className="modal-backdrop"
                    onMouseDown={(event) => {
                        if (
                            event.target ===
                            event.currentTarget
                        ) {
                            closeModal();
                        }
                    }}
                >

                    <div className="luxury-modal">

                        <div className="modal-header">

                            <div>
                                <span className="section-kicker">
                                    {editingId
                                        ? "EDIT RECORD"
                                        : "NEW RECORD"}
                                </span>

                                <h3>
                                    {editingId
                                        ? `Edit ${title}`
                                        : `Add ${title}`}
                                </h3>
                            </div>

                            <button
                                className="modal-close"
                                onClick={
                                    closeModal
                                }
                            >
                                ×
                            </button>

                        </div>

                        <form
                            className="luxury-form"
                            onSubmit={
                                handleSubmit
                            }
                        >

                            <div className="form-grid">

                                {fields.map(
                                    (field) => {
                                        const value =
                                            form[
                                                field.key
                                            ] ??
                                            "";

                                        const options =
                                            getFieldOptions(
                                                field
                                            );

                                        return (
                                            <div
                                                key={
                                                    field.key
                                                }
                                                className={
                                                    field.fullWidth
                                                        ? "form-field full-width"
                                                        : "form-field"
                                                }
                                            >

                                                <label>
                                                    {field.label}

                                                    {field.required && (
                                                        <span className="required-star">
                                                            *
                                                        </span>
                                                    )}
                                                </label>

                                                {field.type ===
                                                "textarea" ? (
                                                    <textarea
                                                        value={
                                                            value
                                                        }
                                                        placeholder={
                                                            field.placeholder ||
                                                            ""
                                                        }
                                                        onChange={(
                                                            event
                                                        ) =>
                                                            handleChange(
                                                                field.key,
                                                                event
                                                                    .target
                                                                    .value
                                                            )
                                                        }
                                                        required={
                                                            field.required
                                                        }
                                                    />
                                                ) : field.type ===
                                                  "select" ? (
                                                    <select
                                                        value={
                                                            value
                                                        }
                                                        onChange={(
                                                            event
                                                        ) =>
                                                            handleChange(
                                                                field.key,
                                                                event
                                                                    .target
                                                                    .value
                                                            )
                                                        }
                                                        required={
                                                            field.required
                                                        }
                                                    >
                                                        <option value="">
                                                            Select{" "}
                                                            {
                                                                field.label
                                                            }
                                                        </option>

                                                        {options.map(
                                                            (
                                                                option
                                                            ) => {

                                                                const optionValue =
                                                                    option.value ??
                                                                    option[
                                                                        field.optionsValueKey ||
                                                                            "_id"
                                                                    ];

                                                                const optionLabel =
                                                                    option.label ??
                                                                    (
                                                                        field.optionsLabel
                                                                    ).call(
                                                                        null,
                                                                        option
                                                                    );

                                                                return (
                                                                    <option
                                                                        key={
                                                                            optionValue
                                                                        }
                                                                        value={
                                                                            optionValue
                                                                        }
                                                                    >
                                                                        {
                                                                            optionLabel
                                                                        }
                                                                    </option>
                                                                );
                                                            }
                                                        )}

                                                    </select>
                                                ) : (
                                                    <input
                                                        type={
                                                            field.type ||
                                                            "text"
                                                        }
                                                        value={
                                                            value
                                                        }
                                                        placeholder={
                                                            field.placeholder ||
                                                            ""
                                                        }
                                                        onChange={(
                                                            event
                                                        ) =>
                                                            handleChange(
                                                                field.key,
                                                                event
                                                                    .target
                                                                    .value
                                                            )
                                                        }
                                                        required={
                                                            field.required
                                                        }
                                                    />
                                                )}

                                            </div>
                                        );
                                    }
                                )}

                            </div>

                            {error && (
                                <div className="form-error">
                                    {error}
                                </div>
                            )}

                            <div className="modal-actions">

                                <button
                                    type="button"
                                    className="cancel-button"
                                    onClick={
                                        closeModal
                                    }
                                    disabled={
                                        saving
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="gold-button"
                                    disabled={
                                        saving
                                    }
                                >
                                    {saving
                                        ? "Saving..."
                                        : editingId
                                            ? "Save Changes"
                                            : "Create Record"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}

        </div>
    );
}

export default CrudPage;