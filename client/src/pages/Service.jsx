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
        key: "reportedDate",
        label: "Reported Date",
        type: "date"
    },
    {
        key: "priority",
        label: "Priority",
        type: "select",
        defaultValue: "Medium",
        options: [
            "Low",
            "Medium",
            "High",
            "Critical"
        ].map((item) => ({
            value: item,
            label: item
        }))
    },
    {
        key: "status",
        label: "Status",
        type: "select",
        defaultValue: "Open",
        options: [
            "Open",
            "In Progress",
            "Resolved",
            "Closed"
        ].map((item) => ({
            value: item,
            label: item
        }))
    },
    {
        key: "problemTitle",
        label: "Problem Title",
        required: true
    },
    {
        key: "errorDetails",
        label: "Error Details",
        type: "textarea",
        required: true,
        fullWidth: true
    },
    {
        key: "troubleshootingPerformed",
        label: "Troubleshooting Performed",
        type: "textarea",
        fullWidth: true
    },
    {
        key: "rootCause",
        label: "Root Cause",
        type: "textarea",
        fullWidth: true
    },
    {
        key: "actionTaken",
        label: "Action Taken",
        type: "textarea",
        fullWidth: true
    },
    {
        key: "resolutionDate",
        label: "Resolution Date",
        type: "date"
    },
    {
        key: "remarks",
        label: "Remarks",
        type: "textarea",
        fullWidth: true
    }
];

function Service() {
    return (
        <CrudPage
            eyebrow="TECHNICAL SUPPORT"
            title="Service & Troubleshooting"
            description="Record machine problems, troubleshooting, root cause and resolution."
            endpoint="/service"
            responseKey="serviceRecords"
            createTitle="Add Service Record"
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
                    label: "Problem",
                    render: (item) => (
                        <div>
                            <strong className="table-main">
                                {item.problemTitle}
                            </strong>

                            <span className="table-sub">
                                {item.rootCause || "—"}
                            </span>
                        </div>
                    )
                },
                {
                    label: "Priority",
                    render: (item) => (
                        <span className="priority-pill">
                            {item.priority}
                        </span>
                    )
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

export default Service;