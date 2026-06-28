import { useToast } from 'primevue/usetoast';

export function useNotify() {
    const toast = useToast()

    function notify(type: string, titulo: string, content: string) {
        toast.add({severity: 'success', summary: titulo, detail: content, life: 4000})
    }

    function success(message: string) {
        toast.add({severity: 'success', summary: 'Messagem de successo', detail: message, life: 4000})
    }
    function error(message: string) {
        toast.add({severity: 'error', summary: 'Messagem de error', detail: message, life: 4000})
    }
    function warn(message: string) {
        toast.add({severity: 'warn', summary: 'Alerta', detail: message, life: 4000})
    }
    function info(message: string) {
        toast.add({severity: 'info', summary: 'Informaçao', detail: message, life: 4000})
    }
    function notifyErr(err: any) {
        const message = err?.response ? err.response.data.message : 'Erro interno'
        toast.add({severity: 'error', summary: 'Messagem de error', detail: message, life: 4000})
    }

    return {
        success,
        error,
        warn,
        info,
        notifyErr
    }
}