export default [
    {
        label: 'Data',
        property: 'business_day',
        width: '12%',
        format: (business_day: any) => business_day.formatted
    },
]