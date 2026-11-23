<template>
    <div class="menu-filter">
        <div class="menu-filter-search-row">
            <IconField iconPosition="left" class="menu-filter-search">
                <InputIcon class="pi pi-search"></InputIcon>
                <InputText
                    v-model="searchText"
                    :placeholder="searchPlaceholder"
                    @input="onSearchInput"
                />
            </IconField>
            <button
                v-if="hasActiveFilters"
                type="button"
                class="btn-white-primary menu-filter-clear-btn"
                @click="clearAll"
            >
                <i class="pi pi-filter-slash s-sm"></i>
                Limpar filtros
                <span class="sdot occupied"></span>
            </button>
        </div>

        <div class="menu-filter-groups">
            <div class="menu-filter-row">
                <div class="menu-filter-group menu-filter-group-category">
                    <span class="menu-filter-group-label">Categoria</span>
                    <Select
                        class="menu-filter-category-select"
                        :options="categoryOptions"
                        :modelValue="selectedCategory"
                        placeholder="Todas as categorias"
                        @update:modelValue="onCategorySelect"
                    />
                </div>
                <button
                    type="button"
                    class="menu-filter-chip menu-filter-most-ordered-chip"
                    :class="{ 'menu-filter-chip-active': mostOrdered }"
                    @click="toggleMostOrdered"
                >
                    <i class="pi pi-chart-line s-xs"></i>
                    Mais pedidos
                </button>
            </div>

            <div v-if="topCategories.length" class="menu-filter-group">
                <span class="menu-filter-group-label">Categorias mais pedidas</span>
                <div class="menu-filter-chips">
                    <button
                        v-for="category in topCategories"
                        :key="category.id"
                        type="button"
                        class="menu-filter-chip menu-filter-top-category-chip"
                        :class="{ 'menu-filter-chip-active': isCategorySelected(category.id) }"
                        @click="toggleTopCategory(category.id)"
                    >
                        <i class="pi pi-star-fill s-xs"></i>
                        {{ category.name }}
                    </button>
                </div>
            </div>

            <div class="menu-filter-group">
                <span class="menu-filter-group-label">Tempo de preparo</span>
                <div class="menu-filter-chips">
                    <button
                        v-for="option in cookingTimeOptions"
                        :key="option.id"
                        type="button"
                        class="menu-filter-chip"
                        :class="{ 'menu-filter-chip-active': isCookingTimeSelected(option.id) }"
                        @click="selectCookingTime(option.id)"
                    >
                        <i class="pi pi-clock s-xs"></i>
                        {{ option.name }}
                    </button>
                </div>
            </div>

            <div v-if="tags.length" class="menu-filter-group">
                <span class="menu-filter-group-label">Destaques</span>
                <div class="menu-filter-chips">
                    <button
                        v-for="tag in tags"
                        :key="tag.id"
                        type="button"
                        class="menu-filter-chip menu-filter-tag-chip"
                        :class="[tagClass(tag), { 'menu-filter-chip-active': isTagSelected(tag.id) }]"
                        @click="toggleTag(tag.id)"
                    >
                        <i :class="['pi', tagIcon(tag), 's-xs']"></i>
                        {{ tag.name }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./script.ts"></script>
<style src="./style.css"></style>
