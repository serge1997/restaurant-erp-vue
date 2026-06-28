import { defineComponent, reactive, ref } from 'vue';
import { dateEngFormat, removeObjEmptyProp } from '@/shared/utility';
import { purchasePriorityOptions, purchaseRequisitionStatusOptions } from '@/types/purchaseRequisition/PurchaseRequisition';
import { defaultFilter } from '@/shared/utility/utils';
import type { FilterOption } from '@/shared/utility/types/filterOption';
import { getAll as departmentsOptions} from '@/shared/utility/types/departmentEnum';
import { useSearchMixin } from '@/mixins/useSearchMixin';

export default defineComponent({
    name: 'Search',

    components: {
    },
    props: {
      
    },
    setup(props, ctx) {
        const query = reactive({
            priority: 0,
            status: 0,
            createdAt: null,
            createdAtTo: null,
            department: [7],
            deliveredAt: null,
            deliveredAtTo: null
        })
        const filters = reactive<FilterOption[]>([
            {
                label: "Criado em",
                title: "Filtar por data de criaçao",
                selectionLenght: 0,
                slot: "createdAt"
            },
            {
                label: "Entregado em",
                title: "Filtar por data de entrega",
                selectionLenght: 0,
                slot: "deliveredAt"
            },
            {
                label: "Departamento",
                title: "Filtrar por departamento",
                selectionLenght: 0,
                slot: "department"
            }
        ])
        const {
            sumFiltersQuantity,
            incrementFiltersQuantity
        } = useSearchMixin(filters, query, ctx.emit, false)
        return {
            filters,
            query,
            sumFiltersQuantity,
            incrementFiltersQuantity
        }
    },
    watch: {
        query: {
            handler(newVlaue){
                this.incrementFiltersQuantity()
                this.sumFilterMoreFilterSelected = this.sumFiltersQuantity()
            },
            deep: true
        },
    },
    data() {
       return {
        options: {
            priorities: purchasePriorityOptions,
            status: purchaseRequisitionStatusOptions,
            departments: departmentsOptions()
        },
        sumFilterMoreFilterSelected: 0
       }
    },
    methods: {
        onSearch(params: any) {
            const query = JSON.parse(JSON.stringify(this.query))
            const filtered = removeObjEmptyProp(query)
            const allParams = {...params, ...filtered}
            allParams.createdAt = dateEngFormat(allParams.createdAt)
            allParams.createdAtTo = dateEngFormat(allParams.createdAtTo)
            this.$emit('on-filter', {query: allParams})
        }
    },
    mounted() {
        this.incrementFiltersQuantity()
        this.sumFilterMoreFilterSelected = this.sumFiltersQuantity()
        this.options.priorities.unshift(defaultFilter)
        this.options.status.unshift(defaultFilter)
    },
})