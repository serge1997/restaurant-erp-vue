import { defineComponent } from "vue";
import { dateToLiteral } from "@/shared/utility/utils";
import { useAuthStore } from "@/stores/authStore";
import orderService from "@/services/orderService";
import { type OrderResponse, orderTotal } from "@/types/order/Order";
import ScrollPanel from "primevue/scrollpanel";
import tableService from "@/services/tableService";

export default defineComponent({
    components: {
        ScrollPanel
    },
    setup(props, ctx) {
        const auth = useAuthStore()
        return {
            dateToLiteral,
            orderTotal,
            user: auth.getAuth()
        }
    },

    data(){
        return {
            kpis: {} as any,
            orders: [] as OrderResponse[],
            tables: [] as any[],
            scrollHeight: '',
        }
    },

    methods: {
        async getHomeKpis(){
            const {data} = await orderService.homeKpis()
            this.kpis = data
        },
        isUp(value1: number, value2: number): boolean {
            return value1 > value2 || value1 == value2
        },
        async getOpenedOrders(){
            const {data} = await orderService.getAll<OrderResponse>({query: {status: [1, 2]}, limit: 10})
            this.orders = data
        },
        async getAllWithOrderStatus() {
            const {data} = await tableService.getAllWithOrderStatus()
            this.tables = data as any[]
        },
        tableSeverity(status: string): string {
            if(status == 'open') {
                return 'm-occ'
            }
            return 'm-free'
        }
    },
    mounted() {
        this.getHomeKpis()
        this.getOpenedOrders()
        this.getAllWithOrderStatus()
    },
})