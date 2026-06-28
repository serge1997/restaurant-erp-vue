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
        toggleMenu(event: any) {
            (this.$refs.menu as any).toggle(event)
        }
    }
})