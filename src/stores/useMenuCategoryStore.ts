import menuCategoryService from "@/services/menuCategoryService";
import type { MenuCategoryProps } from "@/types/menuCategory/MenuCategory";
import { defineStore } from "pinia";


export const useMenuCategoryStore = defineStore('menuCategories', {

    state: () => ({
        categories: [] as MenuCategoryProps[],
        loaded: false,
        loading: false
    }),

    actions: {
        async load() {
            if (this.loaded || this.loading) return 
                this.loading = true
                const { data } = await menuCategoryService.getAll<MenuCategoryProps>({})
                this.categories = data
                this.loading = false
                this.loaded = true
            }
        }
})