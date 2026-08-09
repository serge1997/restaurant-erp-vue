<template>
    <Sidebar 
        class="b-bg-surface border-0 menuSidebar" 
        ref="menuSidebar" 
        v-model:visible="visibleMenuSidebar"
        :show-close-icon="false"
        :style="{width: '18rem'}"
    >
        <template #header>
            <div class="w-100 d-flex flex-column align-items-start">
                <div class="w-100 d-flex justify-content-between align-items-center">
                    <span v-if="!auth.restaurant.logo" class="restaurant-av b-bg-surface3">
                        RS
                    </span>
                    <div v-else>
                        <img class="logo" :src="auth.restaurant.logo" alt="" srcset="">
                    </div>
                    <Button 
                        @click="visibleMenuSidebar = !visibleMenuSidebar" 
                        class="btn-circle-close" 
                        icon="pi pi-times s-sm"
                    />
                </div>
                <div class="p-3 px-4 w-100">
                    <IconField iconPosition="left">
                        <InputIcon class="pi pi-search"> </InputIcon>
                        <InputText 
                            @input="searchMenuItem"
                            v-model="menuElmentSearchInput"
                            placeholder="pesquisar paginas"
                        />
                    </IconField>
                </div>
            </div>
        </template>
        <div class="w-100">
            <div v-if="!menus?.length" class="d-flex justify-content-center align-items-center gap-2 py-1 flex-column">
                <i class="pi pi-search c-t3" style="font-size: 1.5rem;" />
                <small>"{{ menuElmentSearchInput }}"</small>
                <span class="title3 text-center">Elemento do menu nao encontrado.</span>
            </div>
            <ul class="list-group">
                <li
                v-for="mn in menus" 
                    class="list-group-item bg-transparent border-0 cursor-p"
                    @click.prevent.stop="openSubmenu(`.${mn.name.replace(/\s/g, '')}`, $event)"
                >
                    <div class="d-flex justify-content-between">
                        <span class="d-flex align-items-center">
                            <span><i :class="`pi ${mn.module.icon} px-1 menu-item-icon`"></i></span>
                            <span class="menu-item">{{ mn.module.name.replace(/\s/g, '') }}</span>
                        </span>
                        <span><i :class="`pi pi-chevron-down d-none ${mn.name.replace(/\s/g, '')}-icon`"></i></span>
                    </div>
                    <ul v-if="mn.permissions?.length" :class="`list-group ${mn.name.replace(/\s/g, '')} p-1`">
                        <div v-for="item in mn.permissions" >
                            <li 
                                class="list-group-item border-0 submenu-item cursor-p"
                                :class="activeViewClass(`/${mn.module.base_view_path}/${item.view_path}`)"
                                v-if="item.show_in_menu"
                            >
                                <router-link :to="`/${mn.module.base_view_path}/${item.view_path}`">{{ item.label }}</router-link>
                            </li>
                        </div>
                    </ul>
                </li>
            </ul>
        </div>
    </Sidebar>
</template>
<style src="./style.css"></style>
<script src="./script.ts" lang="ts"></script>