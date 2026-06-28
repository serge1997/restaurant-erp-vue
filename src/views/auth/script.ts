import authService from "@/services/authService";
import { useAuthStore } from "@/stores/authStore";
import Divider from "primevue/divider";
import { defineComponent } from "vue";

export default defineComponent({
    name: "LoginView",

    components: {
        Divider
    },

    setup(props, ctx) {
        const authStore = useAuthStore()

        return {
            authStore
        }
    },
    data() {
        return {
            loginBtnIcon: "pi-arrow-right",
            isDisable: false,
            form: {
                username: '',
                password: ''
            },
            loginErrorResponse: ''
        }
    },

    methods: {
        async login(){
            try{
                this.isDisable = true
                this.loginBtnIcon = "pi-spinner load-spinner"
                const response = await authService.login(this.form)
                this.authStore.storage = response.data
                this.authStore.store()
            }catch(e: any){
                this.loginErrorResponse = e.response?.data?.message || e.message
            }finally{
                this.loginBtnIcon = "pi-arrow-right"
                this.isDisable = false
            }
        }
    }
})