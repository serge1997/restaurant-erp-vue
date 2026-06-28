<template>
    <InlineSearch
        @onSearch="onSearch"
        @clearFilter="clearSearchInputs"
        :sumFiltersQuantity="sumFiltersQuantity()"
    >
        <template #filters>
            <div class="fg w-280px">
                <Select
                    labelClass="search"
                    inputCustomClass="b-bg-surface2"
                    v-model="query.category_id"
                    :options="filters.categories"
                    label="Categorias"
                />
            </div>
        </template>
    </InlineSearch>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import type {FormOptions} from '@/types/products/Product.ts'
import type { PropType } from 'vue';
import RadioButton from 'primevue/radiobutton';
import { removeObjEmptyProp } from '@/shared/utility';
import { useSearchMixin } from '@/mixins/useSearchMixin';
import { all } from 'axios';

export default defineComponent({
    name: 'Search',

    components: {
        RadioButton
    },
    props: {
        options: {
            type: Object as PropType<FormOptions>
        }
    },
    setup(props, ctx) {
        const query = reactive({
            category_id: 0,
            is_active: true
        })
        const {
            clearSearchInputs,
            sumFiltersQuantity
        } = useSearchMixin([], query, ctx.emit)
        return {
            query,
            clearSearchInputs,
            sumFiltersQuantity
        }
    },
    data() {
       return {
        filters: {
            categories: [],
            default: {id: 0, name: "Todos"}
        }
       }
    },
    methods: {
        onSearch(params: any) {
            this.query.is_active = params.is_active
            const filtered = removeObjEmptyProp(this.query)
            const allParams = {...params, ...filtered}
            this.$emit('search', {query: allParams})
        }
    },

    mounted() {
        const categoryInterval = setInterval(() => {
            if (this.options?.categories) {
                this.filters.categories = [...[this.filters.default], ...this.options.categories] as any
                clearInterval(categoryInterval)
            }
        }, 200)
    }
})
</script>