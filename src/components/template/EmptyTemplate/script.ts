import { defineComponent } from "vue";

export default defineComponent({
    name: "EmptyTemplate",

    props: {
        hasSuggestion: {
            type: Boolean,
            default: false
        },
        suggestionText: {
            type: String,
            default: "Tente ajustar os filtros ou a busca"
        },
        message: {
            type: String,
            default: "Nenhum registro encontrado"
        },
        useSearchIcon: {
            type: Boolean,
            default: false
        },
        useBanIcon: {
            type: Boolean,
            default: false
        },
        iconSize: {
            type: String,
            default: "2rem"
        }
    }
})