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
            formIsPopulted,
            searchAndPopulateAddressByCep
        } = useFormMixin(userService, form, ctx.emit)

        return {
            searchAndPopulateAddressByCep,
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
            selectingRoles: false,
            permissionModules: [] as number[],
            allSelectPushedPermission: {} as Record<string, string[]>
        }
    },
    methods: {
        selectAllPermissionOfRole(event: any) {
            const groupId = event.target.value
            if(!this.permissionModules.includes(Number(groupId))){
                if (this.allSelectPushedPermission[String(groupId)]?.length){
                    this.allSelectPushedPermission[String(groupId)]?.map(name => {
                        if(this.form.permissions.includes(name)){
                            const index = this.form.permissions.findIndex(p => p == name)
                            this.form.permissions.splice(index, 1)
                            delete this.allSelectPushedPermission[String(groupId)]
                        }
                    })
                }
                return
            }
            const modules = this.options.modules.find(m => {
                return m.routeGroupes?.find(r => r.id == groupId)
            })
            if (modules?.routeGroupes?.length) {
                modules.routeGroupes.forEach(g => {
                    if(g.id == groupId){
                        g.permissions.map(p => {
                            if (!this.form.permissions.includes(p.name)) {
                                this.form.permissions.push(p.name)
                                if(!this.allSelectPushedPermission[String(groupId)]?.length) {
                                    this.allSelectPushedPermission[String(groupId)] = []
                                }
                                this.allSelectPushedPermission[String(groupId)]?.push(p.name)
                            }
                        })
                    }
                })
            }
        },
        searchAddressByCep(cep?: string) {
            this.v.form.address.cep.$touch()
            this.searchAndPopulateAddressByCep(cep)
        },
        storeUser(){
            
        },
        populatePermissions() {
            const dataEdit = this.formStore.getDataEdit()
            const grantedPermissions = dataEdit?.granted_permissions as {name: string}[]
            const userPermissions: RoleProps[] = dataEdit?.roles_permissions || []
            userPermissions.forEach(role => {
                if (role.permissions.length) {
                    role.permissions.map(p => {
                        this.form.permissions.push(p.name)
                    })
                }
            })
            grantedPermissions?.map(gp => {
                if(!this.form.permissions.includes(gp.name)){
                    this.form.permissions.push(gp.name)
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