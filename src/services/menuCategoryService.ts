import type { MenuCategoryProps } from "@/types/menuCategory/MenuCategory";
import baseService from "./baseService";
import type { HttpResponse } from "@/shared/http/response";

export default {
    ...baseService,
    modulePath: 'menuCategories',
    serviceTitle: 'Categoria do menu',

    getTopCategories(): Promise<HttpResponse<MenuCategoryProps[]>> {
        return this.client.get<MenuCategoryProps[]>(this.modulePath + "/listTopCategories")
    }
}