
import { defineComponent, reactive } from "vue";
import Divider from "primevue/divider";
import Message from "primevue/message";
import { required } from "@/validators";
import supplierService from "@/services/supplierService";
import { useFormMixin } from "@/stores/useFormMixin";

export default defineComponent({
    name: 'Form',

    components: {
        Divider,
        Message
    },

    setup(props, { emit }){
        const form = reactive({
            id: null,
            name: null,
            email: null,
            phone: '',
            is_active: true
        })
        const {
            onClearForm,
            onSubmit,
            v, 
            notify,
            getTitle
        } = useFormMixin(supplierService, form, emit)
        return {
            onClearForm,
            onSubmit,
            getTitle,
            v, 
            notify,
            form
        }
    },

    data(){
        return {
        }
    },
    validations(){
        return {
            form: {
                name: {required},
                phone: {required}
            }
        }
    },
    mounted(){
    }
})