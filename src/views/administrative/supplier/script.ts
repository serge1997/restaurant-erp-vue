import pageMixin from "@/mixins/pageMixin";
import { defineComponent } from "vue";
import Form from "./Form/Form.vue";
import supplierService from "@/services/supplierService";
import columns from "./columns";
import Search from "./Search/Search.vue";
import { usePageMixin } from "@/stores/usePageMixin.ts";

export default defineComponent({
    name: 'SupplierView',

    components: {
        Form,
        Search
    },

    setup(){
        const {
            onSearch,
            paginate,
            search,
            data
        } = usePageMixin(supplierService)
        return {
            onSearch,
            paginate,
            search,
            data
        }
    },

    data(){
        return {
            service: supplierService,
            columns: columns
        }
    },
    methods: {
    },
    async created() {
        await this.search(this.paginate)
    },
})