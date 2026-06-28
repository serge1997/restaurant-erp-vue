import productCategoryService from "@/services/productCategoryService";
import { defineComponent } from "vue";
import columns from "./columns";
import pageMixin from "@/mixins/pageMixin";
import Search from "./Search/Search.vue";
import Form from './Form/Form.vue'

export default defineComponent({
    name: 'ProductCategoryView',
    components: {
        Search,
        Form
    },
    mixins: [pageMixin],
    data(){
        return {
            service: productCategoryService,
            columns: columns,
            data: []
        }
    },
    mounted(){
    }
})