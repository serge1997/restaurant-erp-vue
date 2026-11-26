import { type ExportProps } from "@/shared/utility/types/export";

const exportMap: ExportProps[] = [
    {
        prop: "id",
        label: "ID"
    },
    {
        prop: "customer_name",
        label: "Cliente",
    },
    {
        prop: "table",
        label: "Mesa",
        nested: "number"
    },
    {
        prop: "payment_status",
        label: "Status pagamento",
        nested: "label"
    },
    {
        prop: "payment_method",
        label: "Pagamento",
        nested: "label"
    },
    {
        prop: "business_day",
        label: "Data",
        nested: "formatted"
    }
];

export default exportMap;
