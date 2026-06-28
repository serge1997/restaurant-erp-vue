import userService from "@/services/userService";
import { usePageMixin } from "@/stores/usePageMixin";
import { defineComponent } from "vue";
import Form from "./Form/Form.vue";
import { useModuleStore } from "@/stores/moduleStore";
import columns from "./columns";
import { useRoleStore } from "@/stores/useRoleStore";

export default defineComponent({
    name: "UserView",

    components: {
        Form
    },
    setup(props, ctx) {
        const moduleStore = useModuleStore()
        const roleStore = useRoleStore()
        const {
            data,
            search,
            paginate,
            metaData,
            deleteResource
        } = usePageMixin(userService)

        return {
            data,
            search,
            paginate,
            metaData,
            deleteResource,
            moduleStore,
            roleStore
        }
    },
    data() {
        return {
            modules: [] as any[],
            options: {
                modules: [] as any[],
                roles: [] as any
            },
            columns: columns,
            service: userService,
            formRef: null as any
        }
    },
    methods: {
        setDataEdit(dataEdit: any){
            this.formRef.populateForm(dataEdit)
        }
    },
    async mounted() {
        await this.search(this.paginate)
        await this.moduleStore.loadModules()
        await this.roleStore.load()
        this.options.modules = this.moduleStore.modules
        this.options.roles = this.roleStore.roles
        this.formRef = this.$refs.form
    },
})