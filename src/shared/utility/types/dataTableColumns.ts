export interface DataTableColumn {
    label: string
    property: string
    nested?: string
    width?: string
    class?: string
    format?: <T>(data: T) => any
}