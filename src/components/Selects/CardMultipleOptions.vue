<template>
    <div :style="`height: ${height}`" class="d-flex flex-column w-100 mt-2 gap-2">
        <div v-if="hasSearch" class="w-100 mb-1">
            <IconField iconPosition="left">
                <InputIcon class="pi pi-search"> </InputIcon>
                <InputText @input="onSearch($event)" class="rounded-0" placeholder="pesquisar..." />
            </IconField>
        </div>
        <ScrollPanel :style="`height: ${scrollHeight};`">
            <div 
                v-if="isCheckbox" 
                class="d-flex options-item-list align-items-center mb-3 border py-2 px-2" 
                v-for="option in opts"
            >
                <Checkbox
                    :model-value="modelValue"
                    :value="option.id"
                    @update:model-value="$emit('update:model-value', $event)"
                />
               <div class="d-flex flex-column px-2">
                <label class="options-item-list-name">{{ option.name }}</label>
                <small class="px-1 options-item-list-desc">{{ option.description }}</small>
               </div>
            </div>
            <div v-else class="d-flex options-item-list align-items-center mb-3" v-for="option in opts">
                <RadioButton
                    :model-value="modelValue"
                    :value="option.id"
                    @update:model-value="$emit('update:model-value', $event)"
                />
                <div class="d-flex flex-column px-2">
                    <label class="options-item-list-name">{{ option.name }}</label>
                    <small class="px-1 options-item-list-desc">{{ option.description }}</small>
               </div>
            </div>
        </ScrollPanel>
    </div>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from "primevue/inputtext";
import ScrollPanel from "primevue/scrollpanel";
import RadioButton from 'primevue/radiobutton';

interface MultipleOptions {
    id: number | boolean
    name: string
    description?: string
}
export default defineComponent({
    name: "CardMultipleOptions",
    
    components: {
        IconField,
        InputIcon,
        InputText,
        ScrollPanel,
        RadioButton
    },
    props: {
        modelValue: {
            type: Object || Boolean || Number,
            required: false
        },
        label: {
            type: String,
            required: false
        },
        options: {
            type: Array as PropType<MultipleOptions[]>,
            required: true
        },
        type: {
            type: String,
            default: "checkbox"
        },
        hasSearch: {
            type: Boolean,
            default: false
        },
        height: {
            type: String,
            default: '100%'
        },
        scrollHeight: {
            type: String,
            default: '300px'
        }
    },
    data(){
        return {
            searchresults: [] as MultipleOptions[]
        }
    },
    computed: {
       opts() {
        if (!this.searchresults.length){
            return this.options
        }
        return this.searchresults
       },
       isCheckbox(){
        return this.type === "checkbox"
       }
    },
    methods: {
        onSearch(event: InputEvent) {
            this.searchresults = []
            const value = (event.target as any).value as string
            this.searchresults = this.options.filter(op => op.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()))

        }
    }
})

</script>

<style scoped>
.p-inputtext {
    border: 0px !important;
    border-bottom: 1px solid #D9D9D9 !important;
}
</style>