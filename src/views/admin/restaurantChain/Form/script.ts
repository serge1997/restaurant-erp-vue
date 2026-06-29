import restaurantChainService from "@/services/restaurantChainService";
import { useFormMixin } from "@/stores/useFormMixin";
import { defineComponent, ref } from "vue";
import { required } from "@/validators";

export default defineComponent({
    name: 'Form',

    setup(props, ctx) {
        const form = ref({
            id: null,
            name: null,
            corporate_name: null,
            cpf_cnpj: null,
            phone: null,
            comercial_phone: null,
            email: null,
            account_responsable_phone: null,
            account_responsable_email: null,
            account_responsable_name: null,
            cep: null,
            street: null,
            street_number: null,
            neighborhood: null,
            state: null,
            city: null
        })

        const {
            onSubmit,
            getTitle,
            onClearForm,
            v
        } = useFormMixin(restaurantChainService, form, ctx.emit)

        return {
            form,
            onSubmit,
            v,
            getTitle,
            onClearForm
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
    }
})