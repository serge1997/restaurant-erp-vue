<template>
    <div class="d-flex flex-column justify-content-evenly vh-100">
        <div class="position-relative d-flex flex-column">
            <Navbar
                :cardQuantityItems="cardQuantityItems"
                @cart-cleared="clearCart"
                @load-cart="loadCart"
                :cartTotal="cartTotal"
                :tables="tables"
                :activeOrder="activeOrder"
            />
            <div class="w-100">
                <slot name="sub-navbar"></slot>
            </div>
        </div>
        <div class="container-fluid position-relative flex-grow-1" :class="mt" ref="page">
            <div class="w-100 py-3 d-flex justify-content-between">
                <div class="px-3 d-flex gap-2 align-items-center">
                    <h6 style="margin: 0;">{{ title }}</h6>
                    <span v-if="cardQuantityItems" @click="$emit('open-cart-sidebar')" class="title3 text-decoration-underline cursor-p">/Ver o carrinho</span>
                </div>
                <div class="btn-button">
                    <Button
                        v-if="hasNewButton"
                        class="btn-green-primary" 
                        :label="newBtnLabel" 
                        icon="pi pi-plus s-sm"
                        @click="openForm"
                    />
                </div>
            </div>
            <slot></slot>
        </div>
        <div class="border py-2 bg-white d-flex justify-content-center footer w-100">
            <span class="title3 text-center">@ Licensed Erp - Devloped by Lotchi Serge Gogo</span>
        </div>
    </div>
</template>
<script src="./script.ts" lang="ts"></script>
<style src="./style.css"></style>