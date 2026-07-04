import type { Service } from "@/services";
import type { Ref } from "vue";

export interface FormRef {
    onClearForm: () => void,
    populateForm: (dataEdit: any) => void,
    onPopulateForm: (dataEdit: any) => void, //custom method to populate form
    updateDataTable: (service: Service) => void
    formStore: any
}