import tableService from "@/services/tableService";
import { useFormMixin } from "@/stores/useFormMixin";
import { tableShapeOptions, type TableShapeProps } from "@/types/table/Table";
import InputNumber from "primevue/inputnumber";
import { defineComponent, reactive, type PropType } from "vue";
import type { FormOptions } from "@/types/table/Table";
import { required } from "@/validators";

export default defineComponent({
    name: "Form",

    components: {
        InputNumber
    },
    props: {
        options: {
            type: Object as PropType<FormOptions>,
            required: true
        }
    },

    setup(props, { emit }){
        const form = reactive({
            id: null,
            number: null,
            capacity: null,
            name: null,
            room_id: null,
            shape: null as any,
            is_active: true
        })
        const {
            onClearForm,
            onSubmit,
            populateForm,
            formStore,
            isDisableSaveBtn,
            v,
            notify,
            getTitle
        } = useFormMixin(tableService, form, emit)
        return {
            onClearForm,
            onSubmit,
            getTitle,
            populateForm,
            form,
            formStore,
            isDisableSaveBtn,
            v,
            notify
        }
    },

    watch:{
        'form.id'(newValue) {
            if(newValue){
                const shape = this.shapes.find(s => s.shape == this.form.shape)
                this.selectedSchape(shape as TableShapeProps)
            }
        }
    },
    data() {
        return {
            shapes: tableShapeOptions
        }
    },

    validations(){
       return {
            form: {
                number: {required},
                capacity: {required},
                room_id: {required}
            }
       }
    },

    methods: {
        selectedSchape(shape: TableShapeProps) {
            this.form.shape = shape.shape
        },
        setSelectedShapeClass(shape: TableShapeProps){
            if (this.form.shape == shape.shape) {
                return "option-card-selected"
            }
        }
    },
    mounted() {
        this.form.shape = "pi pi-stop";
    },
})