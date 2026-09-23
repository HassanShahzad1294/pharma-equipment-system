import CrudPage from "../components/CrudPage";

const fields = [
    {
        key: "equipmentId",
        label: "Equipment ID",
        required: true
    },
    {
        key: "name",
        label: "Equipment Name",
        required: true
    },
    {
        key: "category",
        label: "Category",
        type: "select",
        required: true,
        options: [
            "Incubator",
            "Particle Counter",
            "Air Sampler",
            "Autoclave",
            "Stability Chamber",
            "HVAC",
            "Other"
        ].map((item) => ({
            value: item,
            label: item
        }))
    },
    {
        key: "manufacturer",
        label: "Manufacturer",
        required: true
    },
    {
        key: "model",
        label: "Model"
    },
    {
        key: "serialNumber",
        label: "Serial Number",
        required: true
    },
    {
        key: "location",
        label: "Location",
        required: true
    },
    {
        key: "installationDate",
        label: "Installation Date",
        type: "date"
    },
    {
        key: "status",
        label: "Status",
        type: "select",
        defaultValue: "Operational",
        options: [
            "Operational",
            "Under Maintenance",
            "Out of Service",
            "Decommissioned"
        ].map((item) => ({
            value: item,
            label: item
        }))
    },
    {
        key: "description",
        label: "Description",
        type: "textarea",
        fullWidth: true
    }
];

function Equipment() {
    return (
        <CrudPage
            eyebrow="ASSET CONTROL"
            title="Equipment Registry"
            description="Manage pharmaceutical equipment, locations, identity and operational status."
            endpoint="/equipment"
            responseKey="equipment"
            createTitle="Add Equipment"
            fields={fields}
            columns={[
                {
                    label: "Equipment ID",
                    render: (item) => (
                        <span className="code-badge">
                            {item.equipmentId}
                        </span>
                    )
                },
                {
                    label: "Equipment",
                    render: (item) => (
                        <div>
                            <strong className="table-main">
                                {item.name}
                            </strong>

                            <span className="table-sub">
                                {item.manufacturer} · {item.model}
                            </span>
                        </div>
                    )
                },
                {
                    label: "Category",
                    key: "category"
                },
                {
                    label: "Location",
                    key: "location"
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

export default Equipment;