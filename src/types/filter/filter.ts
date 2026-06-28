export interface FilterProps {
    title?: string
    label: string
    slot?: string
}

export class Filter {
    private current: FilterProps
    constructor(props: FilterProps) {
        this.current = props
    }

    static create(props: FilterProps): Filter {
        return new Filter(props)
    }

    isCurrent(props: FilterProps): boolean {
        return this.current.label == props.label
    }
}