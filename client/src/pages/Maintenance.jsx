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
        key: "maintenanceType",
        label: "Maintenance Type",
        type: "select",
        required: true,
        options: [
            "Preventive Maintenance",
            "Corrective Maintenance",
            "Scheduled Maintenance"
        ].map((item) => ({
            value: item,
            label: item
        }))
    },
    {
        key: "maintenanceDate",
        label: "Maintenance Date",
        type: "date",
        required: true
    },
    {
        key: "nextDueDate",
        label: "Next Due Date",
        type: "date"
    },
    {
        key: "status",
        label: "Status",
        type: "select",
        defaultValue: "Scheduled",
        options: [
            "Scheduled",
            "In Progress",
            "Completed"
        ].map((item) => ({
            value: item,
            label: item
        }))
    },
    {
        key: "issue",
        label: "Issue"
    },
    {
        key: "workPerformed",
        label: "Work Performed",
        type: "textarea",
        required: true,
        fullWidth: true
    },
    {
        key: "partsReplaced",
        label: "Parts Replaced",
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

function Maintenance() {
    return (
        <CrudPage
            eyebrow="ASSET RELIABILITY"
            title="Maintenance Register"
            description="Manage preventive, corrective and scheduled maintenance."
            endpoint="/maintenance"
            responseKey="maintenance"
            createTitle="Add Maintenance"
            fields={fields}
            columns={[
                {
                    label: "Equipment",
                    render: (item) => (
                        <div>
                            <strong className="table-main">
                                {item.equipment?.name || "—"}
                            </strong>

                            <span className="table-sub">
                                {item.equipment?.equipmentId || "—"}
                            </span>
                        </div>
                    )
                },
                {
                    label: "Type",
                    key: "maintenanceType"
                },
                {
                    label: "Maintenance",
                    render: (item, date) =>
                        date(item.maintenanceDate)
                },
                {
                    label: "Next Due",
                    render: (item, date) =>
                        date(item.nextDueDate)
                },
                {
                    label: "Status",
                    render: (item) => (
                        <span className="status-pill">
                            {item.status}
                        </span>
                    )
                }
            ]}
        />
    );
}

export default Maintenance;