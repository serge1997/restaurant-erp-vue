import { defineComponent } from "vue";
import Navbar from '@/components/template/NavbarTemplate/Navbar.vue';
import { useFormStore } from "@/stores/formStore";
import { Cart } from "@/types/cart/Cart";
import { useConfirm } from "primevue/useconfirm";
import ConfirmTemplate from "../ConfirmTemplate/ConfirmTemplate.vue";

export default defineComponent({
    name: 'PageTemplate',
    components: {
        Navbar,
        ConfirmTemplate
    },
    props: {
        hasNewButton: {
            type: Boolean,
            default: true
        },
        title: {
            type: String,
            default: 'Titulo da pagina'
        },
        cardQuantityItems: {
            type: Number
        },
        newBtnLabel: {
            type: String,
            default: "Novo"
        },
        tables: [],
        mt: {
            type: String,
            default: "mt-5"
        },
        activeOrder:{
            type: Object,
        }
    },
    setup(){
        const formStore = useFormStore()
        const confirm = useConfirm()
        return {
            formStore,
            confirm
        }
    },

    data(){
        return {
            cartTotal: 0
        }
    },

    methods: {
        openForm(){
            this.formStore.openForm()
        },
        setCartTotal(){
            this.cartTotal = Cart.total()
        },
        loadCart(){
            this.setCartTotal()
        },
        clearCart(){
            this.loadCart()
            this.$emit('cart-cleared')
        },
        openConfirmOrder() {
            this.confirm.require({
                message: "Confirmar para o envio do pedido."
            })
        }
    },
    mounted() {
        this.setCartTotal()
    },
})