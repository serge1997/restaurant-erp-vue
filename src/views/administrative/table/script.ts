import { defineComponent } from "vue";
import Form from "./Form/Form.vue";
import roomService from "@/services/roomService";
import type { RoomProps } from "@/types/room/room";
import { usePageMixin } from "@/stores/usePageMixin";
import tableService from "@/services/tableService";

export default defineComponent({
    name: "TableView",

    components:{
        Form
    },

    setup(props, ctx) {
        const {
            search,
            data,
            paginate,
            metaData,
        } = usePageMixin(tableService)

        return {
            search, 
            paginate,
            data,
            metaData
        }
    },
    data() {
        return {
            tablesMeta: [
                {
                    total: 34, 
                    icon: "pi-shopping-bag",
                    icon_class: "bg-green-alert-primary",
                    label: "Total de mesas"
                }, 
                {
                    total: 12, 
                    icon: "pi-check",
                    icon_class: "bg-green-alert-secondary",
                    label: "Ativas"
                }, 
                {
                    total: 8, 
                    icon: "pi-info-circle",
                    icon_class: "bg-danger-alert",
                    label: "Inativas/Manutenaçao"
                }, 
                {
                    total: 2, 
                    icon: "pi-plus",
                    icon_class: "bg-amber-alert",
                    label: "Capacidade total"
                }
            ],
            options: {
                rooms: [] as RoomProps[]
            },
            withoutActiveFilter: true
        }
    },
    methods: {
        getClassOfStatusType(table: any) {
            if (table.is_active) {
                return "bg-amber-alert border-amber-1"
            }
            return "b-bg-surface2 inactive-card border-1"
        },
        async getRooms(){
            const response = await roomService.getAll<RoomProps>({})
            this.options.rooms = response.data
        },
        async getTableItemToEdit(id: number){
            const { data } = await tableService.getOne(id)
            const formTemplate = this.$refs.form as any
            formTemplate.formStore.openForm()
            formTemplate.populateForm(data)
        }
    },
    async mounted(){
        await this.search(this.paginate, this.withoutActiveFilter)
        await this.getRooms()
    }
})