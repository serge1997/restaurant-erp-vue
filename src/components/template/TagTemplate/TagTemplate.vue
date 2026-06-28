<template>
     <Tag
        :value="flag?.label || label"
        icon="pi pi-tag"
        severity="secondary"
        class="px-2 rounded-1 cursor-p border-0 px-2 fw-normal"
        :class="flag?.severity"
        @click="toggleMenu"
    />
    <Menu ref="menu" :model="flags" class="shadow" :popup="true">
        <template #item="{item}">
            <li class="list-group-item border-0 cursor-p px-0">
                {{ item.label }}
            </li>
            <span class="d-flex gap-1 mb-2">
                <Tag
                    @click="$emit('updateEntityTag', item)"
                    :value="item?.label"
                    icon="pi pi-tag"
                    severity="secondary"
                    class="px-3 rounded-1 cursor-p border-0 bg-transparent d-none"
                    :class="item?.color"
                />
            </span>
        </template>
    </Menu>
</template>
<script src="./script.ts" lang="ts"></script>