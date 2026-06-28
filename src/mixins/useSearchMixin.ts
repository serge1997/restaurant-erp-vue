import type { FilterOption } from "@/shared/utility/types/filterOption";
import { removeObjEmptyProp } from '@/shared/utility';

export function useSearchMixin(filters: FilterOption[], search: any, emit: any, hasActiveFilter: boolean = true) {

    const onSearchEvent = async (params: any) => {
        const filtered = removeObjEmptyProp(params)
        const advancedFilters = removeObjEmptyProp(search)
        const allParams = {...params, ...filtered, ...advancedFilters}
        emit('on-search', {query: allParams})
    }

    const sumFiltersQuantity = () => {
        let sum = filters.reduce(
            (acc, current) => acc + current.selectionLenght,
            0
        )
        console.log(sum)
        return hasActiveFilter == true ? sum += 1 : sum
    }

    const resetFilterSelectionQuantity = async () => {
        filters.map(f => {
            f.selectionLenght = 0
        })
    }
    const incrementFiltersQuantity = () => {
        Object.keys(search).forEach(s => {
            if (Array.isArray(search[s])) {
                const index = filters.findIndex(f => f.slot == s)
                if(search[s].length == 1 && search[s].includes(0)){
                    filters[index]!.selectionLenght = 0
                }else if(search[s].length) {
                    filters[index]!.selectionLenght = 1
                }else{
                    filters[index]!.selectionLenght = 0
                }
            }else{
                const index = filters.findIndex(f => f.slot == s)
                if (index >= 0) {
                    const isDate = filters[index]?.isDate
                    if (isDate){
                        const dateFrom = search[s]
                        const dateTo = search[`${s}To`]
                        if (dateFrom || dateTo) {
                            filters[index]!.selectionLenght = 1
                        }else{
                            filters[index]!.selectionLenght = 0
                        }
                    }else if(typeof search[s] == "boolean"){
                        filters[index]!.selectionLenght = 1
                    }else{
                        if(search[s] != null && search[s] != '') {
                            filters[index]!.selectionLenght = 1
                        }else{
                            filters[index]!.selectionLenght = 0
                        }
                    }
                }
            }
        })
    }
    const clearSearchInputs = async ()  => {
        Object.keys(search).forEach(s => {
            if (Array.isArray(search[s])) {
                search[s] = [0]
            }else if(search[s] instanceof Date) {
                search[s] = null
            }else if (!Array.isArray(search[s]) && typeof search[s] == "object" && search[s] !== null) {
                search[s] = {}
            }else if(typeof search[s] == "boolean"){
                search[s] = true
            }else if(typeof search[s] == "number"){
                search[s] = 0
            }else{
                search[s] = null
            }
        })
        await resetFilterSelectionQuantity()
        //await emit('search', {query: search})
    }
    return {
        clearSearchInputs,
        resetFilterSelectionQuantity,
        onSearchEvent,
        sumFiltersQuantity,
        incrementFiltersQuantity
    }
}