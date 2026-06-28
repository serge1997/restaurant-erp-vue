import roomService from "@/services/roomService"
import { usePageMixin } from "@/stores/usePageMixin"
import { defineComponent } from "vue"
import Form from "./Form/Form.vue"
import type { RoomTypeProps } from "@/types/roomType/room.type"
import roomTypeService from "@/services/roomTypeService"
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from "primevue/useconfirm";
import ConfirmTemplate from "@/components/template/ConfirmTemplate/ConfirmTemplate.vue"

export default defineComponent({
    name: "RoomView",

    components: {
        Form,
        ConfirmDialog,
        ConfirmTemplate
    },

    setup(){
        const confirm = useConfirm()
        const {
            search,
            data,
            paginate,
            metaData,
            deleteResource
        } = usePageMixin(roomService)

        return {
            data,
            paginate,
            search,
            metaData,
            confirm,
            deleteResource
        }
    },
    data(){
        return {
            options: {
                roomTypes: [] as RoomTypeProps[]
            }
        }
    },
  methods: {
    async getRoomTypes() {
        const { data } = await roomTypeService.getAll<RoomTypeProps>({})
        this.options.roomTypes = data
    },
    async getRoomToEdit(id: number){
        const {data} = await roomService.getOne(id)
        const formTemplate = this.$refs.form as any
        formTemplate.formStore.openForm()
        formTemplate.populateForm(data)
        
    },
    openDeleteConfirm(id: number){
        this.confirm.require({
            message: "voce realmente quer remover a sala ?",
            accept: async () => {
               await this.deleteResource(id)
            }
        })
    }
    
  },
  mounted() {
    this.getRoomTypes()
    this.search(this.paginate)
  },
})