<template>
    <div class="d-flex flex-column"
        @click.stop
        @mousedown.stop
        @mouseup.stop
    >
        <label :class="labelClass" v-if="label">{{ label }}</label>
        <label v-else :class="labelClass">
            <slot name="label"></slot>
        </label>
        <Calendar
            :class="`${customInputClass}`"
            :modelValue="modelValue"
            :show-icon="showIcon"
            iconDisplay="input"
            :time-only="timeOnly"
            @update:modelValue="$emit('update:modelValue', $event)"
            date-format="dd/mm/yy"
            appendTo="self"
            key="from"
            :placeholder="placeholder"
        />
    </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import Calendar from 'primevue/calendar';

export default defineComponent({
    name: "DatePicker",
    components: {
        Calendar
    },
    props: {
        modelValue: {
            type: [Date, null],
            default: new Date()
        },
        label: String,
        timeOnly: {
            type: Boolean,
            default: false
        },
        showIcon: {
            type: Boolean,
            default: true
        },
        labelClass: String,
        customInputClass: String,
        placeholder: {
            type: String,
            default: "informe a data"
        }
    },

    computed: {
        getModelValue(){
            return this.modelValue
        },
        onDateSelected(event: any) {
            console.log(event)
        }
    }
})
</script>