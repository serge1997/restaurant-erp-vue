import menuItemService from "@/services/menuItemService";
import type { MenuItemProps } from "@/types/menuItem/MenuItem";
import { defineStore } from "pinia";


export const useMenuitemStore = defineStore('menuItem', {
    state: () => ({
        items: [] as MenuItemProps[],
        loaded: false,
        loading: false,
    }),

    actions: {
        async loadItems() {
            if (this.loading || this.loaded) return
            this.loading = true
            const response = await menuItemService.getAll<MenuItemProps>({limit: 40})
            const {data} = response
            this.items = data
            this.loaded = true
            this.loading = false;
        }
    }
})