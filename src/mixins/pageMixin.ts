import type { Paginate } from "@/shared/http/paginate";
import { defineComponent } from "vue";
import type { Service } from "@/services";

export default defineComponent({
    data(){
        return {
            data: [] as Array<any>,
            service: null as unknown as Service,
            paginate: {
                limit: 20,
                offset: 0,
                search: '',
                query: {}
            } as Paginate
        }
    },
    methods: {
        async search(params: any) {
            this.paginate.query = params.query ? params.query : this.paginate.query
            this.paginate.search = params.search ?? this.paginate.search
            this.data = [];
            const response = await this.service.getAll<Array<any>>(this.paginate)
            this.data = response.data
        },
    },
    mounted() {
        this.search(this.paginate)
    }
})