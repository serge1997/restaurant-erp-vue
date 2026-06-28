import { defineComponent, reactive } from "vue";
import options from "../options";
//import type { FilterProps } from "@/types/filter/filter";
import { useSearchMixin } from "@/mixins/useSearchMixin";
import type { FilterOption } from "@/shared/utility/types/filterOption";

export default defineComponent({
    name: "Search",

    props: {
        tables: Object,
        filters: Object
    },
    setup(props, ctx){
        const query = reactive({
            status: [],
            payment: 0,
            paymentMethod: 0,
            table: 0,
            customer: null,
            waiter: [],
            businessDate: null,
            businessDateTo: null
        })
        const filtersOptions: FilterOption[] = [
            {
                label: 'Data',
                title: 'Filtrar por dt lancamento',
                slot: 'businessDate',
                selectionLenght: 0,
                isDate: true,
                hidden: true
            },
            {
                label: 'Status do pedido',
                title: 'Filtrar por status do pedido',
                slot: 'status',
                selectionLenght: 0,
                hidden: true
            },
            {
                label: 'Cliente',
                title: 'Filtrar por nome do cliente',
                slot: 'customer',
                selectionLenght: 0,
                hidden: true
            },
            {
                label: 'Garçom / Autor',
                title: 'Filtrar por quem lançou o pedido',
                slot: 'waiter',
                selectionLenght: 0,
                hidden: true
            }
        ]
        const {
            sumFiltersQuantity,
            resetFilterSelectionQuantity,
            incrementFiltersQuantity,
            clearSearchInputs,
        } = useSearchMixin(filtersOptions, query, ctx.emit, false)
        return {
            filtersOptions,
            sumFiltersQuantity,
            incrementFiltersQuantity,
            resetFilterSelectionQuantity,
            clearSearchInputs,
            query
        }
    },
    watch: {
        query: {
            handler(newVlaue){
                this.incrementFiltersQuantity()
                this.sumFilter = this.sumFiltersQuantity()
            },
            deep: true
        },
    },
    data(){
        return {
            options: options,
            sumFilter: 0
        }
    },
    computed: {
        getSumFiltersQuantity(){
            return this.sumFiltersQuantity()
        }
    },
    methods: {
        onSearch(params: any) {
            const allParams = {...params, ...this.query}
            this.$emit('on-filter', {query: allParams})
        },
        clearFilters() {
            this.clearSearchInputs()
        }
    },
    mounted() {
        this.sumFilter = this.sumFiltersQuantity()
    },
})