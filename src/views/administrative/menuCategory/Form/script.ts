import formMixins from "@/mixins/formMixins";
import { useFormStore } from "@/stores/formStore";
import { defineComponent } from "vue";
import InputFileUpload from "@/components/Inputs/InputFileUpload.vue";
import { required } from "@/validators";
import useVuelidate from "@vuelidate/core";
import { useNotify } from "@/shared/utility/notify";

export default defineComponent({
    name: "Form",
    mixins: [formMixins],
    components: {
        InputFileUpload
    },
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
    data(){
        return{
            form: {
                id: null,
                name: null,
                description: null,
                image: null
            }
        }
    },
    validations(){
        return {
            form: {
                name: {required}
            }
        }
    },
    methods: {
        setFileSelected(files: Array<File>) {
            this.form.image = files[0]
        },
        async onSubmit(){
            try{
                await this.v.$touch()
                if (this.v.$invalid){
                    this.notify.error("Dados do formulario invalidos")
                    return;
                }
                const formData = new FormData();
                formData.append('name', this.form.name)
                formData.append('description', this.form.description)
                formData.append('image', this.form.image instanceof File ? this.form.image : '')
                if (this.form.id) {
                    formData.append('id', this.form.id)
                    const response = await this.service.update(formData)
                    this.notify.success(response.message)
                    this.formStore.clearForm({})
                }else{
                    const response = await this.service.create(formData)
                    this.notify.success(response.message)
                    this.formStore.clearForm({})
                }
                this.$emit('update-dataTable', {})
            }catch(err) {
                this.notify.notifyErr(err)
            }
        }
    }
})