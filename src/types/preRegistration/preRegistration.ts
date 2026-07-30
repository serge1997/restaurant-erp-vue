
export interface PreRegistrationProps {
    id: number
    name: string
    corporate_name: string
    cnpj: string
    phone?: string
    comercial_contact: string
    email?: string
    account_responsable_phone: string
    account_responsable_email: string
    account_responsable_name: string
    account_responsable_avatar: string
    account_responsable_cpf: string
    is_chain: boolean
    confirmation_token_expired: boolean
}