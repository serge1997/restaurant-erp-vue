import client from "@/shared/http/client";
import baseService from "./baseService";
import type { Paginate } from "@/shared/http/paginate";
import paginateToQueryUrl from "@/shared/http/paginate";

export default {
    ...baseService,
    modulePath: 'orders',
    serviceTitle: 'Pedido',


    async transferOrder(form: any) {
        return client.put(`${this.modulePath}/transfert`, form)
    },

    async updateOrderPayment(id: number, paymentMethod: number) {
        return client.put(`${this.modulePath}/${id}/payment-method/${paymentMethod}`, {})
    },
    async cancelItem(form: any) {
        return client.put(`${this.modulePath}/cancel-item`, form)
    },
    async cancel(form: any) {
        return client.put(`${this.modulePath}/cancel`, form)
    },
    async history(params: Paginate) {
        const toQueryUrl = paginateToQueryUrl(params)
        const completeUrl = `${this.modulePath}/history?${toQueryUrl}`
        return client.get(completeUrl)
    },
    homeKpis() {
        return this.client.get(`${this.modulePath}/homeKpis`)
    }
}