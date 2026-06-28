import type { DataTableColumn } from "@/shared/utility/types/dataTableColumns"
import { PurchaseRequisitionItem, type RequisitionItemsProps } from "@/types/purchaseRequisition/PurchaseRequisition"

export const columns: Array<DataTableColumn> = [
    {
        label: "ID",
        property: "id",
    },
    {
        label: "Cod.ref",
        property: "reference",
        format: (val: any) => {
            return `#${val.code}`
        }
    },
    {
        label: "Ultima Mov.",
        property: "moved_at",
        nested: "formatted"
    },
    {
        label: "Produto",
        property: "product",
        nested: "name"
    },
    {
        label: "qtd. entrada",
        property: "in",
        class: 'c-green-primary fw-bold ff-fantasy s-md',
         format: (val: any) => `+ ${val}`
    },
    {
        label: "qtd. saida",
        property: "out",
        class: 'c-danger-primary fw-bold ff-fantasy s-md',
        format: (val: any) => `- ${val}`
    },
    {
        label: "estoque atual",
        property: "current_stock",
        nested: 'label',
        class: 'ff-fantasy s-md'
    },
]

export const columnDetails = [
    {
        label: "Produto",
        property: "product",
        nested: "name"
    },
    {
        label: "Qtde. Pedido",
        property: "ordered_quantity",
    },
    {
        label: "Qtde. Entregado",
        property: "received_quantity",
    }
]

export const expandedColumns : Array<DataTableColumn> = [
    {
        label: "Cod.ref",
        property: "reference",
        format: (val: any) => {
            return `#${val.code}`
        }
    },
    {
        label: "Data da movimentação",
        property: "moved_at",
        nested: "formatted"
    },
]