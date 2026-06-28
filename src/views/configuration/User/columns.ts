import { cpfCnpjMask, phoneDDMask } from "@/shared/utility/utils";

export default [
    {
        label: "Cod.",
        property: "id"
    },
    {
        label: "Nome",
        property: "name"
    },
    {
        label: "CPF",
        property: "cpf",
        format: (val: any) => cpfCnpjMask(val)
    },
    {
        label: "E-mail",
        property: "email"
    },
    {
        label: "Celular",
        property: "phone",
        format: (val: any) => phoneDDMask(val)
    },
    {
        label: "Data Nasc.",
        property: "birth_date"
    },
    {
        label: "Genero",
        property: "gender"
    }
]