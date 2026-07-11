import type { Service } from "@/services";
import type { Paginate } from "@/shared/http/paginate";
import { useNotify } from "@/shared/utility/notify";
import { useFormStore } from "@/stores/formStore";
import useVuelidate from "@vuelidate/core";
import { type Ref, ref } from "vue";
import { usePageMixin } from "./usePageMixin";
import addressService from "@/services/addressService";
import cityService from "@/services/cityService";

export function useFormMixin(service: Service, form: any, emit: any, options: any = {} as any) {
    const formStore = useFormStore()
    const pageMixin = usePageMixin(service)
    const notify = useNotify()
    const v = useVuelidate()
    const isDisableSaveBtn = ref(false)
    const formIsPopulted = ref(false)



    const getTitle = () => {
        if (form.id) {
            return form.name
        }
        return `Adicionar ${service.serviceTitle}`
    }

    const populateForm = (dataEdit: any = null) => {
        //calling component must change the state to false
        formIsPopulted.value = false
        const keys = !dataEdit ? Object.keys(form) : Object.keys(dataEdit)
        const itemEdit = formStore.getDataEdit() ?? dataEdit
        keys.forEach(property => {
            if (Reflect.has(form, property)){
                form[property] = itemEdit[property]
            }
        })
    }

    const onClearForm = () => {
        formStore.clearForm(form)
        v.value.$reset()
    }
    const updateDataTable = async (data: any): Promise<Array<any>> => {
        const response = await service.getAll(pageMixin.paginate)
        return response.data
    }
     const searchAndPopulateAddressByCep = async () => {
            const { data } = await addressService.getByCep(form.address.cep || '') as any
            form.address.neighborhood = data.bairro
            form.address.street = data.logradouro
            form.address.state = data.uf
            const {data: cities } = await cityService.getByState(data.uf) as any
            options.cities = cities
            const findCity = (options.cities as any[]).find(c => c.name == data.localidade)
            form.address.city_id = findCity ? findCity.id : null
    }

    const onSubmit = async () => {
        try {
            isDisableSaveBtn.value = true
            v.value.$touch()
            if (v.value.$invalid) {
                throw new Error("Dados do formulario invalidos")
            }
            if (form.id) {
                const response = await service.update(JSON.parse(JSON.stringify(form)))
                notify.success(response.message)
                onClearForm()
                emit('submitted')
                formStore.isVisible = false
                return
            }

            const response = await service.create(JSON.parse(JSON.stringify(form)))
            notify.success(response.message)
            onClearForm()
            emit('submitted')
            formStore.isVisible = false
        } catch (err: any) {
            const { message } = err?.response?.data || {message: err.toString()};
            notify.error(message)
            throw new Error(err)
        }finally{
            isDisableSaveBtn.value = false
        }
    }
    return {
        formStore,
        notify,
        v,
        populateForm,
        onClearForm,
        onSubmit,
        getTitle,
        updateDataTable,
        isDisableSaveBtn,
        formIsPopulted,
        searchAndPopulateAddressByCep
    }
}