import { required } from "@vuelidate/validators"

export interface Restaurant {
    id: number | null
    name: string
    corporate_name: string | null
    corporate_registration: string | null
    description: string | null
    address: string
    number: string
    phone: string
    email: string
    logo: string
    loss_margim: number | null
    fix_margim: number | null
    variable_margim: number | null
    enable_technical_sheet: boolean
    is_active: boolean
    created_at: string
}

export default function validationRules(): any {
    return {
        name: {required}
    }

}