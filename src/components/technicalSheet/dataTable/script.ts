import Column from "primevue/column";
import DataTable from "primevue/datatable";
import { defineComponent } from "vue";

export default defineComponent({
    name: "TechnicalSheetDataTable",

    components: {
        DataTable,
        Column
    },
    props: {
        menuItem: {
            type: Object,
            required: true
        },
        data: {
            type: Object,
            required: true
        }
    }
})