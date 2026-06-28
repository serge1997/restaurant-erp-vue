import stockMovmentService from "@/services/stockMovmentService";
import { usePageMixin } from "@/stores/usePageMixin";
import { defineComponent, reactive } from "vue";
import {columns, columnDetails, expandedColumns} from "./columns";
import Form from "./Form/Form.vue"
import purchaseRequisitionService from "@/services/purchaseRequisitionService";
import { stockMovmentTypeOptions } from "@/types/stockMovment/StockMovment";
import Flag from "@/components/Flag/Flag.vue";
import Search from './Search/Search.vue'
import supplierService from "@/services/supplierService";
import productCategoryService from "@/services/productCategoryService";
import { dateEngFormat } from "@/shared/utility";


export default defineComponent({
    name: "StockMovmentView",

    components: {
        Form,
        Flag,
        Search
    },
    setup() {
        const {
            data,
            paginate, 
            search,
            onSearch,
            searchParams
        } = usePageMixin(stockMovmentService)

        const expandSearch = reactive({
            moved_at_from: new Date(),
            moved_at_to: null,
            suppliers: null,
            reference_types: []
        })
        
        return {
            data,
            paginate, 
            search,
            expandSearch,
            searchParams,
            onSearch
        }
    },
    computed:{
        stockMovmentTypeToOptions(){
            const result: {id: number, name: string}[]= [];
            stockMovmentTypeOptions.map(el => {
                result.push({id: el.value, name: el.label})
            })
            return result;
        },
    },
    data(){
        return {
            service: stockMovmentService,
            columns: columns,
            columnDetails: columnDetails,
            expandedColumns: expandedColumns,
            options: {
                purchaseRequests: null as any,
                stockMovmentTypes: stockMovmentTypeOptions,
                suppliers: null as any
            },
            searchOptions: {
                suppliers: [] as any,
                productCategories: [] as any
            },
            expandedTitle: '',
            expandedFilters: {
                created_at_from: new Date(),
                created_at_to: null,
                suppliers: []
            },
            defaultSearchOption: {id: 0, name: "Todos"}
        }
    },
    methods: {
        async onExpandedRow(stockMovment: any) {
            const index = this.data?.findIndex(dt => dt.id == stockMovment.id)
            this.expandedTitle = `Movimentaçao de produto #${stockMovment.product.name}`
            const response = await stockMovmentService.getAll({query: {
                products: [stockMovment.product.id],
                reference_types: this.expandSearch.reference_types ?? [],
                visualization_type: false,
                moved_dateFrom: dateEngFormat(this.expandSearch.moved_at_from),
                moved_dateTo: dateEngFormat(this.expandSearch.moved_at_to),
                suppliers: this.paginate.query?.suppliers?.length ? this.paginate.query?.suppliers : ''
            }})
            if (this.data && (index || index == 0))
                this.data[index].details = response.data
        },
        async getRequisitions() {
            const response = await purchaseRequisitionService.getAll({})
            this.options.purchaseRequests = response.data
        },
        async getSuppliers(){
            const response = await supplierService.getAll({})
            this.options.suppliers = response.data
            this.searchOptions.suppliers = response.data
        },
        async getProductCategories(){
           const response = await productCategoryService.getAll({}) 
           this.searchOptions.productCategories = response.data
        }
    },
    async mounted() {
        await this.getRequisitions()
        await this.getSuppliers()
        await this.getProductCategories()
        this.paginate.query = {...this.paginate.query, visualization_type: true}
        await this.search(this.paginate)
    },
})