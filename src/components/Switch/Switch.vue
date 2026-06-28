<template>
    <div class="d-flex gap-2 w-50 mt-2">
        <InputSwitch
            :model-value="modelValue"
            @update:model-value="$emit('update:model-value', $event)" 
        />
        <label v-if="label">{{ getLabel }}</label>
        <slot v-else name="label"></slot>
    </div>
</template>
<script lang="ts">
import InputSwitch from 'primevue/inputswitch';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        InputSwitch
    },
    props: {
        modelValue: {
            required: false,
            type: Boolean
        },
        label: {
            type: String,
            default: 'Ativo'
        },
    },
    computed: {
        getLabel() {
            if (this.label.toLocaleLowerCase() == "ativo" || this.label.toLocaleLowerCase() == "inativo") {
                if (this.modelValue === true) return 'Ativo'
                return 'Inativo'
            }
            return this.label
        }
    },
})
</script>
