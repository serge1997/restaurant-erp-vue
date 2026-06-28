<template>
    <Tag
        :value="flag?.label || label"
        icon="pi pi-tag"
        severity="secondary"
        class="px-2 rounded-1 cursor-p border px-2 fw-normal s-sm"
        :class="flag?.severity"
    />
</template>

<script lang="ts">
import type { Tag as ITag } from "@/types/Flag/Flag";
import { defineComponent } from "vue";
import type { PropType } from "vue";
import Tag from "primevue/tag";
import Menu from "primevue/menu";
import type { MenuItem } from "primevue/menuitem";

export default defineComponent({
    name: "TagTemplate",

    components: {
        Tag,
        Menu
    },

    props: {
        flag: {
            type: Object as PropType<ITag>,
            required: false
        },
        flags: {
            type: Array as PropType<MenuItem[]>,
            default: []
        },
        label: {
            type: String,
            default: "Status"
        }
    },

    methods: {
    }
})
</script>