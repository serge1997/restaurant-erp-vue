import type { DataTableColumn } from "@/shared/utility/types/dataTableColumns"

export const columns: DataTableColumn[] = [
    {
        label: "Code",
        property: "code"
    },
    {
        label: "Imagem",
        property: "image"
    },
    {
        label: "Nome",
        property: "name"
    },
    {
        label: "Preço",
        property: "price",
        nested: "label"
    },
    {
        label: "Categoria",
        property: "category",
        nested: "name"
    },
    {
        label: "Status",
        property: "is_active",
        format: (val: any) => val ? "Ativo" : "Inativo"
        
    },
    {
        label: "Ficha técnica",
        property: "enable_technical_sheet",
        nested: "label"
    }
]

export const sheetColumns = [
    {
        label: "Ingredientes",
        property: "product",
        nested: "name"
    },
    {
        label: "Quantidade",
        property: "quantity"
    },
    {
        label: "Custo",
        property: "cost"
    }
]