import restaurantChainService from "@/services/restaurantChainService";
import { useFormMixin } from "@/stores/useFormMixin";
import { defineComponent, reactive } from "vue";
import { required } from "@/validators";
import Slider from "primevue/slider";
import ScrollPanel from "primevue/scrollpanel";
import CardMultipleOptions from "@/components/Selects/CardMultipleOptions.vue";
import { isEmpty, validateAddress } from "@/shared/utility/utils";
import { useStateStore } from "@/stores/stateStore";

export default defineComponent({
    name: 'registerView',

    components: {
        Slider,
        ScrollPanel,
        CardMultipleOptions
    },

    setup(props, ctx) {
        const stateStore = useStateStore()

        const options = {
            states: [] as any[],
            cities: [] as any[],
            accountCities: [] as any[],
            optionMultipleRestaurant: [
                {name: "Possuo mais de um restaurante ?", id: true, description: "Gerencia e mmonitore varias restaurantes."},
                {name: "Possuo somente um restaurante ?", id: false, description: "Crie e gerencia o seu restaurante."}
            ]
        }
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
            account_responsable_country_registration_number: null,
            is_chain: null,
            address:{
                cep: null,
                street: null,
                number: null,
                neighborhood: null,
                state: null,
                city_id: null,
                complement: null
            },
            account_responsable_address: {
                cep: null,
                street: null,
                number: null,
                neighborhood: null,
                state: null,
                city_id: null,
                complement: null
            }
        })
        const steps = [
            {title: "Inicio", description: "Rede ou um restaurante", step: 1},
            {title: "Sua conta", description: "Dados do responsavél", step: 2},
            {title: "Empresa / Restaurante", description: "Dados do restaurante ou grupo", step: 3},
            {title: "Planos", description: "Escolhe seu plano", step: 4},
            {title: "Confirmaçao", description: "Revise e finalize", step: 5},
        ]
        const {
            v,
            notify,
            searchAndPopulateAddressByCep
        } = useFormMixin(restaurantChainService, form, ctx.emit, options)
        return {
            form,
            v,
            steps,
            notify,
            options,
            stateStore,
            searchAndPopulateAddressByCep
        }
    },

    data(){
        return {
            step: 1,
            currentStep: 1,
            maxSteps: 0,
        }
    },

    computed: {
        stepsAreConcluded() {
            return this.currentStep == this.maxSteps + 1
        }
    },

    validations(){
        return {
            form: {
                name: {required},
                corporate_name: {required},
                comercial_contact: {required},
                account_responsable_email: {required},
                cpf_cnpj: {required},
                account_responsable_name: {required},
                account_responsable_phone: {required},
                account_responsable_country_registration_number: {required},
                address:{
                    cep: {required},
                    street: {required},
                    number: {required},
                    neighborhood: {required},
                    state: {required},
                    city_id: {required},
                    complement: {required}
                },
            }
        }
    },

    methods:{
        nextFromStep() {
            if(this.currentStep == this.maxSteps) return
            if(this.isCurrentStep(1)) {
                if(!this.validatInitStep()){
                    return
                }
            }
            if(this.isCurrentStep(2)) {
                if(!this.validateAccounStep()) return
            }
            if(this.isCurrentStep(3)) {
                if(!this.validateCompanyStep()) return
            }
            this.currentStep += 1
        },
        validatInitStep() {
            if(this.form.is_chain !== true && this.form.is_chain !== false) {
                this.notify.error("Selecione se possuie um ou mais restaurante(s).")
                return false
            }
            return true
        },
        validateAccounStep() {
            const message = "Informe os dados do responsavel para continuar"
            if (isEmpty(this.form.account_responsable_name) || isEmpty(this.form.account_responsable_country_registration_number) || isEmpty(this.form.account_responsable_email)) {
                this.notify.error(message)
                this.v.$touch()
                return false
            }
            return true
        },
        validateCompanyStep() {
            let message = null
            if(!validateAddress(this.form.address)) {
                message = "informa todos os dados do endereço da empresa"
            }else if(isEmpty(this.form.corporate_name) || isEmpty(this.form.name) || isEmpty(this.form.cpf_cnpj) || isEmpty(this.form.comercial_contact)){
                message = "Nao foram informados todos os dados da empresa/restaurante."
            }
            if(message){
                this.notify.error(message)
                this.v.$touch()
                return false
            }
            return true
        },
        async searchAddressByCep(cep: string | undefined = undefined) {
            console.log(cep)
            if(!cep){
                this.v.form.address.cep.$touch()
            }
            const self = this
            await this.searchAndPopulateAddressByCep(cep, function(data: any, city: any){
                self.form.account_responsable_address.neighborhood = data.bairro
                self.form.account_responsable_address.street = data.logradouro
                self.form.account_responsable_address.state = data.uf
                self.form.account_responsable_address.city_id = city ? city.id : null
                self.options.accountCities = [{id: self.form.account_responsable_address.city_id, name: city?.name || '' }]
            })
        },
        previousStep(){
            if(this.currentStep == 1) return
            this.currentStep -= 1
        },
        isCurrentStep(step: number) {
            return this.currentStep == step
        },
        selectPlan(plan: number) {

        },
        stepOnClass(step: number) {
            return this.isCurrentStep(step) || step < this.currentStep ? 'active' : ''
        },
        stepIsCompleted(step: number) {
            return step < this.currentStep ? true : false
        },
        submitResgiter() {
            this.currentStep = this.maxSteps + 1
        }
    },
    async mounted() {
        this.maxSteps = this.steps.length
        await this.stateStore.loadStates()
        this.options.states = this.stateStore.states
    },
})