import { defineComponent } from "vue";
import { useAuthStore } from "@/stores/authStore";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import type { RouteGroupProps } from "@/types/auth/Auth";

export default defineComponent({
    components: {
        IconField,
        InputIcon,
        InputText,
    },

    props: {
        auth: {
            type: Object,
            required: true
        }
    },

    setup(){
        const authStore = useAuthStore()

        return {
            authStore
        }
    },
    computed: {
        menus(){
            if (this.menusFindedElements.length) {
                return this.menusFindedElements
            }
            if(this.menuElmentSearchInput){
                return []
            }
            return this.authStore.getMenu()
        }
    },
    data(){
        return {
            visibleMenuSidebar: false,
            menu: [
                {
                    label: 'Adminstrativo',
                    sub: 'administrative-submenu',
                    items: [
                        {
                            label: 'Categorias de produto',
                            path: '/administrative/product-category'
                        },
                        {
                            label: 'Fornecedor',
                            path: '/administrative/supplier'
                        },
                        {
                            label: 'Restaurantes',
                            path: '/administrative/restaurant'
                        },
                        {
                            label: 'Categorias do menu',
                            path: '/administrative/menu-category'
                        },
                        {
                            label: 'Mesas',
                            path: '/administrative/table'
                        }
                    ]
                },
                {
                    label: 'Stock',
                    sub: 'stock-submenu',
                    items: [
                        {
                            label: 'Produtos',
                            path: '/stock/product'
                        },
                        {
                            label: 'Requisiçao de compra',
                            path: '/stock/purchase-request'
                        },
                        {
                            label: 'Movimentaçao de estoque',
                            path: '/stock/stock-movment'
                        },
                    ]
                },
                {
                    label: 'Menu',
                    sub: 'menu-submenu',
                    items: [
                        {
                            label: "Cadastro",
                            path: "/menu/items"
                        }
                    ]
                }
            ],
            menusFindedElements: [] as RouteGroupProps[],
            menuElemengtNotFound: "Elemento do menu nao encontrado",
            loadedMenuElements: [] as RouteGroupProps[],
            menuElmentSearchInput: null
        }
    },
    methods: {
        openSubmenu(el: any, event: any) {
            const subMenu = document.querySelector(el)
            const icon = document.querySelector(`${el}-icon`)
            if (subMenu) {
                subMenu.classList.toggle('d-none')
                if (subMenu.classList.contains('d-none')) {
                    icon?.classList.remove('pi-chevron-down')
                    icon?.classList.add('pi-chevron-up')
                }else{
                    icon?.classList.remove('pi-chevron-up')
                    icon?.classList.add('pi-chevron-down')
                }
            }
        },
        activeViewClass(view: string) {
            return view == this.$route.path ? 'active-view' : ''
        },
        searchMenuItem(event: any) {
            const value = event.target.value?.toLocaleLowerCase()
            this.menusFindedElements = []
            if(!value){
                return
            }
            this.loadedMenuElements.forEach((menu, index) => {
                const hasModule = this.menusFindedElements.find(m => m.module.id == menu.module.id)
                if(menu.module.name.toLocaleLowerCase().includes(value)) {
                    if(!hasModule?.id){
                        this.menusFindedElements.push(menu)
                    }
                }else{
                    const permissions = menu.permissions
                    permissions.forEach((permission) => {
                        if(permission.label.toLocaleLowerCase().includes(value) && permission.show_in_menu == true){
                            if(hasModule?.id){
                                console.log(value)
                                this.menusFindedElements[index]?.permissions.push(permission)
                            }else{
                                this.menusFindedElements.push(menu)
                                const lastIndex = this.menusFindedElements.length - 1
                                this.menusFindedElements[lastIndex]!.permissions = [permission]
                            }
                        }
                    })
                }
            })
            
        },
    },
    mounted() {
        this.loadedMenuElements = this.authStore.getMenu()
        console.log(this.loadedMenuElements)
    },
})