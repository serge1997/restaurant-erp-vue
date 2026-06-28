<template>
    <SearchTemplate
        @on-search="onSearch"
        :hasFilters="false"
    >
    </SearchTemplate>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
    },
    data(){
        return {
            query: {
            }
        }
    },
    methods: {
        onSearch(params: any) {
            const allParams = {...params, ...this.query}
            this.$emit('search', allParams)
        }
    }
})
</script>