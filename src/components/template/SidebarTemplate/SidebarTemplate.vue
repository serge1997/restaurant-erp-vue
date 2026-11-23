<template>
    <Sidebar
        class="b-bg-surface border-0 menuSidebar"
        ref="menuSidebar"
        v-model:visible="visibleMenuSidebar"
        :show-close-icon="false"
        :style="{width: '19.5rem'}"
    >
        <template #header>
            <div class="sidebar-header w-100">
                <div class="w-100 d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center gap-2">
                        <span v-if="!auth.restaurant.logo" class="sidebar-brand-av">
                            RS
                        </span>
                        <img v-else class="sidebar-brand-logo" :src="auth.restaurant.logo" alt="">
                        <div class="d-flex flex-column">
                            <span class="sidebar-brand-name ellipssed-text">{{ auth.restaurant.name }}</span>
                            <span class="sidebar-brand-sub">Painel do restaurante</span>
                        </div>
                    </div>
                    <button
                        type="button"
                        class="sidebar-close-btn"
                        @click="visibleMenuSidebar = !visibleMenuSidebar"
                    >
                        <i class="pi pi-times s-sm"></i>
                    </button>
                </div>
                <div class="sidebar-search">
                    <IconField iconPosition="left">
                        <InputIcon class="pi pi-search"></InputIcon>
                        <InputText
                            @input="searchMenuItem"
                            v-model="menuElmentSearchInput"
                            placeholder="Pesquisar páginas..."
                        />
                    </IconField>
                </div>
            </div>
        </template>

        <div class="sidebar-body">
            <div class="sidebar-menu-scroll">
                <div v-if="!menus?.length" class="sidebar-empty">
                    <i class="pi pi-search"></i>
                    <small>"{{ menuElmentSearchInput }}"</small>
                    <span class="title3 text-center">Elemento do menu nao encontrado.</span>
                </div>
                <ul class="sidebar-menu-list">
                    <li
                        v-for="mn in menus"
                        class="sidebar-menu-group"
                        @click.prevent.stop="openSubmenu(`.${mn.name.replace(/\s/g, '')}`, $event)"
                    >
                        <div class="sidebar-menu-group-header">
                            <span class="d-flex align-items-center gap-2">
                                <span class="sidebar-menu-icon"><i :class="`pi ${mn.module.icon}`"></i></span>
                                <span class="sidebar-menu-label">{{ mn.module.name.replace(/\s/g, '') }}</span>
                            </span>
                            <i :class="`pi pi-chevron-down sidebar-menu-chevron d-none ${mn.name.replace(/\s/g, '')}-icon`"></i>
                        </div>
                        <ul v-if="mn.permissions?.length" :class="`sidebar-submenu ${mn.name.replace(/\s/g, '')} p-1`">
                            <template v-for="item in mn.permissions">
                                <li
                                    v-if="item.show_in_menu"
                                    class="sidebar-submenu-item"
                                    :class="activeViewClass(`/${mn.module.base_view_path}/${item.view_path}`)"
                                >
                                    <router-link :to="`/${mn.module.base_view_path}/${item.view_path}`">{{ item.label }}</router-link>
                                </li>
                            </template>
                        </ul>
                    </li>
                </ul>
            </div>

            <div class="sidebar-footer">
                <div class="sidebar-user">
                    <span class="sidebar-user-av">{{ auth.inicial }}</span>
                    <div class="d-flex flex-column sidebar-user-info">
                        <span class="sidebar-user-name ellipssed-text">{{ auth.name }}</span>
                        <span class="sidebar-user-role ellipssed-text">{{ auth.restaurant?.name }}</span>
                    </div>
                </div>
                <button type="button" class="sidebar-logout-btn" @click="logout">
                    <i class="pi pi-sign-out s-sm"></i>
                    Sair
                </button>
            </div>
        </div>
    </Sidebar>
</template>
<style src="./style.css"></style>
<script src="./script.ts" lang="ts"></script>
