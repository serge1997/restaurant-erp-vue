import type { Service } from "@/services";
import { useNotify } from "@/shared/utility/notify";
import { useFormStore } from "@/stores/formStore";
import useVuelidate from "@vuelidate/core";
import { defineComponent, type PropType } from "vue";

export default defineComponent({

    setup(){
        const formStore = useFormStore()
        const notify = useNotify()
        const v = useVuelidate()
        return {
            formStore,
            notify,
            v
        }
    },
    props: {
        service: Object as PropType<Service>,
        required: true
    },
    data(){
        return {
            title: '',
            form: {
                id: null
            },
        }
    },
    methods: {
        openForm(){
            console.log("hello world")
        },
        populateForm(){
            const keys = Object.keys(this.form)
            const itemEdit = this.formStore.getDataEdit()
            keys.forEach(property => {
                this.form[property] = itemEdit[property]
            })

        },
        onClearForm(){
            this.formStore.clearForm(this.form)
            this.v.$reset()
        },
        async onSubmit(){
            try{
                this.v.$touch()
                if (this.v.$dirty){
                    throw new Error("Dados do formulario invalidos")
                }

                if (this.form.id) {
                    const response = await this.service?.update(this.form)
                    this.notify.success(response.message)
                    return
                }
                const response = await this.service.create(this.form)
                this.notify.success(response.message)
            }catch(err) {
                this.notify.error(err.toString())
            }
        },
    },
    computed: {
        dataEdit(): any {
            const itemEdit = this.formStore.getDataEdit()
            if (itemEdit) {
                this.title = itemEdit.name
                this.populateForm()
                return itemEdit
            }
            this.title = this.service.serviceTitle
            return null
        },
    },
    mounted(){
    }
})