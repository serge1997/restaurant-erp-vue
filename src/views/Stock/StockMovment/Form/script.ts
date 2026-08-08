import purchaseRequisitionService from "@/services/purchaseRequisitionService";
import stockMovmentService from "@/services/stockMovmentService";
import { useFormMixin } from "@/stores/useFormMixin";
import { IN_MOVS, OUT_MOVS, StockMovmentTypeEnum, stockMovmentTypeOptions, type FormOptions } from "@/types/stockMovment/StockMovment";
import { defineComponent, reactive, type PropType } from "vue";
import { getProductRequestUnitMeasureLabel } from "@/types/purchaseRequisition/PurchaseRequisition";
import { columnDetails } from "../columns";
import { required } from "@/validators";
import InputNumber from "primevue/inputnumber";
import productService from "@/services/productService";
import { disabledOnSelect, getRequisitionStatus } from "@/types/purchaseRequisition/PurchaseRequisition";
import { dateEngFormat } from "@/shared/utility";
import { requiredIf } from "@vuelidate/validators";

export default defineComponent({
    name: "Form",

    components: {
        InputNumber
    },
    props: {
        options: {
            type: Object as PropType<FormOptions>,
            required: true
        },
    },
    setup(props, {emit}){
        const form = reactive({
            id: 0,
            reference_id: null,
            reference_type: 0,
            product_id: null,
            supplier_id: null,
            quantity: 0,
            cost: 0,
            description: null,
            moved_at: '',
            moved_at_date: new Date()
        })
                
        const {
            onClearForm,
            onSubmit,
            v,
            formStore,
            notify,
            getTitle
        } = useFormMixin(stockMovmentService, form, emit)
        return {
            form,
            onClearForm,
            onSubmit,
            v,
            formStore,
            notify,
            getTitle,
            getRequisitionStatus
        }
    },
    data(){
        return {
            purchaseRequest: [] as any,
            currentProduct: null as any,
            columnDetails: columnDetails,
            purchaseDetails: [] as any,
            showDetailButtonIcon: "pi-chevron-down",
            formTitleiconClass: null as any,
            lastProductMovment: null as any,
            disabledRequistionStatusOnSelect: disabledOnSelect
        }
    },
    validations(){
        return {
            form: {
                reference_id: {required: requiredIf(() => this.form.reference_type == StockMovmentTypeEnum.PURCHASE)},
                reference_type: {required},
                quantity: {required},
                product_id: {required},
                cost: { required: requiredIf(() => this.form.reference_type == StockMovmentTypeEnum.PURCHASE)}
            }
        }
    },
    computed: {
        movmentTypeIsPurchase() {
            return [StockMovmentTypeEnum.DEVOLUTION_SUPPLIER, StockMovmentTypeEnum.PURCHASE].includes(Number(this.form.reference_type)) && this.form.reference_id != null;
        },
        getStockMovmentRefTypeLabel(){
            return stockMovmentTypeOptions.find(ref => ref.value == this.form.reference_type)
        },
        isManualMovement(){
            return this.form.reference_type != StockMovmentTypeEnum.PURCHASE
        },
        getSaveBtnLabel(){
            if (!this.form.reference_type){
                return 'Salvar'
            }
            return `Salvar ${stockMovmentTypeOptions.find(ref => ref.value == this.form.reference_type)?.label}`
        },
        getProductNewStock() {
            if(this.lastProductMovment && this.form.quantity){
                return this.isMovOut ? Number(this.lastProductMovment.current_stock.value) - Number(this.form.quantity)
                : Number(this.lastProductMovment.current_stock.value) + Number(this.form.quantity)
            }
            if (this.lastProductMovment && !this.form.quantity){
                return Number(this.lastProductMovment.current_stock.value)
            }
            return null
        },
        isMovIn(){
            return IN_MOVS.includes(this.form.reference_type)
        },
        isMovOut(){
            return OUT_MOVS.includes(this.form.reference_type)
        },
        currentProductUnitMeasureIsML(){
            if (this.currentProduct){
                return this.currentProduct?.unit_of_measure.value == 'ML'
            }
            return this.lastProductMovment ? this.lastProductMovment.product?.db_unit_size_label.toLowerCase() == 'ml' : false
        },
        showQuantityAlert(){
            if (this.currentProduct){
                return this.currentProduct?.unit_of_measure.value == 'ML' || this.currentProduct?.unit_of_measure.value == 'G'
            }
            if(this.lastProductMovment){
                return this.lastProductMovment.product?.db_unit_size_label.toLowerCase() == 'ml' || this.lastProductMovment.product?.db_unit_size_label.toLowerCase() == 'g'
            }
            const product = this.findProduct(this.form.product_id || 0)
            if (product){
                return product?.category.unit_measure.sheet == 'g' || product?.category.unit_measure.sheet == 'ml'
            }
            return false
        }
    },
    methods: {
        async selectRef(ref: number){
            if (ref == StockMovmentTypeEnum.DEVOLUTION_SALE){
                this.$router.push({name: 'orders'})
                return
            }
            this.form.reference_type = ref
            await this.getProducts({})
        },
        findProduct(id: number){
            return this.options.products?.find((product: any) => product.id == id)
        },
        selectedRefTypeClass(ref_type: number){
            if (this.form.reference_type == ref_type && OUT_MOVS.includes(ref_type)){
                this.formTitleiconClass = 'active-on-out'
                return 'on-out'
            }
            if(this.form.reference_type == ref_type && IN_MOVS.includes(ref_type)){
                this.formTitleiconClass = 'active-on-in'
                return 'on-in'
            }
            return ''
        },
        async getProducts(event: any) {
            //check if reference is rejected
            if (this.form.reference_id && this.form.reference_type){
                const reference = this.options.purchaseRequests.find(p => p.id == event.value)
                if (disabledOnSelect(reference.status.value)) {
                    this.form.reference_id = null
                    this.notify.error("Nao é possivel realizar uma entrada de estoque com uma requisiçao rejeitada.")
                    return
                }
            }
            if (!this.isManualMovement && this.form.reference_id){
                const request = await purchaseRequisitionService.getUndeliveredProducts(event.value)
                const requestPurchase = await purchaseRequisitionService.getOne(event.value)
                this.purchaseRequest = requestPurchase.data
                this.options.products = request.data 
                this.purchaseDetails = this.purchaseRequest.items
                return
            }
            const productRequest = await productService.getAll({})
            this.options.products = productRequest.data
        },
        async getPurchaseRequisition(event: any) {
            if (this.isManualMovement){
                const request = await stockMovmentService.getLastByProduct(event.value)
                this.lastProductMovment = await request.data
            }
            this.currentProduct = this.purchaseRequest?.items?.find((item: any) => item.product.id == event.value)
        },
        productRequestUnitMeasureLabel(unit_of_measure: any) {
            if (!unit_of_measure) return ''
            return getProductRequestUnitMeasureLabel(unit_of_measure)
        },
        togglePurchaseDetailBox(){
            document.querySelector(".show-purchase-detail-box")?.classList.toggle("d-none")
            this.showDetailButtonIcon = this.showDetailButtonIcon.includes("down") ? "pi-chevron-up" : "pi-chevron-down"
        },
        async onStore(){
            this.form.quantity = Number(this.form.quantity)
            this.form.moved_at = dateEngFormat(this.form.moved_at_date) || ''
            await this.onSubmit()
            this.$emit('submitted')
        },
        clearForm(){
            this.currentProduct = null
            this.onClearForm()
        }
    }
})