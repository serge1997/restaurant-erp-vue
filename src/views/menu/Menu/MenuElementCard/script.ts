import { FeaturedMenuItemEnum, type MenuItemProps } from "@/types/menuItem/MenuItem";
import { defineComponent, type PropType } from "vue";
import Card from "primevue/card";
import { Cart } from "@/types/cart/Cart";
import { useNotify } from "@/shared/utility/notify";

export default defineComponent({
    name: "MenuElementCard",

    components: {
        Card
    },

    props: {
        item: Object as PropType<MenuItemProps>
    },
    setup(){
       const notify = useNotify()
       return {
        notify
       }
       
    },
    computed: {
        hasChefTag() {
            return this.item?.featured_types?.includes(FeaturedMenuItemEnum.CHEF_DISH)
        },
        hasNewTag() {
            return this.item?.featured_types?.includes(FeaturedMenuItemEnum.NEW_DISH)
        },
        hasPromoTag(){
            return this.item?.featured_types?.includes(FeaturedMenuItemEnum.PROMOTION)
        },
    },
    data() {
        return {
            cart: {} as Cart,
            hasElement: false
        }
    },
    methods: {
        addToCart() {
            const cart = Cart.create({
                quantity: 1,
                item: this.item as MenuItemProps,
                subtotal: 0
            })
            this.hasElement = true
            cart.add()
            this.$emit("element-added")
            this.notify.success("Adicionado no carinho")
        },
        cartHas() {
            this.hasElement = Cart.has(this.item!.id)
        }
    },
    created(){
        this.cartHas()
    }
})