<template>
    <div class="color-grid">
        <div 
            v-for="color in colors"
            class="color-option"
            :style="`background-color: ${color.val};`"
            @click="selectedColor(color)"
        >
            <i :class="selectedClass(color)"></i>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "ColorPicker",

    props: {
        form: Object
    },
    data() {
        return {
            colors: [
                {val:'#0E7C7B',label:'Teal'},
                {val:'#2563EB',label:'Azul'},
                {val:'#7C3AED',label:'Roxo'},
                {val:'#059669',label:'Verde'},
                {val:'#D97706',label:'Âmbar'},
                {val:'#DC2626',label:'Vermelho'},
                {val:'#0F172A',label:'Escuro'},
                {val:'#64748B',label:'Cinza'},
            ],
            selected: {val:'#0E7C7B',label:'Teal'} as any
        }
    },
    computed: {
    },
    methods: {
        selectedColor(color: any) {
            this.selected = color
            this.$emit("setColor", color)
        },
        selectedClass(color: any) {
            if (this.selected?.val == color.val) {
                return "pi pi-check text-white s-sm"
            }
        }
   },
   mounted() {
    if (!this.form?.id){
        this.selectedColor(this.selected)
    }
   },
})
</script>
<style scoped>
.color-grid{
    display:flex;
    gap:6px;flex-wrap:wrap;
}
.color-option{
    width:26px;
    height:26px;
    border-radius:6px;
    cursor:pointer;
    border:2px solid transparent;
    transition:all .12s;
    display:flex;
    align-items:center;
    justify-content:center;
}
.color-option:hover{
    transform:scale(1.1);
}
</style>