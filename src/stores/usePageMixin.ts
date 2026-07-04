import type { Paginate } from "@/shared/http/paginate";
import { defineComponent, ref } from "vue";
import type { Service } from "@/services";
import type { HttpResponse } from "@/shared/http/response";
import { useFormStore } from "./formStore";
import { useNotify } from "@/shared/utility/notify";

export function usePageMixin(service: Service){
    const data = ref<Array<any>>()
    const cachedData = ref<Array<any>>()
    const metaData = ref({})
    const paginate: Paginate = {limit: 20, offset: 0, search: '', query: {is_active: true}}
    const notify = useNotify()
    const searchParams = ref<any>(null)
    
    const search = async (params: any = null, withoutActiveFilter: boolean = false) => {
        try{
            paginate.query = params?.query ? params.query : paginate.query
            if (withoutActiveFilter){
                delete paginate.query.is_active
                delete params.query.is_active
            }
            paginate.search = params && params?.search ? params.search : paginate.search
            data.value = [];
            paginate.offset = 0
            searchParams.value = params
            const response = await service.getAll<Array<any>>(paginate)
            data.value = response.data
            cachedData.value = data.value
            metaData.value = response.meta
        }catch(err: any) {
            notify.error(err?.response?.data?.message || "erro interno")
        }
    }

    const onSearch = async (query: any) => {
        paginate.search = query?.search?.toLowerCase() || ''
        paginate.query = query.query
        await search(paginate)
    }

    const deleteResource = async (id: number) => {
        try{
            const response = await service.delete(id)
            await search(paginate)
            notify.success(response.message)
        }catch(err: any) {
            notify.error(err?.response?.data?.message || "erro interno")
        }
    }
   
    return {
        data,
        paginate,
        search,
        onSearch,
        metaData,
        cachedData,
        deleteResource,
        searchParams
    }
}