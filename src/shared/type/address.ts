
export interface AddressProps {
    id: number | null,
    cep: string | null,
    street: string | null,
    number: string | null,
    complement?: string,
    neighborhood?: string | null,
    city: string | null,
    state: string | null
}

export class Address {

    static emptyProps(): AddressProps {
        return {
            id: null,
            cep: null,
            street: null,
            number: null,
            complement: "",
            neighborhood: null,
            city: null,
            state: null
        }
    }
}