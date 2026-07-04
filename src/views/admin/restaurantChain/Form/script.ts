import restaurantChainService from "@/services/restaurantChainService";
import { useFormMixin } from "@/stores/useFormMixin";
import { defineComponent, reactive } from "vue";
import { required } from "@/validators";
import addressService from "@/services/addressService";
import { useStateStore } from "@/stores/stateStore";
import cityService from "@/services/cityService";

export default defineComponent({
    name: 'Form',

    setup(props, ctx) {
        const stateStore = useStateStore()
        const form = reactive({
            id: null,
            name: null,
            corporate_name: null,
            cpf_cnpj: null,
            phone: null,
            comercial_contact: null,
            email: null,
            account_responsable_phone: null,
            account_responsable_email: null,
            account_responsable_name: null,
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
            onSubmit,
            getTitle,
            onClearForm,
            populateForm,
            v
        } = useFormMixin(restaurantChainService, form, ctx.emit)

        return {
            form,
            onSubmit,
            v,
            getTitle,
            onClearForm,
            populateForm,
            stateStore
        }
    },

    data(vm) {
        return{
            options: {
                states: [] as any[],
                cities: [] as any[]
            }
        }
    },

    validations(){
        return {
            form: {
                name: {required},
                corporate_name: {required},
                phone: {required},
                cpf_cnpj: {required},
                account_responsable_name: {required},
                account_responsable_phone: {required}
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
        onStateChange(){
            if(this.form.address.state){
                cityService.getByState(this.form.address.state).then(({data}) => {
                    this.options.cities = data as any[]
                    this.form.address.cep = null
                    this.form.address.neighborhood = null
                    this.form.address.street = null
                    this.form.address.city_id = null
                    this.form.address.complement = null
                    this.form.address.number = null
                })
            }else{
                this.options.cities = []
            }
        },
        onPopulateForm(dataEdit: any = null){
            this.populateForm(dataEdit)
            if(this.form.address.state){
                cityService.getByState(this.form.address.state).then(({data}) => {
                    this.options.cities = data as any[]
                })
            }
        }
    },
    async mounted() {
        await this.stateStore.loadStates()
        this.options.states = this.stateStore.states
    },
})