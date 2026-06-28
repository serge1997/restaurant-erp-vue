import orderService from "@/services/orderService";
import { usePageMixin } from "@/stores/usePageMixin";
import { defineComponent } from "vue";
import columns from "./columns";
import Form from './Form/Form.vue'
import { orderStatusOptions } from "@/types/order/Order";


export default defineComponent({
    name: 'OrderView',

    components: {
        Form
    },

    setup(props, ctx) {
        const {
            search,
            paginate,
            data,
            metaData
        } = usePageMixin(orderService)
        return {
            search,
            paginate,
            data,
            metaData
        }
    },

    data(){
        return {
            columns: columns,
            service: orderService,
            formRef: null as any,
            statusFilterOptions: [
                {value: 0, label: 'Todos', meta_data_prop: 'total_count'},
                ...orderStatusOptions
            ],
            serach_query: ''
        }
    },

    methods:{
        populateOrder(order: any){
            this.formRef.populateForm(order)
        },
        showOrder(order: any){
            this.formRef.populateForm(order)
            this.formRef.formStore.openForm()
        },
        async filterStatus(status: number) {
            this.paginate.query = {...this.paginate.query, status: status}
            await this.search(this.paginate)
        },
        activeClassStatusFilter(status: number): string {
            return this.paginate.query?.status == status ? 'on' : ''
        },
        async filterSearch(){
            this.paginate.query = {...this.paginate.query, search: this.serach_query}
            await this.search(this.paginate)
        }
    },
    async mounted() {
        this.paginate.query.status = 0
        await this.search(this.paginate)
        this.formRef = this.$refs.form
    },
})