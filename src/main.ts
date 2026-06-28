import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import register from './component-register';
import App from './App.vue'
import router from './router'
import { i18n } from '@/i18n';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import { authMiddleware } from './router/auth.middleware';

const app = createApp(App)
register(app)
app.use(PrimeVue, {
    locale: {
        firstDayOfWeek: 0,
        startsWith: 'Começa com',
        contains: 'Contém',
        notContains: 'Não contém',
        endsWith: 'Termina com',
        equals: 'Igual',
        notEquals: 'Diferente',
        noFilter: 'Sem filtro',
        today: 'Hoje',
        clear: 'Limpar',
        emptyMessage: 'Sem opções disponíveis',
        monthNames: [
        'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
        'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'
        ],
        monthNamesShort: [
        'Jan','Fev','Mar','Abr','Mai','Jun',
        'Jul','Ago','Set','Out','Nov','Dez'
        ],
        dayNames: [
        'Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'
        ],
        dayNamesShort: [
        'Dom','Seg','Ter','Qua','Qui','Sex','Sáb'
        ],
        dayNamesMin: [
        'D','S','T','Q','Q','S','S'
        ]
    }
})
authMiddleware(router)
app.use(createPinia())
app.use(i18n)
app.use(router)
app.use(ToastService)
app.use(ConfirmationService)

app.mount('#app')
