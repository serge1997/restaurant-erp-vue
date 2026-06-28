<template>
    <SearchTemplate
        :has-filters="false"
        @on-search="onSearch"
    >

    </SearchTemplate>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Search',

    methods: {
        onSearch(params) {
            const allParams = {...params, ...this.query}
            this.$emit('search', allParams)
        }
    }
})
</script>