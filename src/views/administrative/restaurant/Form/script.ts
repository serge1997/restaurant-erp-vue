import { useFormStore } from "@/stores/formStore";
import type { Restaurant } from "@/types/restaurant/restaurant";
import { defineComponent, reactive, ref } from "vue";
import Divider from "primevue/divider";
import { required } from "@/validators";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import InputFileUpload from "@/components/Inputs/InputFileUpload.vue";
import restaurantService from "@/services/restaurantService";
import { useFormMixin } from "@/stores/useFormMixin";
import addressService from "@/services/addressService";
import cityService from "@/services/cityService";
import { useStateStore } from "@/stores/stateStore";

export default defineComponent({

    components: {
        Divider,
        TabPanel,
        TabView,
        InputFileUpload
    },
    setup(props, ctx) {
        const stateStore = useStateStore()
        const formStore = useFormStore()
        const form = reactive({
            id: null as any,
            name: '',
            corporate_name: '',
            corporate_registration: '',
            description: '',
            //address: '',
            number: '',
            phone: '',
            email: '',
            logo: null as any,
            loss_margim: null,
            fix_margim: null,
            variable_margim: null,
            enable_technical_sheet: false,
            is_active: false,
            created_at: '',
            address:{
                cep: null,
                street: null,
                number: null,
                neighborhood: null,
                state: null,
                city_id: null,
                complement: null
            }
        })
        const {
            notify,
            onSubmit,
            v
        } = useFormMixin(restaurantService, form, ctx.emit)
        return {
            formStore,
            stateStore,
            v,
            form,
            notify,
            onSubmit
        }
    },
    data() {
        return {
            title: '',
            formPanelIndex: 0,
            options: {
                states: [] as any[],
                cities: [] as any[]
            },
            emptyAddress: {} as any
        }
    },
    validations(){
        return {
            form: {
                name: {required},
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
        async searchAddressByCep(){
            const { data } = await addressService.getByCep(this.form.address.cep || '') as any
            this.form.address.neighborhood = data.bairro
            this.form.address.street = data.logradouro
            this.form.address.state = data.uf
            const {data: cities } = await cityService.getByState(data.uf) as any
            this.options.cities = cities
            const findCity = this.options.cities.find(c => c.name == data.localidade)
            this.form.address.city_id = findCity ? findCity.id : null
        },
        populateForm(){
            const itemEdit = this.formStore.getDataEdit()
            this.form.id = itemEdit.id
            this.form.name = itemEdit.name
            this.form.corporate_name = itemEdit.corporate_name
            this.form.number = itemEdit.number
            this.form.corporate_registration = itemEdit.corporate_registration
            this.form.is_active = itemEdit.is_active
            this.form.email = itemEdit.email
            this.form.phone = itemEdit.phone
            this.form.fix_margim = itemEdit.fix_margim
            this.form.loss_margim = itemEdit.loss_margim
            this.form.variable_margim = itemEdit.variable_margim
            this.form.enable_technical_sheet = itemEdit.enable_technical_sheet
            if(itemEdit.address) {
                this.form.address = itemEdit.address
            }else{
                this.form.address = this.emptyAddress
            }
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
            await this.onSubmit()
        },
        loadImage(files: File[]) {
            this.form.logo = files[0]
        },
    },
    async mounted() {
        this.emptyAddress = this.form.address
        await this.stateStore.loadStates()
        this.options.states = this.stateStore.states
    },
})