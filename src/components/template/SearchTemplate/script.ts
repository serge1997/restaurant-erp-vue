import { defineComponent, type PropType } from "vue";
import Dialog from "primevue/dialog";
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import ScrollPanel from "primevue/scrollpanel";
import Badge from "primevue/badge";
import MultipleOptions from "@/components/Selects/MultipleOptions.vue";

interface FilterOption {
    label: string
    icon: string
    slot: string
    hidden: boolean
    selectionLenght: number
}
export default defineComponent({
    components: {
        Dialog,
        InputIcon,
        InputText,
        IconField,
        Checkbox,
        ScrollPanel,
        Badge,
        MultipleOptions
    },
    props: {
        hasFilters: {
            type: Boolean,
            default: true
        },
        searchQueryCount: Number,
        filters: {
            type: [] as PropType<FilterOption[]>,
            required: true
        },
        hasStatus: {
            type: Boolean,
            default: true
        }
    },
    data(){
        return {
            query: {
                search: '',
                is_active: true
            },
            visibleSearchFiltersDialog: false,
            activesOptions: [
                {id: true, name: "Ativo"},
                {id: false, name: "Inativo"}
            ],
            isActiveIsVisible: false,
            currentSlot: '',
            isStatusSlot: false
            
        }
    },
    computed: {
        getCurrentFilterSlot(){
            if (!this.currentSlot && !this.isStatusSlot){
                return this.filters[0]?.slot
            }
            return this.currentSlot
        },
        getStatusActiveClass(){
            if (this.isActiveIsVisible){
                return "active-filter";
            }
            return null
        },
        sumFiltersQuantity() {
            if (this.filters){
                let sum = this.filters.reduce(
                    (acc, current) => acc + current.selectionLenght,
                    0
                )
                if (this.hasStatus) {
                    sum += 1;
                }
                return sum
            }
            return null
        }
    },
    methods: {
        getActiveFilterClass(filer: FilterOption) {
            return filer.hidden == true ? "active-filter" : ""
        },
        openFilterDialog(){
            this.visibleSearchFiltersDialog = true
        },
        search() {
            this.$emit('on-search', this.query)
        },
        toggleFilterSlot(slot: string) {
            const currentIndex = this.filters?.findIndex(f => f.slot == slot)
            this.currentSlot = this.filters[currentIndex]!.slot || ''
            this.isStatusSlot = false
            this.filters.map(f => {
                if (f.hidden) f.hidden = false
            })
            if (this.filters[currentIndex]) {
                this.filters[currentIndex].hidden = true
            }
            this.isActiveIsVisible = false
        },
        setStatusVisible() {
            this.filters?.map(f => f.hidden = false)
            this.isStatusSlot = true
            this.currentSlot = ''
            this.isActiveIsVisible = true
        }
    },
    mounted() {
        console.log(this.$slots.delivery_date)
    },

})