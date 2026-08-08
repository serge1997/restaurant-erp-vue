import { defineComponent, reactive, type PropType } from "vue";
import { PurchaseRequisitionEnum, type FormOptions, type PurchaseRequisition } from '@/types/purchaseRequisition/PurchaseRequisition.ts'
import { useFormMixin } from "@/stores/useFormMixin";
import purchaseRequisitionService from "@/services/purchaseRequisitionService";
import Divider from "primevue/divider";
import { DepartmentEnum, getAll as getPartments } from "@/shared/utility/types/departmentEnum";
import { dateEngFormat } from "@/shared/utility";
import { required } from "@/validators";
import Tag from "primevue/tag";
import { approveOptions, getRequisitionStatus, purchasePriorityOptions } from "@/types/purchaseRequisition/PurchaseRequisition.ts";
import TieredMenu from "primevue/tieredmenu";
import { disabledOnSelect } from "@/types/purchaseRequisition/PurchaseRequisition.ts";

interface ItemList {
    id?: null,
    product_id: null,
    ordered_quantity: 0,
    unit_size: 0,
    unit_of_measure: null
}
export default defineComponent({
    name: "Form",

    components: {
        Divider,
        Tag,
        TieredMenu
    },
    props: {
        options: {
            type: Object as PropType<FormOptions>,
        }
    },

    setup(props, {emit}){
        const form = reactive({
            id: 0,
            code: '',
            department_id: DepartmentEnum.ALL,
            expected_delivery_date: '',
            observation: null,
            status: null as any,
            priority: 0,
            items: [] as Array<{
                id?: null,
                product_id: null,
                ordered_quantity: null,
                unit_size: null,
                unit_of_measure: null
            }>
        })
        const departments = getPartments()
        const {
            onClearForm,
            onSubmit,
            v,
            formStore,
            notify,
        } = useFormMixin(purchaseRequisitionService, form, emit)
        return {
            onClearForm,
            onSubmit,
            notify,
            v,
            formStore,
            form,
            departments
        }
    },
    watch: {
        'formStore.isVisible'(newValue: any) {
            const itemsEdit = this.formStore.getDataEdit()
            if (itemsEdit?.id && newValue === true){
                this.form.status = null
                this.form.items = []
                this.form.id = itemsEdit.id
                this.form.observation = itemsEdit.observation
                this.form.department_id = itemsEdit.department.value
                this.expected_delivery_date = itemsEdit.expected_delivery_date?.formatted
                this.form.expected_delivery_date = itemsEdit.expected_delivery_date?.original
                this.form.status = itemsEdit.status
                this.form.code = itemsEdit.code
                this.items = itemsEdit.items
                this.form.priority = itemsEdit.priority.value
                this.populateRequisitionItems(itemsEdit.items)
            }
            
         },
    },
    data(){
        return {
            items: [] as Array<any>,
            expected_delivery_date: null,
            current_product: null as any,
            formItem: {
                id: null as any,
                product: null,
                product_id: null as any,
                ordered_quantity: null as any,
                unit_size: null as any,
                unit_of_measure: null as any
            },
            statusOptions: approveOptions,
            tiredMenuItems: [
                {
                    label: 'Baixar PDF',
                    icon: 'pi pi-file-pdf',
                    actions: this.downloadPdf
                },
                {
                    label: 'Alterar status',
                    icon: 'pi pi-pencil',
                    disabled_on_completed: true,
                    items: [
                        {
                            label: 'Rejeitar',
                            icon: 'pi pi-times text-danger',
                            disabled_on_completed: true,
                            attach_status: true,
                            value: 5,
                            actions: () => null,
                        },
                        {
                            label: 'Aprovar',
                            icon: 'pi pi-check text-success',
                            disabled_on_completed: true,
                            attach_status: true,
                            value: 2,
                            actions: () => null,

                        },
                        {
                            label: 'Concluir',
                            icon: 'pi pi-lock text-warning',
                            disabled_on_completed: true,
                            attach_status: true,
                            value: 4,
                            actions: () => null,
                        }
                    ]
                },
                {
                    label: 'Aprovar',
                    icon: 'pi pi-check text-success',
                    disabled_on_completed: true,
                    attach_status: true,
                    actions: () => null,
                    value: 2,
                },
                {
                    label: 'Remover',
                    icon: 'pi pi-times text-danger',
                    disabled_on_completed: true,
                    actions: () => null,
                }
            ]
        }
    },
    computed: {
        getTitle() {
            if (this.form.id) {
                return `Requisiçao de compra`
            }
            return "Adicionar nova requisiçao de compra"
        },
        disableSaveBtn(){
            if (this.form.id) {
                return !this.form.status.can_edit
            }
            return false;
        },
        getVolumeOfProduct() {
            if (this.current_product?.category?.unit_measure?.label == "Ml") {
                return this.options?.unitMlMeasure
            }
            if (this.current_product?.category?.unit_measure?.label == "G") {
                return this.options?.unitGramMeasures
            }
            return []
        },
        isCompleted(){
            if (this.form.id){
                return this.form.status.value === PurchaseRequisitionEnum.COMPLETED
            }
            return false
        },
        extractColor() {
            return this.form.status.severity.split('-')[1]
        },
        isAproved(){
            if (this.form.id){
                return this.form.status.value === PurchaseRequisitionEnum.APPROVED
            }
            return false
        },
    },
    validations(){
        return {
            formItem: {
                product_id: {required},
                ordered_quantity: {required},
                unit_size: {required}
            }
        }
    },
    methods: {
        async downloadPdf(){
            const name = `requisicao${this.form.code}`
            await purchaseRequisitionService.pdf(this.form.id, name)
        },
        hasUnitVolume(){
            return this.current_product?.category?.unit_measure?.label == "Ml" || this.current_product?.category?.unit_measure?.label == "G"
        },
        selectItemToEdit(index: number){
            const item = this.form.items[index]
            this.formItem.id = item?.id
            this.formItem.product_id = item?.product_id
            this.formItem.ordered_quantity = item?.ordered_quantity
            this.formItem.unit_of_measure = item?.unit_of_measure
            this.formItem.unit_size = item?.unit_size || 1
        },
        populateRequisitionItems(items: Array<any>) {
            items.forEach(item => {
                this.form.items.push({
                    id: item.id,
                    product_id: item.product.id,
                    ordered_quantity: item.ordered_quantity,
                    unit_size: item.unit_size,
                    unit_of_measure: item.unit_of_measure
                })
            })
        },
        AddItems() {
            this.v.$touch()
            if (!this.v.$invalid){
                const has = this.form.items?.find((p: any) => p.product_id == this.formItem.product_id)
                if (has) {
                    if (has.id && this.form.id){
                        const index = this.form.items.findIndex(el => has.product_id == el.product_id)
                        if (!this.form.items[index]){
                            this.notify.warn("Produto nao encontrado.")
                            return
                        }
                        this.form.items[index].ordered_quantity = this.formItem.ordered_quantity
                        this.form.items[index].unit_of_measure = this.formItem.unit_of_measure
                        this.items[index].ordered_quantity = this.formItem.ordered_quantity
                        this.items[index].unit_of_measure = this.formItem.unit_of_measure
                        return
                    }
                    this.notify.warn("Produto já foi adicionado.")
                    return
                }
                this.form.items.push({
                    product_id: this.formItem.product_id,
                    ordered_quantity: this.formItem.ordered_quantity,
                    unit_size: this.formItem.unit_size,
                    unit_of_measure: this.formItem.unit_of_measure
                })
                const product = this.options?.products.find(p => p.id == this.formItem.product_id)
                this.items.push({
                    name: product?.name,
                    product_id: this.formItem.product_id,
                    ordered_quantity: this.formItem.ordered_quantity,
                    unit_size: this.formItem.unit_size,
                    unit_of_measure: this.formItem.unit_of_measure
                })
                this.formItem.product_id = null
                this.formItem.ordered_quantity = null
                this.formItem.unit_size = null
                this.formItem.unit_of_measure = ''
                this.v.$reset()
            }
        },
        removeItem(index: number) {
            this.form.items.splice(index, 1)
            this.items.splice(index, 1)
        },
        clearForm() {
            this.items = []
            this.formItem.product_id = 0
            this.formItem.ordered_quantity = 0
            this.formItem.unit_size = 0
            this.formItem.unit_of_measure = ''
            this.onClearForm()
        },
        getUnitMeasureLabel(unit_of_measure: string) {
            if (unit_of_measure.toLocaleLowerCase() == "unit" || unit_of_measure.toLocaleLowerCase() == "ml") return "Unidade(s)"
            if (unit_of_measure.toLocaleLowerCase() == "g") return "G"
            if (unit_of_measure.toLocaleLowerCase() == "kg") return "Kg"
        },
        onSelectUnitMeasure(event: any){
            if (this.current_product.category.unit_measure.label == "Ml") {
                this.formItem.unit_of_measure = "Ml"
            }else{
                const currentUnitVolume = this.getVolumeOfProduct?.find(v => v.value == event.value)
                const unitMeasure = currentUnitVolume.label.split(' ')
                this.formItem.unit_of_measure = unitMeasure[1].toUpperCase()
            }
        },
        onSelectProduct(event: any){
            const product = this.options?.products.find(product => product.id === event.value)
            this.current_product = product
            this.formItem.product = product
            if (product.category.unit_measure.label == "Un") {
                this.formItem.unit_size = 1
                this.formItem.unit_of_measure = "UNIT"
            }
        },
        async onStore(){
            const toFormat = this.form.expected_delivery_date ? this.form.expected_delivery_date : this.expected_delivery_date;
            this.form.expected_delivery_date = dateEngFormat(toFormat) ?? null
            if (this.items.length) {
                this.formItem.product_id = 9999;
                this.formItem.ordered_quantity = 9999
                this.formItem.unit_size = 0
                this.formItem.unit_of_measure = 'G'
            }
            await this.onSubmit()
            this.form.items = []
        },
        populateItem(){

        },
        async attacheStatus(status: number) {
            const response = await purchaseRequisitionService.attacheStatus(this.form.id, status)
            this.form.status = getRequisitionStatus(status as PurchaseRequisitionEnum)
            this.notify.success(response.message)
            this.$emit('submitted')
        },
        transformOrderedQuantity(item: ItemList) {
            if (item.unit_of_measure == "G") {
                return item.ordered_quantity * item.unit_size
            }
            return item.ordered_quantity
        }
    },
    mounted(){
        
    }
})