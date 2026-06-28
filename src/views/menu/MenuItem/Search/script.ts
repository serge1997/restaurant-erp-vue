import { defineComponent, reactive } from 'vue';
import type { FilterOption } from '@/shared/utility/types/filterOption';
import MultipleOptions from '@/components/Selects/MultipleOptions.vue';
import { useSearchMixin } from '@/mixins/useSearchMixin';
export default defineComponent({
    name: 'Search',

    components: {
        MultipleOptions
    },

    setup(props, {emit}){
        const search = reactive({
            features: [0],
            categories: [0],
            is_active: true
        })
        const filters = reactive<FilterOption[]>([
            {
                label: "Categorias",
                icon: "pi-sparkles",
                slot: "categories",
                hidden: true,
                selectionLenght: 0
            },
            {
                label: "Destaques",
                icon: "pi-sparkles",
                slot: "features",
                hidden: false,
                selectionLenght: 0
            }
        ])
        const {
            clearSearchInputs,
        } = useSearchMixin(filters, search, emit)
        return {
            search,
            clearSearchInputs,
        }
    },
    props: {
        options: {
            type: Object,
            required: true
        }
    },
    data(){
        return {
            filters: {
                categories: [],
                features: [],
                default: {id: 0, name: "Todos"}
            }
        }
    },
    methods: {
        onSearch(params: any) {
            const allParams = {...params, ...this.search}
            this.$emit('search', {query: allParams})
        }
    },

    mounted(){
        const populateCategoryInterval = setInterval(() => {
            if (this.options.categories?.length){
                this.filters.categories = [...[this.filters.default], ...this.options.categories] as any
                clearInterval(populateCategoryInterval)
            }
        }, 100)
        const populateFeaturesInterval = setInterval(() => {
            if(this.options.featureMenuitems?.length){
                this.filters.features = [...[this.filters.default], ...this.options.featureMenuitems] as any
                clearInterval(populateFeaturesInterval)
            }
        }, 200)
    }
})