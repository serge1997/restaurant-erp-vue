import { defineComponent } from "vue";
import MenuElementCard from "./MenuElementCard/MenuElementCard.vue"
import menuItemService from "@/services/menuItemService";
import { usePageMixin } from "@/stores/usePageMixin";
import { Cart } from "@/types/cart/Cart";


export default defineComponent({
    name: "MenuView",

    components: {
        MenuElementCard
    },

    setup(){
        const {
            data,
            paginate, 
            search
        } = usePageMixin(menuItemService)
                
        return {
            data,
            paginate, 
            search
        }
    },

    data() {
        return {
            menuItems: null,
            cartQuantities: 0,
        }
    },
    methods: {
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
    },
    async mounted() {
        await this.search(this.paginate)
        const carts = Cart.load()
        this.cartQuantities = carts?.length || 0
       
    },

})