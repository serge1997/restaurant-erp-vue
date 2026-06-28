import type { HttpResponse } from "@/shared/http/response";
import baseService from "./baseService";
import client from "@/shared/http/client";

export default {
    ...baseService,
    modulePath: "technicalSheets",

    async getBymenuItem(menuItemId: number): Promise<HttpResponse<any[]>> {
        return client.get(`${this.modulePath}/list-by-menu-item/${menuItemId}`)
    }   
}