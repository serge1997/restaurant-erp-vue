<template>
    <div style="height: 100%;" class="d-flex w-100 flex-column gap-2 mt-2">
        <div v-if="hasSearch" class="w-100 mb-1">
            <IconField iconPosition="left">
                <InputIcon class="pi pi-search"> </InputIcon>
                <InputText @input="onSearch($event)" class="rounded-0" placeholder="pesquisar..." />
            </IconField>
        </div>
        <div>
            <ScrollPanel :style="{height: '22rem'}">
                <div v-if="isCheckbox" :class="optionBoxClasses" class="d-flex">
                        <div class="d-flex align-items-center mb-3" v-for="option in opts"
                            :key="option[optionValue]"
                        >
                            <Checkbox
                                type="checkbox"
                                :modelValue="modelValue"
                                :value="option[optionValue]"
                                @update:modelValue="$emit('update:model-value', $event)"
                            />
                            <label>{{ option[optionLabel] }}</label>
                        </div>
                </div>
                <div v-else :class="optionBoxClasses" class="d-flex">
                        <div class="d-flex align-items-center mb-3" v-for="option in opts">
                            <RadioButton
                                :model-value="modelValue"
                                :value="option.id"
                                @update:modelValue="$emit('update:model-value', $event)"
                            />
                            <label>{{ option.name }}</label>
                        </div>
                </div>
            </ScrollPanel>
        </div>
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
     [key: string]: any
}
export default defineComponent({
    name: "MultipleOptions",
    
    components: {
        IconField,
        InputIcon,
        InputText,
        ScrollPanel,
        RadioButton
    },
    props: {
        modelValue: {
            type: [Object, Array, Number, Boolean, String],
            required: false,
            default: () => []
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
            default: true
        },
        height: {
            type: String,
            default: "350px"
        },
        optionValue: {
            type: String,
            default: "id"
        },
        optionLabel: {
            type: String,
            default: "name"
        },
        optionBoxClasses: {
            type: String,
            default: "flex-column gap-1"
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
            this.searchresults = this.options.filter(op => op[this.optionLabel].toLocaleLowerCase().includes(value.toLocaleLowerCase()))
        },
        handle(event: any){
            console.log(event)
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