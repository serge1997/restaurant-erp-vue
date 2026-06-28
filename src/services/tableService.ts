import type { HttpResponse } from "@/shared/http/response";
import baseService from "./baseService";
import client from "@/shared/http/client";

export default {
    ...baseService,
    modulePath: 'tables',
    serviceTitle: 'Mesa',

    async getAllForOrders<T>(){
        return client.get<T>(`${this.modulePath}/for-orders`)
    },
    async getAvailables<T>(): Promise<HttpResponse<T[]>> {
        return client.get<T[]>(`${this.modulePath}/availables`)
    }
}