<template>
    <div class="d-flex flex-column w-100">
        <label :class="labelClass" v-if="label">{{ label }}</label>
        <label :class="labelClass" v-else>
            <slot name="label"></slot>
        </label>
        <InputText
            v-if="!mask"
            class="py-1" 
            :class="`${error ? 'input-error' : ''} ${inputCustomClass}`"
            :model-value="modelValue"
            :placeholder="placeholder" 
            @update:model-value="$emit('update:model-value', $event)"
            @blur="$emit('blur')"
            @input="$emit('input')"
            :disabled="isDisable"
            :type="type"
        />
        <InputMask
            v-else
            :mask="mask"
            class="py-1" 
            :class="`${error ? 'input-error' : ''} ${inputCustomClass}`"
            :model-value="modelValue"
            :placeholder="placeholder" 
            @update:model-value="$emit('update:model-value', $event)"
            @blur="$emit('blur')"
            :disabled="isDisable"
        />
        <small class="c-danger px-1 s-sm" v-if="error">{{ error }}</small>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/InputMask';
export default defineComponent({
    components: {
        InputText,
        InputMask
    },
    name: 'Input',
    props: {
        modelValue: String,
        placeholder: String,
        label: String,
        error: String,
        isDisable: {
            type: Boolean,
            default: false
        },
        labelClass: String,
        inputCustomClass: String,
        mask: String,
        type:{
            type: String,
            default: "text"
        }
    }
})
</script>