export default [
    {
        label: 'Sku',
        property: 'sku'
    },
    {
        label: 'Nome',
        property: 'name'
    },
    {
        label: 'Categoria',
        property: 'category',
        nested: 'name'
    },
    {
        label: 'Quantidade minima',
        property: 'min_quantity'
    },
    {
        label: 'Custo atual',
        property: 'cost',
        nested: 'label'
    },
    {
        label: 'Status',
        property: 'is_active',
        format: (val: any) => val ? "Ativo" : "Inativo"
    }
]