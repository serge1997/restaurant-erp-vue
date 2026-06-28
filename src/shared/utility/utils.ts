import Slider from "primevue/slider"
import { useNotify } from "./notify"

export const currency = (value: number | null): string => {
    if (!value) return ""
    return `R$ ${value.toFixed(2)}`
}

export const removeNumberLabels = (value: string | null): number | null => {
    if (!value) return null
    const result = value.toLowerCase().replace(/ml|unit|unidade|g|kg|[R$]|\s/g, "")
    return Number(result) || null
}

export const cpfCnpjMask = (cpfCnpj: string): string => {
    if (cpfCnpj.length == 11){
        const slipted = cpfCnpj.split('')
        return `${slipted[0]}${slipted[1]}${slipted[2]}.${slipted[3]}${slipted[4]}${slipted[5]}-${slipted[6]}${slipted[7]}${slipted[8]}-${slipted[9]}${slipted[10]}`
    }
    return ''
}

export const phoneDDMask = (phone: string): string => {
    const splited = phone.split('')
    const [__, _, ...p] = phone
    return `(${splited[0]}${splited[1]}) ${p.toString().replace(/\D/g, '')}`
}

export const handleError = (error: any, notify: any) => {
    if (!error?.response) {
        console.log(error)
        notify.error("erro interno")
        return
    }
    notify.error(error.response?.data?.message || "Erro interno")
  
}

export const defaultFilter = {value: 0, label: "Todos"}


