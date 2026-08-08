import pageMixin from "@/mixins/pageMixin";
import { defineComponent } from "vue";
import Form from './Form/Form.vue'
import Search from "./Search/Search.vue";
import menuCategoryService from "@/services/menuCategoryService";
import columns from "./columns";

export default defineComponent({
    name: 'MenuCategoryView',
    mixins: [pageMixin],
    components: {
        Form,
        Search
    },
    data(){
        return {
            service: menuCategoryService,
            columns: columns
        }
    },
    mounted(){
    }

})