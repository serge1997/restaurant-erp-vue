<script lang="ts" setup>



const props = defineProps({
    isSucess: {
        type: Boolean,
        default: true
    },
    title: String,
    content: String
})
</script>

<template>
    <div class="d-flex flex-column align-items-center justify-content-center p-5">
        <div v-if="isSucess" class="ts ts-success ts-ico-success">
            <svg viewBox="0 0 22 22" fill="none"><path d="M4 11l5 5 9-9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div v-else class="ts ts-danger ts-ico-danger">
            <svg viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="11" r="9" stroke="currentColor" stroke-width="2"/>
                <path d="M7 7l8 8M15 7l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
        </div>
        <div class="ts-title">{{ title }}!</div>
        <div class="scs-desc">{{ content }}</div>
        <slot name="content"></slot>
        <slot name="actions"></slot>
    </div>
</template>