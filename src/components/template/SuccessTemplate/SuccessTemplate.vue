<template>
    <div class="d-flex flex-column justify-content-center align-items-center">
        <div class="ts-ico">
            <svg viewBox="0 0 22 22" fill="none"><path d="M4 11l5 5 9-9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div class="ts-title">{{ message }}</div>
        <slot name="sup-content"></slot>
    </div>
</template>

<script src="./script.ts"></script>
<style src="./style.css"></style>