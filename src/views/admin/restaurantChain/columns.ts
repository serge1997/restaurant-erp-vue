export default [
    {
        label: 'Codigo',
        property: 'id'
    },
    {
        label: 'Nome',
        property: 'name'
    },
    {
        label: 'CNP/CPF',
        property: 'cpf_cnpj'
    },
    {
        label: 'Contato',
        property: 'phone'
    },
    {
        label: 'Email',
        property: 'email'
    },
    {
        label: 'Endereço',
        property: 'address',
        format: (address: any) => `${address.city}/${address.state}`
    },
    {
        label: 'Status',
        property: 'is_active',
        format: (val: any) => val ? 'Ativo' : 'Inativo'
    }
]