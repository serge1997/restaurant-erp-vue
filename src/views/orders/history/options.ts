import { orderStatusOptions } from "@/types/order/Order";
import { paymentMethodOptions } from "@/types/paymentMethod/PaymentMethod";

const defaultOpt = {value: 0, label: "Todos"}
export default {
    orderStatus: orderStatusOptions,
    payments: [
        defaultOpt,
        {value: 1, label: "Pendente"},
        {value: 2, label: "Pago"}
    ],
    paymentMethods: [defaultOpt, ...paymentMethodOptions]
}