<template>
    <div class="d-flex flex-column w-100 mb-2">
        <label v-if="label">{{ label }}</label>
        <label v-else>
            <slot name="label"></slot>
        </label>
        <InputMask
            v-model="internValue"
            :mask="mask"
            :placeholder="placeholder"
        />
    </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import InputMask from 'primevue/inputmask';

export default defineComponent({
    components: {
        InputMask
    },
    setup(props, {emit}){
        const internValue = computed({
            get: () => props.modelValue,
            set: (value) => emit('update:modelValue', value)
        })
        return {internValue}
    },
    props: {
        modelValue: {
            required: false,
            type: [String]
        },
        placeholder: {
            type: String,
            default: '00.00'
        },
        mask: {
            type: String,
            default: '99.99'
        },
        label: String
    }
})
</script>