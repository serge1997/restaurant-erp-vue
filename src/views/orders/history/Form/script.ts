import { defineComponent } from "vue";
import ShowOrderTemplate from "@/components/template/order/show/ShowOrderTemplate.vue";
import { reactive } from "vue";


export default defineComponent({
    name: "Form",

    components: {
        ShowOrderTemplate
    },
    props: {
        order: {
            type: Object,
            required: true
        }
    },

    setup(){
    },

    computed: {
        getTitle(){
            if(!this.order) return null
            return `Pedido #${this.order.id}`
        },
    }

})