import { defineComponent, type PropType } from "vue";
import { useFormStore } from "@/stores/formStore";
import type { Tag } from "@/types/Flag/Flag";

export default defineComponent({
    name: 'FormTemplate',
    setup(props, {emit}){
        const formStore = useFormStore()
        return {
            formStore 
        }
    },
    props: {
        title: {
            type: String,
            required: true
        },
        dataEdit: {
            type: Object
        },
        itemId: {
            type: Number,
            default: 0
        },
        hasFlag: Boolean,
        flag: {
            type: Object as PropType<Tag>,
            required: false
        },
        flags: {
            type: Array,
            required: false
        },
        isDisableSaveBtn: {
            type: Boolean,
            default: false
        },
        hasMenu: {
            type: Boolean,
            default: false
        },
        showDefaultFooter: {
            type: Boolean,
            default: true
        },
        showSaveButton: {
            type: Boolean,
            default: true
        },
        formTitleIconClass: {
            type: String,
            default: 'detail-ico-svg-success'
        },
        saveBtnLabel: {
            type: String,
            default: 'Salvar'
        },
        formWidth: {
            type: String,
            default: 'w-30'
        }
    },
    data(){
        return {
           
        }
    },
    methods: {
        closeForm(){
            this.formStore.isVisible = true
            this.formStore.setDataEdit(null)
            this.formStore.closeForm()
            this.$emit('on-clear-form')
        },
        openFormMenuOverlay(event: any){
            (this.$refs.overlayFormMenu as any).toggle(event)
        },
        updateEntityTag(flag: any){
            this.$emit("updateEntityTagEl", flag)
        }
    },
    mounted(){
    }
})