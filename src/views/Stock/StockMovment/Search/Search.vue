<template>
   
    <InlineSearch
        @on-search="onSearch"
        :menuFiltersOptions="filters"
        @clear-filter="clearFilter"
        :hasActiveFilter="false"
        searchInputPlaceholder="Pesquisar por nome do produto"
    >
            <template #filters>
                <div class="fg" style="width: 240px;">
                    <MultiSelect
                        :options="products" 
                        v-model="search.products"
                        placeholder="Filtrar por produtos"
                    />
                </div>
            </template>
            <template #delivery_date>
                <div class="w-100 d-flex flex-column">
                    <DatePicker
                        label="De"
                        class="mb-2"
                        v-model="dates.lastMovFrom"
                        customInputClass="bg-surface2"
                    />
                    <DatePicker
                        label="Até"
                        v-model="dates.lastMovTo"
                        customInputClass="bg-surface2"
                    />
                </div>
            </template>
            <template #categories>
                <MultipleOptions
                    :options="options.productCategories" 
                    v-model="search.categories"
                />
            </template>
            <template #suppliers>
                <MultipleOptions
                    :options="options.suppliers" 
                    v-model="search.suppliers"
                />
            </template>
            <template #reference_types>
                <MultipleOptions
                    :options="stockMovmentTypeToOptions" 
                    v-model="search.reference_types"
                />
            </template>
            <template #visualization_type>
                <MultipleOptions
                    :options="visualization_types" 
                    v-model="search.visualization_type"
                    type="radio"
                />
            </template>
    </InlineSearch>
    <div class="filter-bar d-none">
        <div class="filter-row">
            <div class="fg dt">
                <small class="s-smd">Data ultima movimentaçao</small>
                <DatePicker 
                    labelClass="search"
                    label="De"
                    customInputClass="bg-surface2"
                    v-model="dates.lastMovFrom"
                />
            </div>
            <div class="fg dt">
                <DatePicker 
                    labelClass="search"
                    label="Até"
                    customInputClass="bg-surface2"
                    v-model="dates.lastMovTo"
                />
            </div>
           
            <div class="fg" style="width: 200px">
                <MultiSelect
                    :options="options.productCategories" 
                    v-model="search.categories"
                    label="Categoria dos produtos"
                    placeholder="Selecione as categorias"
                />
            </div>
            <div class="fg" style="width: 200px">
                <MultiSelect
                    :options="options.suppliers" 
                    v-model="search.suppliers"
                    label="Fornecedor"
                    placeholder="Selecione os fornecedores"
                />
            </div>
            <div class="fg" style="width: 220px">
                <MultiSelect
                    :options="products" 
                    v-model="search.products"
                    label="Produtos"
                    placeholder="Selecione os produtos"
                />
            </div>
            <div style="width: 78px;" class="fg btn-button">
                <span>
                    <Button 
                        class="btn-green-primary" 
                        label="Filtrar" 
                        icon="pi pi-filter s-md"
                        @click="onSearch"
                    />
                </span>
            </div>
            <div style="width: 67px;" class="fg btn-button">
                <span>
                    <Button 
                        class="btn-white-primary" 
                        label="Limpar"
                        icon="pi pi-times s-md" 
                        @click="clearFilter"
                    />
                </span>
            </div>
        </div>
    </div>

</template>

<script lang="ts">
import { defineComponent, reactive, type PropType } from 'vue';
import { dateEngFormat, removeObjEmptyProp } from '@/shared/utility';
import MultipleOptions from '@/components/Selects/MultipleOptions.vue';
import type { SupplierProps } from '@/types/supplier/Supplier';
import type { ProductCategoryProps } from '@/types/productCategory/ProductCategory';
import productService from '@/services/productService';
import { stockMovmentTypeOptions } from '@/types/stockMovment/StockMovment';
import type { FilterOption } from '@/shared/utility/types/filterOption';
import { useSearchMixin } from '@/mixins/useSearchMixin';
interface Options {
    suppliers: SupplierProps[],
    productCategories: ProductCategoryProps[]
}
export default defineComponent({
    name: 'Search',

    components: {
        MultipleOptions
    },
    props: {
      options: {
        type: Object as PropType<Options>,
        required: true
      }
    },
    setup(props, { emit }){
        const search = reactive({
            delivery_dateFrom: null,
            delivery_dateTo: null,
            moved_dateFrom: null,
            moved_dateTo: null,
            categories: [],
            products: [],
            suppliers: [],
            reference_types: [],
            visualization_type: true
        }) as any
        const filters = reactive<FilterOption[]>([
            {
                label: "Data de entrada",
                title: "Filtrar por data de entrada",
                icon: "pi-calendar",
                slot: "delivery_date",
                hidden: true,
                selectionLenght: 0
            },
            {
                label: "Categoria dos produtos",
                icon: "pi-box",
                title: "Filtrar por categoria de produto",
                slot: "categories",
                hidden: true,
                selectionLenght: 0
            },
            {
                label: "Fornecedor",
                icon: "pi-truck",
                slot: "suppliers",
                title: "Filtrar por fornecedor",
                hidden: true,
                selectionLenght: 0
            },
        ])
        const {
            clearSearchInputs,
            onSearchEvent,
            sumFiltersQuantity,
            incrementFiltersQuantity
        } = useSearchMixin(filters, search, emit)
        return {
            search,
            filters,
            clearSearchInputs,
            onSearchEvent,
            sumFiltersQuantity,
            incrementFiltersQuantity
        }
    },
    watch: {
        search: {
            handler(newVlaue){
                //this.incrementFiltersQuantity()
            },
            deep: true
        },
    },
    data() {
       return {
        dates: {
            lastMovFrom: null,
            lastMovTo: null,
        },
        products: [] as any[],
        query: {
        },
        stockMovementOptions: stockMovmentTypeOptions,
        visualization_types: [
            {id: true, name: "Movimentaçao resumida"},
            {id: false, name: "Toda movimentaçao"}
        ],
        defaultOptions: [
            {id: 0, name: "Todos"}
        ]
       }
    },
    computed: {
        stockMovmentTypeToOptions(){
            const result: {id: number, name: string}[]= [];
            stockMovmentTypeOptions.map(el => {
                result.push({id: el.value, name: el.label})
            })
            return result;
        },
        getSumFilterQuantity() {
            //return this.sumFiltersQuantity()
        }
    },
    methods: {
        async onSearch(params: any) {
            const allParams = {...params, ...this.search}
            this.$emit('on-filter', {query: allParams})
        },
        
        async getProducts() {
            const response = await productService.getAll({})
            this.products = response.data
        },
        clearFilter() {
           this.clearSearchInputs()
            this.dates = {
                lastMovFrom: null,
                lastMovTo: null
            }
        }
    },
    async mounted() {
        await this.getProducts()
        this.onSearch(this.search)
    },
})
</script>