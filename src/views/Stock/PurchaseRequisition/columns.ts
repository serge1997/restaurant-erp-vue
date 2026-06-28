export default [
    {
        label: "Code",
        property: "code"
    },
    {
        label: "Observaçao",
        property: "observation"
    },
    {
        label: "Custo",
        property: "cost"
    },
    {
        label: "Departamento",
        property: "department",
        nested: "label"
    },
    {
        label: "Entrega em",
        property: "expected_delivery_date",
        nested: "formatted"
    }
]