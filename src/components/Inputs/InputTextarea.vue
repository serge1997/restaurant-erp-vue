<template>
    <div class="d-flex flex-column w-100">
        <label v-if="label">{{ label }}</label>
        <label v-else>
            <slot name="label"></slot>
        </label>
        <Textarea
            :placeholder="placeholder"
            :class="error ? 'input-error' : ''"
            :model-value="modelValue"
            @update:model-value="$emit('update:model-value', $event)"
            @blur="$emit('blur')"
        />
        <small class="c-danger px-1 s-sm" v-if="error">{{ error }}</small>
    </div>
</template>

<script lang="ts">
import Textarea from 'primevue/textarea';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        Textarea
    },
    props: {
        modelValue: {
            required: false,
            type: String
        },
        placeholder: String,
        label: String,
        error: String
    }
})
</script>