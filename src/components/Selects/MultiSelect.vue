<template>
    <div class="d-flex flex-column">
        <label v-if="label">{{ label }}</label>
        <label v-else :class="labelClass">
            <slot name="label"></slot>
        </label>
        <MultiSelect 
            :model-value="modelValue"
            display="chip" 
            :options="options" 
            :option-label="optionLabel"
            :option-value="optionValue"
            :placeholder="placeholder"
            @update:model-value="$emit('update:model-value', $event)"
            @change="$emit('change', $event)"
        />
    </div>
</template>
<script lang="ts">
import MultiSelect from 'primevue/multiselect';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        MultiSelect
    },
    props: {
        modelValue: {
            required: false,
        },
        placeholder: String,
        label: String,
        options: {
            type: Array,
            required: true
        },
        optionLabel: {
            type: String,
            default: 'name'

        },
        optionValue: {
            type: String,
            default: 'id'
        },
        labelClass: String
    }
})
</script>