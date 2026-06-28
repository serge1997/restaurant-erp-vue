<template>
    <div class="svg-grid">
        <div 
            v-for="icon in icons"
            class="svg-option"
            @click="setSelectedIcon(icon)"
            :class="setSelectedClass(icon)"
        >
            <i :class="icon.icon"></i>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    name: "IconPicker",

    props: {
        form: Object
    },

    data() {
        return {
            icons: [
                {icon:`pi pi-sun`},
                {icon:`pi pi-ticket`},
                {icon:`pi pi-shield`},
                {icon: "pi pi-lightbulb"},
                {icon: "pi pi-tiktok"},
                {icon: "pi pi-building-columns"},
                {icon: "pi pi-heart-fill"},
                {icon: "pi pi-building"},
                {icon: "pi pi-star-fill"},
                {icon: "pi pi-sparkles"}
            ],
            selected: {icon:`pi pi-sun`} as any
        }
    },
    methods: {
        setSelectedIcon(icon: any) {
            this.selected = icon
            this.$emit("setIcon", icon)
        },
        setSelectedClass(icon: any){
            if (this.selected.icon == icon.icon){
                return "svg-option-selected"
            }
        }
    },
    mounted() {
        if (!this.form?.id){
            this.setSelectedIcon(this.selected)
        }
    },
})
</script>

<style scoped>
.svg-grid{
    display:grid;
    grid-template-columns:repeat(5,1fr);
    gap:5px;
}
.svg-option{
    width:100%;
    aspect-ratio:1;
    border-radius:7px;
    border:1px solid #E0E3E8;
    background: #F6F7F8;
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
    transition:all .12s;
    color: #7E959E;
}
.svg-option:hover{
    border-color: #0E7C7B;
    background: #EAF5F5;
}
.svg-option-selected{
    border-color: #0E7C7B;
    background: #EAF5F5;
}

</style>