import { defineComponent } from "vue";
import MenuElementCard from "./MenuElementCard/MenuElementCard.vue"
import MenuFilter from "./MenuFilter/MenuFilter.vue"
import type { MenuFilterState } from "./MenuFilter/script";
import menuItemService from "@/services/menuItemService";
import { usePageMixin } from "@/stores/usePageMixin";
import { Cart } from "@/types/cart/Cart";
import type { MenuCategoryProps } from "@/types/menuCategory/MenuCategory";
import { useMenuCategoryStore } from "@/stores/useMenuCategoryStore.ts";
import menuCategoryService from "@/services/menuCategoryService.ts";


export default defineComponent({
    name: "MenuView",

    components: {
        MenuElementCard,
        MenuFilter
    },

    setup(){
        const menuCategoryStore = useMenuCategoryStore()
        const {
            data,
            paginate,
            search
        } = usePageMixin(menuItemService)

        return {
            data,
            paginate,
            search,
            menuCategoryStore
        }
    },

    data() {
        return {
          menuItems: null,
          cartQuantities: 0,
          reservation: null,
          sideDishes: [] as any[],
          categories: [] as MenuCategoryProps[],
          topCategories: [] as MenuCategoryProps[]
        }
    },
    methods: {
        async onFilterChange(filter: MenuFilterState){
            this.paginate.search = filter.search
            this.paginate.query = {
                ...this.paginate.query,
                categories: filter.category ? [filter.category] : [],
                features: filter.tags,
                most_ordered: filter.mostOrdered,
                cooking_time_max: filter.maxCookingTime
            }
            await this.search(this.paginate)
        },
        newElementAdded(){
            const length = Cart.load()?.length
            this.cartQuantities = length || 0
        },
        clearCard(){
            if (this.$refs.cardRefs) {
                (this.$refs.cardRefs as []).forEach(card => {
                    (card as any).hasElement = false
                });
            }
            this.newElementAdded()
        },
        async getSideDishes(){
            const paginate = JSON.parse(JSON.stringify(this.paginate))
            paginate.query = {
                categories: [28],
                is_active: true,
            }
            const { data } = await menuItemService.getAll(paginate)
            this.sideDishes = data
        },
        async getTopCategories() {
            const { data } = await menuCategoryService.getTopCategories()
            this.topCategories = data
        }
    },
  async mounted() {
    await this.search(this.paginate)
    const carts = Cart.load()
    this.cartQuantities = carts?.length || 0
    await this.getSideDishes()
    await this.menuCategoryStore.load()
    this.categories = this.menuCategoryStore.categories
    await this.getTopCategories()
  },

})
