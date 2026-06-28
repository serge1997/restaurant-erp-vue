<template>
    <InlineSearch
        :has-filters="false"
        @on-search="onSearch"
        searchInputPlaceholder="Pesquisar por nome, email..."
    >
    </InlineSearch>
</template>

<script lang="ts">
import { useSearchMixin } from '@/mixins/useSearchMixin';
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'Search',

    setup(props, ctx) {
       
    },
    data(){
        return {
            query:{}
        }
    },

    methods:{
        onSearch(params: any) {
            this.$emit('on-filter', {query: params})
        },
    }

})
</script>