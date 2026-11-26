<template>
    <Sidebar
        ref="formTemplate"
        position="right"
        :class="`${formWidth} b-bg-surface border-0 form-template-sidebar`"
        v-model:visible="formStore.isVisible"
        @hide="closeForm"
        :show-close-icon="false"
    >
        <template #header>
            <div class="ft-header w-100">
                <div v-if="itemId" class="ft-meta-row">
                    <div class="ft-id-badge">
                        <span>ID: {{ itemId }}</span>
                        <slot name="item-status"></slot>
                    </div>
                    <TagTemplate
                        v-if="hasFlag"
                        :flag="flag"
                        :flags="flags"
                        @updateEntityTag="updateEntityTag"
                    />
                </div>
                <div class="ft-title-row">
                    <div class="ft-title-main">
                        <span class="ft-icon-badge" :class="formTitleIconClass">
                            <svg viewBox="0 0 14 14" fill="none"><path d="M2 3h10M2 7h7M2 11h5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
                        </span>
                        <div class="ft-title-text">
                            <h6 :title="title" class="ft-title ellipssed-text">{{ title }}</h6>
                            <slot name="subtitle"></slot>
                        </div>
                    </div>
                    <span class="ft-actions btn-button">
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
                            class="ft-menu-btn"
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
        <div class="ft-body">
            <slot></slot>
        </div>
        <div v-if="showDefaultFooter" class="ft-footer btn-button">
            <Button
                @click="closeForm"
                class="btn-white-primary"
                label="Cancelar"
                icon="pi pi-times s-sm"
            />
            <Button
                class="btn-green-primary ft-footer-save"
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
