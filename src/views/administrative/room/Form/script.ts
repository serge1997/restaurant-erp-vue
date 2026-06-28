import ColorPicker from "@/components/Inputs/ColorPicker.vue";
import IconPicker from "@/components/Inputs/IconPicker.vue";
import roomService from "@/services/roomService";
import { useFormMixin } from "@/stores/useFormMixin";
import type { FormOptions } from "@/types/room/room";
import { required } from "@/validators";
import InputNumber from "primevue/inputnumber";
import { defineComponent, reactive, type PropType } from "vue";


export default defineComponent({
    name: "Form",

    components: {
        InputNumber,
        ColorPicker,
        IconPicker
    },

    props: {
        options: {
            type: Object as PropType<FormOptions>,
            required: true
        }
    },
    setup(props, {emit}) {
        const form = reactive({
            id: null,
            name: null,
            description: null,
            capacity: null,
            severity: '',
            icon: '',
            is_active: true,
            room_type_id: 0
        })
        const {
            onClearForm,
            onSubmit,
            getTitle,
            v,
            formStore,
            populateForm
        } = useFormMixin(roomService, form, emit)
        return {
            onClearForm,
            onSubmit,
            getTitle,
            form,
            v,
            formStore,
            populateForm
        }
    },
    watch: {
        'form.id'(newValue) {
           if (newValue) {
            this.$nextTick(() => {
                const colorPicker = this.$refs.colorPicker as any
                const colors = colorPicker.colors as {val: string}[]
                const formColor = colors.find(c => c.val == this.form.severity)
                colorPicker.selectedColor(formColor)

                const iconPicker = this.$refs.iconPicker as any
                const icons = iconPicker.icons as {icon: string} []
                const formIcon = icons.find(i => i.icon == this.form.icon)
                iconPicker.setSelectedIcon(formIcon)
                
            })
           }
        }
    },
    validations(){
        return {
            form: {
                name: {required},
                capacity: {required }
            }
        }
    },

    methods: {
        setSeverity(value: {val: string}) {
            this.form.severity = value.val
        },
        setIcon(value: any){
            this.form.icon = value.icon
        }
    }
})