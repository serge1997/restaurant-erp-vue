<template>
    <div class="sec-label d-flex align-item-center gap-1 mb-3 s-md">
        <span v-if="icon" class="d-flex align-items-center"><i :class="`pi ${icon}`"></i></span>
       <span :class="titleClass"> {{ title }}</span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        title: {
            type: String,
            required: true
        },
        icon: String,
        titleClass: {
            type: String,
            default: ""
        }
    },
})
</script>