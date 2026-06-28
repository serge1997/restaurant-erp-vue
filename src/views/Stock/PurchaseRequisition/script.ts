import { defineComponent } from "vue";
import Form from "./Form/Form.vue";
import { usePageMixin } from "@/stores/usePageMixin";
import purchaseRequisitionService from "@/services/purchaseRequisitionService";
import productService from "@/services/productService";
import columns from "./columns";
import Search from "./Search/Search.vue";
import { unitGramMeasuresOptions, unitMlMeasuresOptions } from "@/types/productCategory/ProductCategory";
import { purchasePriorityOptions } from "@/types/purchaseRequisition/PurchaseRequisition";

export default defineComponent({
    name: "PurchaseRequisitionView",

    components: {
        Form,
        Search
    },

    setup(){
        const {
            data,
            paginate, 
            search,
            onSearch
        } = usePageMixin(purchaseRequisitionService)

        return {
            data,
            paginate, 
            search,
            onSearch
        }
    },

    data(){
        return {
            options: {
                products: [] as Array<any>,
                unitMlMeasure: unitMlMeasuresOptions,
                unitGramMeasures: unitGramMeasuresOptions,
                priorities: purchasePriorityOptions
            },
            store: {
                products: [] as Array<any>
            },
            colums: columns,
            service: purchaseRequisitionService
        }
    },
    methods: {
        async getProducts(event: any = null) {
            if (event?.value) {
                const results = this.store.products?.filter(el => el.name.toLocaleLowerCase().includes(event.value))
                if (!results?.length) {
                    const response = await productService.getAll({search: event.value})
                    this.options.products = response.data
                    this.store.products = response.data
                }
                return
            }
            const response = await productService.getAll({})
            this.options.products = response.data
            this.store.products = response.data
        },
        extractColor(severity: string) {
            return severity.split('-')[1]
        }
    },
    async mounted(){
        await this.getProducts()
        await this.search(this.paginate)
    }
})