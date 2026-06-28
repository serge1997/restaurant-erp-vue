import orderService from "@/services/orderService";
import tableService from "@/services/tableService";
import Divider from "primevue/divider";
import { defineComponent } from "vue";

interface TableOrderViewProps {
    available_tables: any[]
    tables_with_orders: any[]
}
export default defineComponent({
    name: 'TableOrderView',

    components:{
        Divider
    },

    setup(){
    },
    computed: {
        tablesTotal(){
            return this.available_tables.length + this.tables_with_orders.length
        },
        tablesWithOrdersTotal(){
            return this.tables_with_orders.length
        },
        availableTablesTotal(){
            return this.available_tables.length
        },
        tablesFilterisAll(){
            return this.tableFilterActive === 'all'
        },
        tablesFilterisBusy(){
            return this.tableFilterActive === 'busy'
        },
        tablesFilterisFree(){
            return this.tableFilterActive === 'free'
        },
        tablesFilterisReserved(){
            return this.tableFilterActive === 'reserved'
        },
        tableWithOrderTotalAmount() {
            return Number(this.tables_with_orders.reduce((acc, current) => acc + Number(current.total_price), 0)).toFixed(2)
        }
    },
    data(){
        return {
            available_tables: [] as any[],
            tables_with_orders: [] as any[],
            tableFilterActive: 'all'
        }
    },
    methods: {
        filterTableView(filter: string){
            this.tableFilterActive = filter
        },
        setTableFilterActiveClass(filter: string){
            return this.tableFilterActive === filter ? 'on' : ''
        }
    },
    async mounted() {
       const response = await tableService.getAllForOrders<TableOrderViewProps>()
       this.tables_with_orders = response.data.tables_with_orders
       this.available_tables = response.data.available_tables
    },
})