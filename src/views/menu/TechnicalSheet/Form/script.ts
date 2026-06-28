import InputNumber from "primevue/inputnumber";
import { defineComponent, reactive, type PropType } from "vue";
import columns from "./columns";
import { TechnicalSheet, type FormOptions, type TechnicalSheetProps } from "@/types/TechnicalSheet/TechnicalSheet";
import productService from "@/services/productService";
import type { ProductProps } from "@/types/products/Product";
import { useFormMixin } from "@/stores/useFormMixin";
import technicalSheetService from "@/services/technicalSheetService";
import purchaseRequisitionItemService from "@/services/purchaseRequisitionItemService";
import type { MenuItemProps } from "@/types/menuItem/MenuItem";

export default defineComponent({
    name: "Form",

    components: {
        InputNumber
    },
    setup(props, { emit }) {
        const form = reactive({
            id: 0,
            menu_item_id: 0,
            products: [] as Array<{product_id: null, quantity: null, menu_item_id?: number, id?: number}>
        })
        const {
            onSubmit,
            onClearForm
        } = useFormMixin(technicalSheetService, form, emit)

        return {
            form,
            onSubmit,
            onClearForm
        }
    },

    props: {
        options: {
            type: Object as PropType<FormOptions>
        },
        currentmenuItem: Number,
        menuItem: Object as PropType<MenuItemProps>
    },
    computed: {
        getcurrentmenuItem() {
            this.form.menu_item_id = this.currentmenuItem || 0
            return this.currentmenuItem || 0
        },
        isUpdate() {
            return this.sheetdDetail.find(el => el?.id && el?.id >= 1)
        }
    },

    data() {
        return {
            columns: columns,
            products: [] as Array<ProductProps>,
            product: {
                product_id: null,
                quantity: null as any,
                unit_measure_label: '' as any
            },
            sheetdDetail: [] as Array<any>,
            customValidation: {
                $dirty: false,
                quantity: {
                    $dirty: false,
                    $error: "Quantidade é obrigatorio"
                },
                product_id: {
                    $dirty: false,
                    $error: "Produto é obrigatorio"
                }
            }
        }
    },
    methods: {
        async getProducts(){
            const response = await productService.getAll<ProductProps>({limit: 80})
            this.products = response.data
        },
        async addtoSheet(){
            this.triggerCustomValidation()
            if (this.customValidation.$dirty) {
                return
            }
            const hasItemIndex = this.sheetdDetail.findIndex(item => item.product.id == this.product.product_id)
            if (hasItemIndex >= 0) {
                const sheet = TechnicalSheet.create({
                    product: this.sheetdDetail[hasItemIndex].product, 
                    quantity: this.product.quantity,
                    unit_size: this.sheetdDetail[hasItemIndex].product.unit_contain || null,
                    cost: this.sheetdDetail[hasItemIndex].product.cost?.value || null
                } as TechnicalSheetProps)
                this.sheetdDetail[hasItemIndex].quantity =  this.product.quantity + ` ${sheet.getProductQuantityLabel()}`
                this.sheetdDetail[hasItemIndex].cost = sheet.computeQuantityCost()
            }else{
                const product = this.products.find(prod => prod.id == this.product.product_id)
                const lastDeliveryDetails = await purchaseRequisitionItemService.getLastDeliveryOfProduct(product?.id || 0)
                const sheet = TechnicalSheet.create({
                    product: product, 
                    quantity: this.product.quantity,
                    unit_size: lastDeliveryDetails.data?.unit_size || null,
                    cost: lastDeliveryDetails.data?.cost || null
                } as TechnicalSheetProps)
                this.sheetdDetail.push({
                    product: product,
                    quantity: this.product.quantity + ` ${sheet.getProductQuantityLabel()}`,
                    cost: sheet.computeQuantityCost()
                })
            }
            this.product.product_id = null;
            this.product.quantity = 0
        },
        onSelectMenuItem(){
            this.product.product_id = null;
            this.product.quantity = null
            this.sheetdDetail = []
        },
        onSelectProduct(event: any) {
            const product = this.products.find(prod => prod.id == event.value)
            this.product.unit_measure_label = (product?.category?.unit_measure as any).sheet
        },
        removeProductFromSheet(data: any) {
            const product: ProductProps = data.product
            const index = this.sheetdDetail.findIndex(el => el.product.id == product.id)
            this.sheetdDetail.splice(index, 1)
        },
        triggerCustomValidation(property?: "product_id" | "quantity"){
            if (property){
                !this.product[property] ? this.customValidation[property].$dirty = true : this.customValidation[property].$dirty = false
            }else{
                !this.product.product_id ? this.customValidation.product_id.$dirty = true : this.customValidation.product_id.$dirty = false
                !this.product.quantity ? this.customValidation.quantity.$dirty = true : this.customValidation.quantity.$dirty = false
                !this.product.quantity || !this.product.product_id ? this.customValidation.$dirty = true : this.customValidation.$dirty = false
            }
            
        },
        async onStore(){
            this.sheetdDetail.map(detail => {
                this.form.products.push({
                    id: detail.id,
                    product_id: detail.product.id,
                    quantity: detail.quantity.replaceAll(/unidade|g|ml|\s/g, ''),
                    menu_item_id: this.getcurrentmenuItem
                })
            })
            await this.onSubmit()
            this.$emit("close-modal")
        },
        async getMenuItemSheet() {
            //const response = await technicalSheetService.getBymenuItem(this.getcurrentmenuItem)
            this.form.id = this.menuItem?.id || 0
            if (this.menuItem && this.menuItem!.technicalSheet){
                this.menuItem!.technicalSheet.map(itemSheet => {
                    const {product, quantity, id} = itemSheet
                    const sheet = TechnicalSheet.create({
                        product: product, 
                        quantity: quantity,
                        unit_size: product?.unit_contain || null,
                        cost: itemSheet.product?.cost?.value || 0,
                        unit_of_measure: product.category.unit_measure.label
                    } as TechnicalSheetProps)
                    this.sheetdDetail.push({
                        id: id,
                        product: product,
                        quantity: quantity + ` ${sheet.getProductQuantityLabel()}`,
                        cost: sheet.computeQuantityCost()
                    })
                })
            }
           
        },
        addSheetProductToEdit(sheet: any) {
            const unit_measure = sheet.quantity.split(' ')
            this.product.product_id = sheet.product.id
            this.product.quantity = sheet.quantity.replaceAll(/unidade|g|ml|\s/g, '')
            this.product.unit_measure_label = unit_measure[1]
        }
    },
    async mounted() {
        await this.getProducts()
        await this.getMenuItemSheet()
        
    },

})