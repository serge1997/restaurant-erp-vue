import userService from "@/services/userService";
import { useFormMixin } from "@/stores/useFormMixin";
import { required } from "@/validators";
import { defineComponent, reactive, type PropType } from "vue";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import type { FormOptions } from "@/types/User/User";
import ScrollPanel from "primevue/scrollpanel";
import type { RoleProps } from "@/types/role/Role";

export default defineComponent({
    name: 'Form',

    components: {
        TabView,
        TabPanel,
        ScrollPanel
    },

    props: {
        options: {
            type: Object as PropType<FormOptions>,
            required: true
        }
    },

    setup(props, ctx) {
        const form = reactive({
            id: null,
            name: '',
            username: '',
            birth_date: '',
            email: '',
            password: '',
            phone: '',
            cpf: '',
            gender: 'M',
            is_active: true,
            permissions: [] as string[],
            roles: [],
            address: {
                id: null,
                cep: '',
                street: '',
                number: '',
                complement: '',
                neighborhood: '',
                city: '',
                state: ''
            }
        })
        const {
            onClearForm,
            onSubmit,
            getTitle,
            v,
            populateForm,
            formStore,
            formIsPopulted
        } = useFormMixin(userService, form, ctx.emit)

        return {
            onClearForm,
            onSubmit,
            getTitle,
            populateForm,
            formStore,
            formIsPopulted,
            form,
            v
        }
    },
    watch: {
        'form.roles'(newValue) {
            if (newValue && this.form.id){
                if (!this.form.roles || this.formIsPopulted) return
                this.populatePermissions()
            }
        }
    },

    validations(){
        return {
            form: {
                name: { required },
                phone: { required },
                username: { required },
                cpf: { required },
                address: {
                    cep: { required },
                    street: { required },
                    number: { required },
                    neighborhood: { required },
                    city: { required },
                    state: { required }
                }
            }
        }
    },
    computed:{
        isActiveLabel() {
            if (this.form.is_active) {
                return 'Ativo - Acesso permitido'
            }
            return `Inativo - Acesso negado`
        },
        isActiveIconClass(){
            if (this.form.is_active) {
                return `c-green-secondary`
            }
            return `c-amber`
        },
    },
    data() {
        return {
            selectingRoles: false
        }
    },
    methods: {
        storeUser(){
            
        },
        populatePermissions() {
            const dataEdit = this.formStore.getDataEdit()
            const userPermissions: RoleProps[] = dataEdit?.roles_permissions || []
            userPermissions.forEach(role => {
                if (role.permissions.length) {
                    role.permissions.map(p => {
                        this.form.permissions.push(p.name)
                    })
                }
            })
        },
        onSelectRole(event: any) {
            this.formIsPopulted = true
            const roles = event.value || []
            this.form.permissions = []
            this.options.roles.forEach(role => {
                if (role.permissions.length && roles.includes(role.id)) {
                    role.permissions.map(p => {
                        this.form.permissions.push(p.name)
                    })
                }
            })
        }
    }
})