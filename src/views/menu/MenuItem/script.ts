import { defineComponent, type PropType } from "vue";
import menuItemService from "@/services/menuItemService";
import { usePageMixin } from "@/stores/usePageMixin";
import {columns} from "./columns";
import Form from './Form/Form.vue'
import Search from "./Search/Search.vue";
import type { MenuCategoryProps } from "@/types/menuCategory/MenuCategory";
import menuCategoryService from "@/services/menuCategoryService";
import type { FormOptions as TechnicalSheetFormOptions} from "@/types/TechnicalSheet/TechnicalSheet";
import type { MenuItemProps } from "@/types/menuItem/MenuItem";
import { featureMenuitemOptions } from "@/types/menuItem/MenuItem";


export default defineComponent({
    name: "MenuItemView",

    components: {
        Form,
        Search
    },

     setup(){
        const {
            data,
            paginate, 
            search,
            onSearch
        } = usePageMixin(menuItemService)
    
        return {
            data,
            paginate, 
            search,
            onSearch
        }
    },
    data(){
        return {
            columns: columns,
            service: menuItemService,
            options: {
                categories: [] as MenuCategoryProps[],
                featureMenuitems: featureMenuitemOptions
            },
        }
    },
    methods: {
        async getCategoriies() {
            const request = await menuCategoryService.getAll<MenuCategoryProps[]>({})
            this.options.categories = request.data.flat()
        },
        sheetOptions(): TechnicalSheetFormOptions {
            return {
                menuItems: this.data as Array<MenuItemProps>,
                products: []
            }
        }
    },
    async mounted() {
        await this.getCategoriies()
        await this.search(this.paginate)
    },
})