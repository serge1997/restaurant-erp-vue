import client from "@/shared/http/client";
import baseService from "./baseService";

export default {
    ...baseService,
    modulePath: "stockMovements",
    serviceTitle: "Movimentaçao de estoque",

    async getLastByProduct(productId: number) {
        return client.get(`${this.modulePath}/list-last-by-product/${productId}`)
    }
}