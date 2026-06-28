import { defineComponent } from "vue";
import Search from "./Search/Search.vue"
import columns from "./columns";
import { usePageMixin } from "@/stores/usePageMixin";
import orderService from "@/services/orderService.ts";
import type { Paginate } from "@/shared/http/paginate.ts";
import { useTableStore } from "@/stores/useTableStore.ts";
import Form from "./Form/Form.vue";
import { useUserStore } from "@/stores/userStore.ts";
import { dateEngFormat } from "@/shared/utility/index.ts";

export default defineComponent({
    name: "orderHistoryView",

    components:{
        Search,
        Form
    },

    setup(props, ctx) {
        const tableStore = useTableStore()
        const userStore = useUserStore()
        const {
            paginate,
            data,
            metaData
        } = usePageMixin(orderService)
        return {
            paginate,
            data,
            metaData,
            tableStore,
            userStore
        }
    },

    data(){
        return {
            columns: columns,
            service: orderService,
            filters:{
                tables: [] as any[],
                users: [] as any[],
            },
            defaultOpt: {id: 0, name: "Todos"},
            query: {
                status: 0,
                payment: 0,
                paymentMethod: 0,
                table: 0,
                customer: null,
                waiter: [0],
                businessDayFom: new Date(),
                businessDayTo: null
            },
            order: null
        }
    },

    methods: {
        async queryHistory(paginate: Paginate) {
            const {data} = await this.service.history(paginate)
            this.data = data as any
            
        },
        async onSearch(params: any){
            
            this.paginate.search = params?.search?.toLowerCase() || ''
            this.paginate.offset = 0
            let query = params.query || {}
            this.paginate.query = query
            this.paginate.query.businessDayFom = dateEngFormat(query?.businessDate) ?? ''
            this.paginate.query.businessDayTo = dateEngFormat(query?.businessDateTo) ?? ''
            this.paginate.query.customer = query.customer ?? ''
            await this.queryHistory(this.paginate)
        },
        async clearFilter(){
            this.query =  {
                status: 0,
                payment: 0,
                paymentMethod: 0,
                table: 0,
                customer: null,
                waiter: [0],
                businessDayFom: new Date(),
                businessDayTo: null
            }
            await this.onSearch({query: {}})
        },
        populateOrder(order: any){
            this.order = order
        }
    },

    async created() {
        await this.onSearch(this.paginate)
    },
   async mounted() {
        await this.tableStore.loadTables()
        await this.userStore.loadUsers()
        this.filters.tables = this.tableStore.tables
        this.filters.tables = [this.defaultOpt, ...this.filters.tables]
        this.filters.users = this.userStore.users
    },
})