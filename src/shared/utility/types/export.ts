export interface ExportProps {
    label: string
    prop: string
    nested?: string
}

export class Export {
    constructor(
        public readonly props: ExportProps[],
        public readonly fileName: string,
        public readonly data: any[]
    ){}

    static create(props: ExportProps[], fileName: string, data: any[]): Export{
        return new Export(props, fileName, data)
    }
    headerLabels(): string[] {
        let labels: string[] = []
        this.props.map(p => labels.push(p.label))
        return labels
    }
    dataProps(): string[] {
        let props: string[] = []
        this.props.map(p => props.push(p.prop))
        return props
    }

    toCsv(): string {
        let rows = ""
        const headers = this.headerLabels()
        rows += headers.join(";") + "\n"
        for (const obj of this.data) {
            let row = ""
            for (const prop of this.props) {
                if(prop.nested) {
                    row += `${obj[prop.prop][prop.nested] || ' '};`
                    continue
                }
                row += `${obj[prop.prop] || ' '};`
            }
            row += "\n"
            rows += row
        }
        const blob = new Blob(['\uFEFF' + rows], { type: 'text/csv;charset=uft-8'})
        const url = URL.createObjectURL(blob)

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', this.fileName + '.csv');
  
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        return rows
    }
}