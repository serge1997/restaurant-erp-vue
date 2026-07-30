import FormTemplate from '@/components/template/FormTemplate/FormTemplate.vue'
import PageTemplate from '@/components/template/PageTemplate/PageTemplate.vue'
import DataTableTemplate from '@/components/template/DataTableTemplate/DataTableTemplate.vue'
import PButton from "@/components/Button/PButton.vue";
import Sidebar from "primevue/sidebar";
import Input from "./components/Inputs/Input.vue";
import Switch from "./components/Switch/Switch.vue";
import Select from "./components/Selects/Select.vue";
import MultiSelect from "./components/Selects/MultiSelect.vue";
import InputTextarea from "./components/Inputs/InputTextarea.vue";
import InputMask from './components/Inputs/InputMask.vue';
import SearchTemplate from './components/template/SearchTemplate/SearchTemplate.vue'
import Badge from 'primevue/badge';
import DatePicker from './components/Inputs/DatePicker.vue';
import OverlayPanel from 'primevue/overlaypanel';
import TagTemplate from "@/components/template/TagTemplate/TagTemplate.vue"
import SectionTitle from './components/SectionTitle/SectionTitle.vue';
import MultipleOptions from './components/Selects/MultipleOptions.vue';
import CardMultipleOptions from './components/Selects/CardMultipleOptions.vue';
import Checkbox from 'primevue/checkbox';
import SuccessTemplate from './components/template/SuccessTemplate/SuccessTemplate.vue';
import Divider from 'primevue/divider';
import Tooltip from 'primevue/tooltip';
import InlineSearch from "@/components/template/InlineSearchTemplate/InlineSearchTemplate.vue"
import ResultTemplate from './components/template/Result/ResultTemplate.vue';

export default function register(app: any) {
    app.component('Button', PButton)
    app.component('Sidebar', Sidebar)
    app.component('Input', Input)
    app.component('Switch', Switch)
    app.component('Select', Select)
    app.component('MultiSelect', MultiSelect)
    app.component('FormTemplate', FormTemplate)
    app.component('DataTableTemplate', DataTableTemplate)
    app.component('Textarea', InputTextarea)
    app.component('InputMask', InputMask)
    app.component('PageTemplate', PageTemplate)
    app.component('SearchTemplate', SearchTemplate)
    app.component('Badge', Badge)
    app.component('DatePicker', DatePicker)
    app.component('OverlayPanel', OverlayPanel)
    app.component('TagTemplate', TagTemplate)
    app.component("SectionTitle", SectionTitle)
    app.component('MultipleOptions', MultipleOptions)
    app.component('CardMultipleOptions', CardMultipleOptions)
    app.component('Checkbox', Checkbox)
    app.component('SuccessTemplate', SuccessTemplate)
    app.component('Divider', Divider)
    app.directive('tooltip', Tooltip);
    app.component('InlineSearch', InlineSearch)
    app.component('ResultTemplate', ResultTemplate)
}