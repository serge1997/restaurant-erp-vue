import productService from "@/services/productService";
import { useFormMixin } from "@/stores/useFormMixin";
import { ProductCategory } from "@/types/productCategory/ProductCategory";
import { required } from "@/validators";
import { defineComponent, reactive, type PropType } from "vue";
import { unitMlMeasuresOptions } from "@/types/productCategory/ProductCategory";

interface FormOptions {
    categories: Array<any>
}
export default defineComponent({
    name: 'Form',
    setup(props, {emit}){
        const form = reactive({
            id: null,
            name: null,
            description: null,
            category_id: null,
            unit_contain: null as any,
            min_quantity: null,
            restaurant_id: null,
            sku: null,
            loss_percentage: null,
            is_active: true
        })
        const {
            onSubmit,
            onClearForm,
            populateForm,
            formStore,
            getTitle,
            v
        } = useFormMixin(productService, form, emit)

        return {
            formStore,
            form,
            onSubmit,
            onClearForm,
            populateForm,
            getTitle,
            v
        }
    },
    props: {
        options: {
            type: Object as PropType<FormOptions>,
            required: true
        },
        dataGrid: Object
    },
    data(){
        return {
            measureUnitLabel: '',
            currentCategory: '',
            unitMlMeasureOptions: unitMlMeasuresOptions,
            category: null as any as ProductCategory
        }
    },
    validations(){
        return {
            form: {
                name: {required},
                category_id: {required},
                unit_contain: {required}
            }
        }
    },
    methods: {
        async onStoreProduct() {
            await this.onSubmit()
            this.$emit('update-dataTable')
        },
        onSelectCategory(event: any){
            const find = this.options.categories.find(cat => cat.id == event.value)
            const category = ProductCategory.create(find)
            this.category = category
            this.currentCategory = find.unit_measure
            if (!this.category.isMl()){
                this.form.unit_contain = this.category.isGram() ? "1 KG" : "1 unidade"
            }
        }
    },
    mounted(){
    }
})