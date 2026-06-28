import tableService from "@/services/tableService";
import type { TableProps } from "@/types/table/Table";
import { defineStore } from "pinia";


export const useTableStore = defineStore("tables", {
    state: () => ({
        tables: [] as TableProps[],
        loaded: false,
        loading: false,
        availabes: [] as TableProps[]
    }),
    actions: {
        async loadTables() {
            if (this.loaded || this.loading) return
            this.loading = true
            const { data } = await tableService.getAll<TableProps>({query: { is_active: true}, limit: 2000})
            this.tables = data
            this.loaded = true
            this.loading = false
        },
        async loadAvailables() {
            const { data } = await tableService.getAvailables<TableProps>()
            this.availabes = data
        }
    }
})