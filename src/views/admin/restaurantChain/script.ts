import restaurantChainService from "@/services/restaurantChainService";
import { usePageMixin } from "@/stores/usePageMixin";
import { defineComponent } from "vue";
import columns from "./columns";
import Form from "./Form/Form.vue"
import Search from "./Search/Search.vue"
import type { FormRef } from "@/shared/utility";

export default defineComponent({
    name: 'RestaurantChainView',

    components: {
        Form,
        Search
    },

    setup(props, ctx) {
        const {
            data,
            search,
            paginate,
        } = usePageMixin(restaurantChainService)

        return {
            data,
            search,
            paginate
        }
    },
    watch: {
        'formStore.isVisible'(newValue) {
            if (newValue === false){
                this.formRef.onClearForm()
            }
        },
    },

    data(){
        return{
            columns: columns,
            formRef: {} as FormRef,
            service: restaurantChainService,
        }
    },
    methods:{
        setDatEdit(data: any) {
            this.formRef.onPopulateForm(data)
        },
    },

    async mounted() {
        this.formRef = this.$refs.formRef as FormRef
        this.paginate.query.is_active = false
        await this.search(this.paginate)
    },
})