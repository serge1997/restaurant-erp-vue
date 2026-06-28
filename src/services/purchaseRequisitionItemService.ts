import client from "@/shared/http/client";
import baseService from "./baseService";
import type { HttpResponse } from "@/shared/http/response";
import type RequisitionItemsProps from "@/types/purchaseRequisition/PurchaseRequisition";

export default {
    ...baseService,
    modulePath: "purchaseRequisitionItems",
    serviceTitle: "",


    async getLastDeliveryOfProduct(productId: number): Promise<HttpResponse<RequisitionItemsProps>> {
        return client.get<RequisitionItemsProps>(`${this.modulePath}/list-last-delivery-of-product/${productId}`)
    }
}