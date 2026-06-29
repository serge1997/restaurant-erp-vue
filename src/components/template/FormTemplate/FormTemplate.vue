<template>
    <Sidebar 
        ref="formTemplate"
        position="right"
        :class="`${formWidth} b-bg-surface border-0`"
        v-model:visible="formStore.isVisible"
        @hide="closeForm"
        :show-close-icon="false"
    >
        <template #header>
            <div class="w-100 d-flex flex-column">
                <div class="w-100 d-flex gap-3 align-items-center">
                    <div v-if="itemId">
                        <span class="s-md c-gray-primary">ID: {{ itemId }}</span>
                    </div>
                    <TagTemplate
                        v-if="hasFlag && itemId" 
                        :flag="flag"
                        :flags="flags"
                        @updateEntityTag="updateEntityTag"
                    />
                </div>
                <div class="d-flex justify-content-between w-100 align-items-center border-bottom p-1">
                    <div class="w-60 d-flex align-items-center gap-2">
                        <div class="d-flex align-items-center">
                            <span class="detail-ico-svg detail-ico" :class="formTitleIconClass">
                                <svg viewBox="0 0 14 14" fill="none"><path d="M2 3h10M2 7h7M2 11h5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
                            </span>
                        </div>
                        <div  class="w-80 d-flex flex-column">
                            <h6 :title="title" style="margin: 0px;" class="mt-2 ellipssed-text c-gray-primary">{{ title }}</h6>
                            <slot name="subtitle"></slot>
                        </div>
                    </div>
                    <span class="w-50 d-flex align-items-center justify-content-end gap-1 btn-button">
                        <Button 
                            v-if="showSaveButton"
                            class="btn-green-primary save-btn" 
                            :label="saveBtnLabel" 
                            icon="pi pi-check s-sm"
                            :isDisable="isDisableSaveBtn"
                            @click.prevent="$emit('submitData')"
                            :title="saveBtnLabel"
                        />
                        <Button 
                            @click="closeForm" 
                            class="btn-circle-close" 
                            icon="pi pi-times s-sm"
                        />
                        <Button
                            v-if="itemId && hasMenu"
                            style="padding: 0px 3px 0px 3px !important;"
                            icon-color="c-gray-primary fs-6" 
                            icon="pi pi-ellipsis-v"
                            @click="openFormMenuOverlay"
                        />
                        <OverlayPanel append-to="body" ref="overlayFormMenu">
                            <slot name="form-menu"></slot>
                        </OverlayPanel>
                    </span>
                </div>
            </div>
        </template>
        <slot></slot>
        <div v-if="showDefaultFooter" style="bottom: 0px; width: 100%;" class="form-sidebar-footer bg-white py-2 d-flex position-fixed align-items-center justify-content-center gap-3 btn-button">
            <Button 
                @click="closeForm" 
                class="btn-white-primary" 
                label="Cancelar" 
                icon="pi pi-times s-sm"
            />
            <Button 
                class="btn-green-primary w-60 d-flex justify-content-center" 
                :label="saveBtnLabel" 
                icon="pi pi-check s-sm"
                :isDisable="isDisableSaveBtn"
                @click.prevent="$emit('submitData')"
            />
        </div>
        <slot name="footer"></slot>
    </Sidebar>
</template>
<style src="./style.css"></style>
<script src="./script.ts" lang="ts"></script>
