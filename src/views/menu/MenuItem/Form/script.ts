import { defineComponent, reactive, type PropType } from "vue";
import menuItemService from "@/services/menuItemService";
import { useFormMixin } from "@/stores/useFormMixin";
import InputNumber from "primevue/inputnumber";
import InputFileUpload from "@/components/Inputs/InputFileUpload.vue";
import Divider from "primevue/divider";
import { required } from "@/validators";
import { FeaturedMenuItemEnum, type FormOptions } from "@/types/menuItem/MenuItem";
import { TechnicalSheet, type TechnicalSheetProps, type FormOptions as TechnicalSheetFormOptions } from "@/types/TechnicalSheet/TechnicalSheet";
import Dialog from "primevue/dialog";
import TechnicalSheetForm  from "../../TechnicalSheet/Form/Form.vue";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import CardMultipleOptions from "@/components/Selects/CardMultipleOptions.vue";
import AutoComplete from "primevue/autocomplete";
import productService from "@/services/productService";
import Tag from "primevue/tag";
import { removeNumberLabels } from "@/shared/utility/utils";
import { sheetColumns } from "../columns";
interface SheetDataProps {
    id?: number,
    product: {id: number},
    quantity: number
}
export default defineComponent({
    name: "Form",

    components: {
        InputNumber,
        InputFileUpload,
        Divider,
        Dialog,
        TechnicalSheetForm,
        TabView,
        TabPanel,
        CardMultipleOptions,
        AutoComplete,
        Tag
    },
    props: {
        options: Object as PropType<FormOptions>,
        sheetOptions: Object as PropType<TechnicalSheetFormOptions>
    },
    watch: {
        'formStore.isVisible'(newValue: any) {
            const itemsEdit = this.formStore.getDataEdit()
            if (itemsEdit?.id && newValue === true){
                this.form.id = itemsEdit.id
                this.form.name = itemsEdit.name;
                this.form.image = itemsEdit.image
                this.form.description = itemsEdit.description;
                this.form.code = itemsEdit.code;
                this.form.category_id = itemsEdit.category.id;
                this.form.price = itemsEdit.price.value;
                this.form.description = itemsEdit.description;
                this.form.enable_technical_sheet = itemsEdit.enable_technical_sheet.value
                this.form.cooking_time = itemsEdit.cooking_time ? new Date(`1997-04-12 ${itemsEdit.cooking_time}:00`) : null
                this.form.for_quantity_of_person = itemsEdit.for_quantity_of_person
                this.form.featured_types = itemsEdit.featured_types
                this.form.promotional_price = itemsEdit.promotional_price
                this.form.category = itemsEdit.category
                this.processSheet()
                
            }
        },
    },

    computed: {
        title(){
            if (this.form.id) {
                return `${this.getTitle()}#${this.form.code}`
            }
            return this.getTitle()
        },
        getItemEdit(){
            return this.formStore.getDataEdit()
        },
        hasTechnicalsheet() {
            return this.getItemEdit?.technicalSheet
        },
        isActiveIconClass(){
            if (this.form.is_active) {
                return `c-green-secondary`
            }
            return `c-amber`
        },
        isActiveLabel() {
            if (this.form.is_active) {
                return 'Ativo - Visivel no cardapio'
            }
            return `Inativo - Oculto no cardapio`
        },
        hasPromotionalSelected(){
            return this.form.featured_types?.includes(FeaturedMenuItemEnum.PROMOTION)
        },
        getItemFeatureLabels() {
            const labels: string[] = []
            this.options?.featureMenuitems.map(l => {
                if (this.form.featured_types?.includes(l.id)) {
                    labels.push(l.name)
                }
            })
            return labels
        }
    },

    setup(props, { emit }) {
        const form = reactive({
            id: null,
            code: null,
            name: '',
            description: '',
            image: null as any,
            price: null,
            category_id: null,
            is_active: true,
            enable_technical_sheet: false,
            featured_types: [] as number[],
            sheet: [],
            for_quantity_of_person: null,
            promotional_price: null,
            cooking_time: null as any,
            category: {} as any

        })
        const {
            onClearForm,
            v,
            formStore,
            notify,
            getTitle,
            isDisableSaveBtn
        } = useFormMixin(menuItemService, form, emit)
        return {
            onClearForm,
            notify,
            v,
            formStore,
            form,
            getTitle,
            isDisableSaveBtn
        }
    },
    data(){
        return {
            visibleTechnicalSheetModal: false,
            visibleShowTechnicalsheetModal: false,
            sheetDetails: {
                totalCost: '' as any,
                marge: '' as any,
                items: [] as any[]
            },
            products: [] as any[],
            sheetData: [] as any[],
            sheetColumns: sheetColumns
        }
    },
    validations(){
        return {
            form: {
                name: { required },
                description: { required },
                price: { required },
                category_id: { required }
            }
        }
    },

    methods: {
        loadImage(files: File[]) {
            this.form.image = files[0]
        },
        clearForm() {
            this.onClearForm()
            this.sheetDetails = {
                totalCost: '' as any,
                marge: '' as any,
                items: [] as any[]
            },
            this.sheetData = []
        },
        removeProductFromSheet(index: number) {
            this.sheetData.splice(index, 1)
            this.sheetDetails.items.splice(index, 1)
            if (index >= 0){
                this.onInputSheetProductQuantity(index-1)
            }
        },
        async onSubmit() {
            try{
             
                const fd = new FormData()
                this.v.$touch()

                if (this.v.$invalid) {
                    throw new Error("Dados do formulario invalidos")
                }
                const cookingTime = this.form.cooking_time ? `${this.form.cooking_time?.getHours()}:${this.form.cooking_time?.getMinutes()}:00` : null
                fd.append('name', this.form.name)
                fd.append('description', this.form.description)
                fd.append('price', String(this.form.price))
                fd.append('category_id', String(this.form.category_id))
                fd.append('is_active', String(this.form.is_active))
                fd.append('enable_technical_sheet', String(this.form.enable_technical_sheet))
                fd.append('featured_types', this.form.featured_types?.length ? this.form.featured_types.join(',') : '')
                fd.append('for_quantity_of_person', this.form.for_quantity_of_person ? this.form.for_quantity_of_person : '')
                fd.append("promotional_price", this.form.promotional_price ? this.form.promotional_price : '')
                fd.append('cooking_time', cookingTime || '')
                this.sheetData.forEach((obj, index) => {
                  fd.append(`sheet[${index}][product_id]`, obj.product.id || '')
                  const quantity = removeNumberLabels(String(obj.quantity)) || ''
                  fd.append(`sheet[${index}][quantity]`,  String(quantity))
                  fd.append(`sheet[${index}][id]`, obj.id || '')
                })
                if(this.form.image && this.form.image instanceof File) {
                    fd.append('image', this.form.image)
                }
                let path: string | undefined = undefined
                if (this.form.id) {
                    fd.append('id', String(this.form.id))
                    path = `${menuItemService.modulePath}/${this.form.id}`
                }
                const request = await menuItemService.create(fd, path)
                this.notify.success(request.message)
                this.formStore.isVisible = false;
                this.onClearForm()
                this.$emit('submitted')
            }catch(err: any){
                console.log(err.message)
                this.notify.error(err.response?.data?.message || "erro interno")
            }
        },
        openTechnicalSheetModal(){
            this.visibleTechnicalSheetModal = true
        },
        openShowTechnicalsheetModal(){
            this.visibleShowTechnicalsheetModal = true
            this.processSheet()
        },
        processSheet() {
            this.sheetDetails.items = []
            const sheets: TechnicalSheet[] = []
            if (this.getItemEdit && this.getItemEdit!.technicalSheet){
                this.getItemEdit!.technicalSheet.map((itemSheet: any) => {
                    const {product, quantity, id} = itemSheet
                    const sheet = TechnicalSheet.create({
                        product: product, 
                        quantity: quantity,
                        unit_size: product?.unit_contain || null,
                        cost: itemSheet.product?.cost?.value || 0,
                        unit_of_measure: product.category.unit_measure.label
                    } as TechnicalSheetProps)
                    sheets.push(sheet)
                    this.sheetDetails.items.push({
                        id: id,
                        product: product,
                        quantity: Number(quantity) + ` ${sheet.getProductQuantityLabel()}`,
                        cost: sheet.computeQuantityCost()
                    })
                    this.sheetData.push({
                        id: id || null,
                        product: product,
                        quantity: quantity + ` ${sheet.getProductQuantityLabel()}`,
                        menu_item_id: itemSheet.menu_item.id
                    });
                    this.products.push(product)
                    const totalCost = TechnicalSheet.costSum(sheets)
                    const marge = TechnicalSheet.computeSellMarge(totalCost, this.getItemEdit)
                    this.sheetDetails.totalCost = totalCost.toFixed(2)
                    this.sheetDetails.marge = marge.toFixed(2)
                })
            }
        },
        addItemToSheet(){
            this.sheetDetails.items.push({
                id: null,
                product: null,
                quantity: null,
                cost: null
            })
            this.sheetData.push({
                id: null,
                product: null,
                quantity: null,
                menu_item_id: null
            });
        },
        onInputSheetProductQuantity(index: number) {
            const sheets: TechnicalSheet[] = []
            const {product, quantity} = this.sheetData[index]
            const cleanedQuantity = quantity.replaceAll(/\D/g, "") || 0
            const sheet = TechnicalSheet.create({
                product: product, 
                quantity: Number(cleanedQuantity),
                unit_size: product?.unit_contain || null,
                cost: product?.cost?.value || 0,
                unit_of_measure: product.category.unit_measure.label
            } as TechnicalSheetProps)
            sheets.push(sheet)
            this.sheetData[index].quantity = 0
            this.sheetDetails.items[index].cost = sheet.computeQuantityCost()
            this.sheetData[index].quantity = Number(cleanedQuantity) + ` ${sheet.getProductQuantityLabel()}`
            let accTotalCost = 0
            this.sheetDetails.totalCost = 0
            this.sheetDetails.items.map(sheet => {
                const cleaneddCost = sheet.cost.replaceAll(/[R$]/g, "")
                accTotalCost += Number(cleaneddCost)
            })
            this.sheetDetails.totalCost = accTotalCost.toFixed(2)
            const marge = TechnicalSheet.computeSellMarge(accTotalCost, this.getItemEdit)
            this.sheetDetails.marge = marge
        },
        async productsAutocomplete(event: any) {
            const products = await productService.getAll({search: event.query})
            this.products = products.data
            
        }
    },
    mounted(){
    }
})