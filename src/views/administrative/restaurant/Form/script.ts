import { useFormStore } from "@/stores/formStore";
import type { Restaurant } from "@/types/restaurant/restaurant";
import { defineComponent, reactive, ref } from "vue";
import Divider from "primevue/divider";
import useVuelidate from "@vuelidate/core";
import { required } from "@/validators";
import { createRestaurant } from "@/types/restaurant/restaurant.factory";
import formMixins from "@/mixins/formMixins";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import InputFileUpload from "@/components/Inputs/InputFileUpload.vue";
import restaurantService from "@/services/restaurantService";
import { useFormMixin } from "@/stores/useFormMixin";

export default defineComponent({

    components: {
        Divider,
        TabPanel,
        TabView,
        InputFileUpload
    },
    setup(props, ctx) {
        const formStore = useFormStore()
        const form = ref({
            id: null as any,
            name: '',
            corporate_name: '',
            corporate_registration: '',
            description: '',
            address: '',
            number: '',
            phone: '',
            email: '',
            logo: null as any,
            loss_margim: null,
            fix_margim: null,
            variable_margim: null,
            enable_technical_sheet: false,
            is_active: false,
            created_at: ''
        })
        const {
            notify
        } = useFormMixin(restaurantService, form, ctx.emit)
        return {
            formStore,
            v: useVuelidate(),
            form,
            notify
        }
    },
    data() {
        return {
            title: '',
            formPanelIndex: 0
        }
    },
    validations(){
        return {
            form: {
                name: {required},
                address: {required},
                number: {required},
                corporate_name: {required},
                corporate_registration: {required},
                phone: {required}
            }
        }
    },
    computed: {
        dataEdit(): any {
            const itemEdit = this.formStore.getDataEdit()
            if (itemEdit) {
                this.title = itemEdit.name
                this.populateForm()
                return itemEdit
            }
            this.title = 'Adicionar novo restaurante'
            return null
        },
        submitButtonLabel() {
            if (this.formPanelIndex === 0) {
                return "Salvar"
            }
            if (this.formPanelIndex === 1) {
                return "Salvar arquivos"
            }
            if (this.formPanelIndex === 2) {
                return "Salvar"
            }
        }
    },
    methods: {
        populateForm(){
            const itemEdit = this.formStore.getDataEdit()
            this.form.id = itemEdit.id
            this.form.name = itemEdit.name
            this.form.corporate_name = itemEdit.corporate_name
            this.form.address = itemEdit.address
            this.form.number = itemEdit.number
            this.form.corporate_registration = itemEdit.corporate_registration
            this.form.is_active = itemEdit.is_active
            this.form.email = itemEdit.email
            this.form.phone = itemEdit.phone
            this.form.fix_margim = itemEdit.fix_margim
            this.form.loss_margim = itemEdit.loss_margim
            this.form.variable_margim = itemEdit.variable_margim
            this.form.enable_technical_sheet = itemEdit.enable_technical_sheet
        },
        async storeRestaurant() {
            if (this.formPanelIndex === 1) {
                const formData = new FormData
                formData.append('logo', this.form.logo)
                formData.append('id', this.form.id)
                const response = await restaurantService.storeFiles(formData)
                this.notify.success(response.message)
                return
                
            }
            await this.v.$validate()
            await restaurantService.create(this.form)
        },
        loadImage(files: File[]) {
            this.form.logo = files[0]
        },
    }
})