import { defineComponent } from "vue";
import formMixins from "@/mixins/formMixins";
import { useFormStore } from "@/stores/formStore";

export default defineComponent({

    setup(){
        return {
            formStore: useFormStore()
        }
    },
    mixins: [formMixins],
    data(){
        return {
            title: '',
            form: {}
        }
    },
    methods: {
        populateForm(){
        }
    }
})