<template>
    <Button 
        text 
        :disabled="isDisable"
        :class="`${isDisable ? 'disabled' : ''}`"
    >
        <span class="d-flex gap-2 align-items-center">
            <span class="w-auto" v-if="icon && !iconPositionIsRight" :class="`${icon} ${iconColor}`"></span>
            <span class="label" v-if="label">{{ label }}</span>
            <span class="w-auto" v-if="icon && iconPositionIsRight" :class="`${icon} ${iconColor}`"></span>
            <slot name="badge"></slot>
            <slot name="svg"></slot>
        </span>
    </Button>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Button from 'primevue/button';

export default defineComponent({
    components: {
        Button
    },
    props: {
        label: String,
        icon: {
            type: String,
        },
        iconColor: String,
        isDisable: {
            type: Boolean,
            default: false
        },
        loading: Boolean,
        iconPosition: {
            type: String,
            default: 'right'
        }
    },

    computed: {
        iconPositionIsRight(){
            return this.iconPosition == 'right'
        }
    }
})
</script>

<style scoped>
.btn-button .p-button {
    padding: 3px 11px 3px 11px !important;
    font-size: .8em !important;
    font-weight: 500;
}

.p-button:disabled{
    pointer-events: none;
}
.p-button.p-disabled {
    cursor: not-allowed !important;
}
</style>