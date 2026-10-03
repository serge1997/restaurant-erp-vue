<template>
     <div class="d-flex flex-column align-items-center justify-content-center py-1 gap-1">
        <i v-if="useSearchIcon" class="pi pi-search c-t3" :style="`font-size: ${iconSize};`" />
        <i v-if="useBanIcon" class="pi pi-ban c-t3" :style="`font-size: ${iconSize};`" />
        <span class="s-md c-t2" style="font-weight: 500;">
            {{ message }}
        </span>
        <span v-if="hasSuggestion" class="c-t1" style="font-size: 12px;">
            {{ suggestionText }}
        </span>
    </div>
</template>

<script src="./script.ts"></script>