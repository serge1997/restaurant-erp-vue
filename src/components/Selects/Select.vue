<template>
    <div class="d-flex flex-column">
        <label :class="labelClass" v-if="label">{{ label }}</label>
        <label :class="labelClass" v-else>
            <slot name="label"></slot>
        </label>
        <Dropdown 
            :class="`${error ? 'input-error' : ''} ${inputCustomClass}`"
            :filter="hasFilter"
            :modelValue="modelValue"
            :options="options" 
            :option-label="optionLabel"
            :option-value="optionValue"
            :placeholder="placeholder" 
            @update:modelValue="$emit('update:modelValue', $event)"
            @filter="$emit('onFilter', $event)"
            @change="$emit('change', $event)"
            @hides="$emit('hide')"
            :disabled="isDisable"
        >
            <template #option="slotProps">
                <span v-if="!$slots['options']" class="p-dropdown-item-label">{{  slotProps.option[optionLabel]}}</span>
                <slot name="options" :option="slotProps.option"></slot>
            </template>
        </Dropdown>
        <small class="text-danger px-1 s-sm" v-if="error">{{ error }}</small>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Dropdown from 'primevue/dropdown';

export default defineComponent({
    components: {
        Dropdown
    },
    props: {
        modelValue: {
            required: false
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
        error: String,
        hasFilter: {
            type: Boolean,
            default: false
        },
        isDisable: {
            type: Boolean,
            default: false
        },
        labelClass: String,
        inputCustomClass: String
    }
})
</script>