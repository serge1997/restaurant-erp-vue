import productService from "@/services/productService";
import { usePageMixin } from "@/stores/usePageMixin";
import { defineComponent } from "vue";
import Form from './Form/Form.vue'
import Search from "./Search/Search.vue";
import productCategoryService from "@/services/productCategoryService";
import columns from "./columns";
import type { FormRef } from "@/shared/utility";
import type { FormStore } from "@/shared/utility";
export default defineComponent({
    name: 'ProductView',
    components: {
        Form,
        Search
    },
    setup(){
        const {
            search,
            paginate,
            data,
            onSearch,
        } = usePageMixin(productService)

        return {
            search,
            paginate,
            data,
            onSearch
        }
    },
    data(){
        return {
            options: {
                categories: [] as Array<any>
            },
            columns: columns,
            service: productService,
            formStore: {} as FormStore,
            formRef: {} as FormRef,
        }
    },
    watch: {
        'formStore.isVisible'(newValue) {
            if (newValue === false){
                this.formRef.onClearForm()
            }
        },
    },
    methods: {
        async getProductCategories(){
            const response = await productCategoryService.getAll({})
            this.options.categories = response.data
        },
        setDatEdit(data: any) {
            this.formRef.populateForm(data)
        },
    },
    async mounted(){
        await this.search(this.paginate)
        await this.getProductCategories()
        this.formRef = this.$refs.formRef as FormRef
        this.formStore = this.formRef.formStore
    }
    
})