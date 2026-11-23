import { defineComponent, type PropType } from "vue";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import Select from "@/components/Selects/Select.vue";
import { FeaturedMenuItemEnum, featureMenuitemOptions } from "@/types/menuItem/MenuItem";
import type { MenuCategoryProps } from "@/types/menuCategory/MenuCategory";

export interface MenuFilterTag {
    id: number
    name: string
    icon?: string
    class?: string
}

export interface MenuFilterCookingTimeOption {
    id: number
    name: string
}

export interface MenuFilterState {
    search: string
    category: number | null
    mostOrdered: boolean
    maxCookingTime: number | null
    tags: number[]
}

const ALL_CATEGORIES_OPTION = { id: null, name: "Todas as categorias" }

const DEFAULT_COOKING_TIME_OPTIONS: MenuFilterCookingTimeOption[] = [
    { id: 10, name: "Até 10 min" },
    { id: 20, name: "Até 20 min" },
    { id: 30, name: "Até 30 min" },
]

const TAG_ICONS: Record<number, string> = {
    [FeaturedMenuItemEnum.CHEF_DISH]: "pi-crown",
    [FeaturedMenuItemEnum.NEW_DISH]: "pi-sparkles",
    [FeaturedMenuItemEnum.PROMOTION]: "pi-tag",
}

const TAG_CLASSES: Record<number, string> = {
    [FeaturedMenuItemEnum.CHEF_DISH]: "menu-filter-tag-chef",
    [FeaturedMenuItemEnum.NEW_DISH]: "menu-filter-tag-new",
    [FeaturedMenuItemEnum.PROMOTION]: "menu-filter-tag-promo",
}

export default defineComponent({
    name: "MenuFilter",

    components: {
        IconField,
        InputIcon,
        InputText,
        Select
    },

    props: {
        modelValue: {
            type: Object as PropType<MenuFilterState>,
            default: () => ({ search: "", category: null, mostOrdered: false, maxCookingTime: null, tags: [] })
        },
        categories: {
            type: Array as PropType<MenuCategoryProps[]>,
            default: () => []
        },
        topCategories: {
            type: Array as PropType<MenuCategoryProps[]>,
            default: () => []
        },
        cookingTimeOptions: {
            type: Array as PropType<MenuFilterCookingTimeOption[]>,
            default: () => DEFAULT_COOKING_TIME_OPTIONS
        },
        tags: {
            type: Array as PropType<MenuFilterTag[]>,
            default: () => featureMenuitemOptions.map(tag => ({ id: tag.id, name: tag.name }))
        },
        searchPlaceholder: {
            type: String,
            default: "Buscar prato ou bebida pelo nome..."
        },
        searchDebounce: {
            type: Number,
            default: 350
        }
    },

    emits: ["update:modelValue", "filter-change", "clear"],

    data() {
        return {
            searchText: this.modelValue?.search || "",
            selectedCategory: (this.modelValue?.category ?? null) as number | null,
            mostOrdered: this.modelValue?.mostOrdered || false,
            selectedMaxCookingTime: (this.modelValue?.maxCookingTime ?? null) as number | null,
            selectedTags: [...(this.modelValue?.tags || [])] as number[],
            searchTimeout: null as ReturnType<typeof setTimeout> | null
        }
    },

    computed: {
        categoryOptions() {
            return [ALL_CATEGORIES_OPTION, ...this.categories]
        },
        hasActiveFilters(): boolean {
            return !!this.searchText
                || this.selectedCategory !== null
                || this.mostOrdered
                || this.selectedMaxCookingTime !== null
                || !!this.selectedTags.length
        }
    },

    methods: {
        onCategorySelect(id: number | null) {
            this.selectedCategory = id
            this.emitChange()
        },
        isCategorySelected(id: number): boolean {
            return this.selectedCategory === id
        },
        toggleTopCategory(id: number) {
            this.onCategorySelect(this.isCategorySelected(id) ? null : id)
        },
        toggleMostOrdered() {
            this.mostOrdered = !this.mostOrdered
            this.emitChange()
        },
        isCookingTimeSelected(id: number): boolean {
            return this.selectedMaxCookingTime === id
        },
        selectCookingTime(id: number) {
            this.selectedMaxCookingTime = this.isCookingTimeSelected(id) ? null : id
            this.emitChange()
        },
        isTagSelected(id: number): boolean {
            return this.selectedTags.includes(id)
        },
        toggleTag(id: number) {
            this.selectedTags = this.isTagSelected(id)
                ? this.selectedTags.filter(t => t !== id)
                : [...this.selectedTags, id]
            this.emitChange()
        },
        tagIcon(tag: MenuFilterTag): string {
            return tag.icon || TAG_ICONS[tag.id] || "pi-tag"
        },
        tagClass(tag: MenuFilterTag): string {
            return tag.class || TAG_CLASSES[tag.id] || ""
        },
        onSearchInput() {
            if (this.searchTimeout) {
                clearTimeout(this.searchTimeout)
            }
            this.searchTimeout = setTimeout(() => {
                this.emitChange()
            }, this.searchDebounce)
        },
        clearAll() {
            if (this.searchTimeout) {
                clearTimeout(this.searchTimeout)
            }
            this.searchText = ""
            this.selectedCategory = null
            this.mostOrdered = false
            this.selectedMaxCookingTime = null
            this.selectedTags = []
            this.emitChange()
            this.$emit("clear")
        },
        emitChange() {
            const state: MenuFilterState = {
                search: this.searchText,
                category: this.selectedCategory,
                mostOrdered: this.mostOrdered,
                maxCookingTime: this.selectedMaxCookingTime,
                tags: this.selectedTags
            }
            this.$emit("update:modelValue", state)
            this.$emit("filter-change", state)
        }
    }
})
