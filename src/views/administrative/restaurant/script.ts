import Form from "./Form/Form.vue";
import { defineComponent } from "vue";
import restaurantService from "@/services/restaurantService";
import columns from "./columns";
import pageMixin from "@/mixins/pageMixin";
import Search from "./Search/Search.vue";

export default defineComponent({
    mixins: [pageMixin],
    components: {
        Form,
        Search
    },
    data(){
        return {
            data: [],
            columns: columns,
            service: restaurantService
        }
    },
    async mounted(){
        //const response = await restaurantService.getAll<any>({limit: 20, offset: 0})
        //this.data = response.data
    }
})