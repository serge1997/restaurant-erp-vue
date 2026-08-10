import type { MenuItemProps } from "../menuItem/MenuItem"
import type { TableProps } from "../table/Table"

export interface OrderItemResponse{
    id: number
    menu_item: MenuItemProps
    unit_price: number
    quantity: number
    subtotal: number
}
export enum OrderStatus {
    OPEN = 1,
    SENT = 2,
    DELIVERED = 3,
    CLOSED = 4,
    CANCELLED = 5,
}

export interface OrderResponse {
    id: number
    status: {value: string, label: number, severity: string}
    table: TableProps
    customer_name: string | null
    waiter_name: string
    since: string
    observation: string
    items: OrderItemResponse[],
    payment_status:{
        value: string,
        label: string,
        is_paid: boolean
    },
    payment_method: {
        value?: string,
        label?: string
    },
    cancelItems?: any[],
    total?: number,
    waiter: {
        id?: number,
        name?: string,
        inicial?: string
    }
}

export enum CancelItemReasonEnum {
    ORDER_ERR = 1,
    CUSTOMER_REQUIRE,
    UNVAILABLE_ITEM,
    ITEM_LATE_DELIVERY,
    DISSATISFIED_CUSTOMER,
    OTHER
}

export const CancelItemReasonOptions = [
    {value: CancelItemReasonEnum.ORDER_ERR, label: "Erro no pedido"},
    {value: CancelItemReasonEnum.CUSTOMER_REQUIRE, label: "Solicaçao do cliente"},
    {value: CancelItemReasonEnum.UNVAILABLE_ITEM, label: "Item esgotado"},
    {value: CancelItemReasonEnum.ITEM_LATE_DELIVERY, label: "Demora na entrega"},
    {value: CancelItemReasonEnum.DISSATISFIED_CUSTOMER, label: "Qualidade insatisfatória/Cliente insatisfeito"},
    {value: CancelItemReasonEnum.OTHER, label: "Outro"}
]

export const orderStatusOptions = [
    {value: OrderStatus.OPEN, label: "Aberto", meta_data_prop: 'opened_count'},
    {value: OrderStatus.SENT, label: "Enviado", meta_data_prop: 'sent_count'},
    {value: OrderStatus.DELIVERED, label: "Entregue", meta_data_prop: 'delivered_count'},
    {value: OrderStatus.CLOSED, label: "Fechado", meta_data_prop: 'closed_count'},
    {value: OrderStatus.CANCELLED, label: "Cancelado", meta_data_prop: 'canceled_count'},
]

export const orderTotal = (items: OrderItemResponse[]): number => {
    return items.reduce((acc, curr) => acc + curr.unit_price * curr.quantity, 0)
}