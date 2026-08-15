export interface AlertProps {
    id?: number
    title: string
    description: string
    severity: string
}

export const  getSeverity = (severity: string): string => {
    if(severity == '1'){
        return 'alert-teal'
    }
    if(severity == '2') {
        return 'alert-warn'
    }
    return 'alert-red'
}

export const  getSvgSeverity = (severity: string): string => {
    if(severity == '1'){
        return 'ac'
    }
    if(severity == '2') {
        return 'amber'
    }
    return 'red'
}