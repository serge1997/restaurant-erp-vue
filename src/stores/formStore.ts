import { defineStore } from "pinia"
import { computed, ref, type Ref } from "vue"

export const useFormStore = defineStore('formStore', () => {
    const isVisible: Ref<boolean> = ref(false)
    const dataEdit: Ref<any> = ref(null)
    const openForm = () => {
        isVisible.value = true
    }
    const setDataEdit =  (data: any) => {
        dataEdit.value = data
        isVisible.value = data ? true : false
    }
    const clearForm = (form: any) => {
        if (!form) return
        const keys = Object.keys(form)
        for(const property of keys) {
            if (Array.isArray(form[property])){
                form[property] = [];
                continue
            }
            if (!form[property]){
                continue
            }
            if (form[property] instanceof Date){
                form[property] = new Date()
                continue
            }
            if (typeof form[property] === 'object') {
                form[property] = {}
                continue
            }
            form[property] = null
            if (property == 'is_active') {
                form[property] = true
            }
        }
    }
    const closeForm = () => {
        isVisible.value = false;
    }
    const getDataEdit = () => dataEdit.value

    return {isVisible, setDataEdit, getDataEdit, openForm, clearForm, closeForm}
})