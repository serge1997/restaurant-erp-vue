
export interface FilterOption {
    label: string
    title?: string
    icon?: string
    slot?: string
    hidden?: boolean
    selectionLenght: number
    isDate?: boolean
}

export class Filter {
    private current: FilterOption
    constructor(props: FilterOption) {
        this.current = props
    }

    static create(props: FilterOption): Filter {
        return new Filter(props)
    }

    isCurrent(props: FilterOption): boolean {
        return this.current.label == props.label
    }
}