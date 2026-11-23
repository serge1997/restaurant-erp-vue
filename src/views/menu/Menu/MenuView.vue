<template>
    <PageTemplate
        :hasNewButton="false"
        :cardQuantityItems="cartQuantities"
        :sideDishes="sideDishes"
        title="Menu"
        @cart-cleared="clearCard"
    >
        <MenuFilter
            :categories="categories"
            :top-categories="topCategories"
            @filter-change="onFilterChange"
        />
        <div class="menu-grid">
            <MenuElementCard
                ref="cardRefs"
                v-for="item in data"
                :item="item"
                @element-added="newElementAdded"
            />
        </div>
    </PageTemplate>
</template>

<script src="./script.ts"></script>
<style src="./style.css"></style>