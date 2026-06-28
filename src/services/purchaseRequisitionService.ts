import client from "@/shared/http/client";
import baseService from "./baseService";
import type { HttpResponse } from "@/shared/http/response";

export default {
    ...baseService,
    modulePath: "purchaseRequisitions",
    serviceTitle: "Requisiçao de compra",

    async attacheStatus(id: number, status: number): Promise<HttpResponse<any>> {
        return client.put(`${this.modulePath}/attache-status/${id}/status/${status}`, {})
    },
    async getUndeliveredProducts(id: number): Promise<HttpResponse<any>> {
        return client.get(`${this.modulePath}/list-undelivered-products-by-id/${id}`)
    },
    async pdf(id: number, name: string) {
        await client.pdf(`${this.modulePath}/${id}/pdf`, name)
    }
}