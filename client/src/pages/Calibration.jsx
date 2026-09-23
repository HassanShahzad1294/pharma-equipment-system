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
        key: "calibrationDate",
        label: "Calibration Date",
        type: "date",
        required: true
    },
    {
        key: "dueDate",
        label: "Due Date",
        type: "date",
        required: true
    },
    {
        key: "calibrationType",
        label: "Calibration Type",
        type: "select",
        required: true,
        options: [
            "Routine Calibration",
            "Initial Calibration",
            "Recalibration"
        ].map((item) => ({
            value: item,
            label: item
        }))
    },
    {
        key: "standardReference",
        label: "Standard Reference"
    },
    {
        key: "result",
        label: "Result",
        type: "select",
        required: true,
        options: [
            "Passed",
            "Failed",
            "Passed with Adjustment"
        ].map((item) => ({
            value: item,
            label: item
        }))
    },
    {
        key: "certificateNumber",
        label: "Certificate Number"
    },
    {
        key: "observations",
        label: "Observations",
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

function Calibration() {
    return (
        <CrudPage
            eyebrow="QUALITY CONTROL"
            title="Calibration Register"
            description="Manage calibration history, results, certificates and due dates."
            endpoint="/calibration"
            responseKey="calibrations"
            createTitle="Add Calibration"
            fields={fields}
            columns={[
                {
                    label: "Equipment",
                    render: (item) => (
                        <div>
                            <strong className="table-main">
                                {item.equipment?.name ||
                                    "Unlinked Equipment"}
                            </strong>

                            <span className="table-sub">
                                {item.equipment?.equipmentId ||
                                    "—"}
                            </span>
                        </div>
                    )
                },
                {
                    label: "Type",
                    key: "calibrationType"
                },
                {
                    label: "Calibration",
                    render: (item, date) =>
                        date(item.calibrationDate)
                },
                {
                    label: "Due",
                    render: (item, date) =>
                        date(item.dueDate)
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
                    label: "Certificate",
                    render: (item) => (
                        <span className="code-badge">
                            {item.certificateNumber || "—"}
                        </span>
                    )
                }
            ]}
        />
    );
}

export default Calibration;