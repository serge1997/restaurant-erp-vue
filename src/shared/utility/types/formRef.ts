import type { Service } from "@/services";
import type { Ref } from "vue";

export interface FormRef {
    onClearForm: () => void,
    populateForm: (dataEdit: any) => void,
    updateDataTable: (service: Service) => void
    formStore: any
}