import { defineComponent, reactive, ref, type PropType } from "vue";
import RadioButton from 'primevue/radiobutton';
import Menu from "primevue/menu";
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
//import { Filter, type FilterProps } from "@/types/filter/filter";
import { Filter, type FilterOption } from "@/shared/utility/types/filterOption";

export default defineComponent({
    name: 'InlineSearchTemplate',

    components:{
        RadioButton,
        IconField,
        InputIcon,
        InputText,
        Menu
    },

    setup(){
        const filters = ref<FilterOption[]>([
            {
                label: 'Status',
                title: 'Filtrar por status',
                selectionLenght: 1,
                hidden: false
            }
        ]);
        const mountFilters = (menuFiltersOptions: FilterOption[], hasActiveFilter: boolean) => {
            if (menuFiltersOptions?.length){
                if(!hasActiveFilter){
                    filters.value.splice(0, 1)
                }
                filters.value.push(...menuFiltersOptions)
                filters.value[0]!.hidden = false
            }
        }
        return {
            filters,
            mountFilters
        }
    },

    props: {
        hasActiveFilter: {
            type: Boolean,
            default: true
        },
        menuFiltersOptions: {
            type: Array<FilterOption> as PropType<FilterOption[]>
        },
        sumFiltersQuantity: Number,
        searchInputPlaceholder: {
            type: String,
            default: 'search...'
        }
    },

    computed: {
    },
    data(){
        return {
            query: {
                is_active: true,
                search: null
            },
            currentFilter: {} as Filter
            //filersMenu: null as any
        }
    },
    methods: {
        toggleFiltersMenu(event: any) {
            (this.$refs.filtersMenu as any).toggle(event)
        },
        setActiveFilter(index: number) {
            this.filters.forEach((v, i) => {
                if (index != i ) {
                    this.filters[i]!.hidden = true
                }
            })
            this.filters[index]!.hidden = false
        },
        clearFilters(){
            this.query = {
                is_active: true,
                search: null
            }
            this.$emit('on-clearFilter');
            this.$emit('on-search', this.query)
        }
    },
    mounted() {
        this.mountFilters(this.menuFiltersOptions as FilterOption[], this.hasActiveFilter)
    },
})