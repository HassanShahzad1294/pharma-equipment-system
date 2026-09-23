import CrudPage from "../components/CrudPage";

const equipmentSource = {
    key: "equipment",
    endpoint: "/equipment",
    responseKey: "equipment"
};

const fields = [
    {
        key: "equipment",
        label: "Equipment",
        type: "select",
        required: true,
        optionsFrom: equipmentSource,
        optionsLabel: (item) =>
            `${item.equipmentId} — ${item.name}`
    },
    {
        key: "qualificationType",
        label: "Qualification Type",
        type: "select",
        required: true,
        options: [
            "IQ",
            "OQ",
            "PQ"
        ].map((item) => ({
            value: item,
            label: item
        }))
    },
    {
        key: "protocolNumber",
        label: "Protocol Number",
        required: true
    },
    {
        key: "executionDate",
        label: "Execution Date",
        type: "date",
        required: true
    },
    {
        key: "result",
        label: "Result",
        type: "select",
        required: true,
        options: [
            "Passed",
            "Failed",
            "Passed with Deviations"
        ].map((item) => ({
            value: item,
            label: item
        }))
    },
    {
        key: "status",
        label: "Status",
        type: "select",
        defaultValue: "Draft",
        options: [
            "Draft",
            "In Progress",
            "Completed",
            "Approved"
        ].map((item) => ({
            value: item,
            label: item
        }))
    },
    {
        key: "observations",
        label: "Observations",
        type: "textarea",
        fullWidth: true
    },
    {
        key: "deviations",
        label: "Deviations",
        type: "textarea",
        fullWidth: true
    },
    {
        key: "correctiveAction",
        label: "Corrective Action",
        type: "textarea",
        fullWidth: true
    },
    {
        key: "remarks",
        label: "Remarks",
        type: "textarea",
        fullWidth: true
    }
];

function Qualification() {
    return (
        <CrudPage
            eyebrow="VALIDATION & QUALIFICATION"
            title="IQ / OQ / PQ"
            description="Manage installation, operational and performance qualification records."
            endpoint="/qualification"
            responseKey="qualifications"
            createTitle="Add Qualification"
            fields={fields}
            columns={[
                {
                    label: "Equipment",
                    render: (item) => (
                        <strong className="table-main">
                            {item.equipment?.name || "—"}
                        </strong>
                    )
                },
                {
                    label: "Type",
                    render: (item) => (
                        <span className="type-badge">
                            {item.qualificationType}
                        </span>
                    )
                },
                {
                    label: "Protocol",
                    render: (item) => (
                        <span className="code-badge">
                            {item.protocolNumber}
                        </span>
                    )
                },
                {
                    label: "Execution",
                    render: (item, date) =>
                        date(item.executionDate)
                },
                {
                    label: "Result",
                    render: (item) => (
                        <span className="status-pill">
                            {item.result}
                        </span>
                    )
                },
                {
                    label: "Status",
                    key: "status"
                }
            ]}
        />
    );
}

export default Qualification;