<template>
    <div class="item-card cursor-p">
      <div class="item-card-img">
        <img
          v-if="item.image"
          :src="item.image"
          :alt="item.name"
          loading="lazy"
        />
        <div v-else class="item-card-img-placeholder">
          <i class="pi pi-image" />
        </div>
        <div class="item-card-img-overlay" />
        <div class="item-card-badges">
          <span v-if="hasChefTag" class="badge-chef">Prato do chef</span>
          <span v-if="hasNewTag"  class="badge-new">Novo</span>
        </div>
        <div v-if="hasElement" class="item-card-qty-badge">
          {{ itemQty }}
        </div>
      </div>
  
      <div class="item-card-body">
        <span class="item-card-category">{{ item.category.name }}</span>
        <span class="item-card-name">{{ item.name }}</span>
        <span class="item-card-description">{{ item.description }}</span>
      </div>
  
      <div class="item-card-footer btn-button">
        <div class="item-card-price-wrap">
          <span v-if="hasPromoTag" class="item-card-price-old">
            {{ item.price.label }}
          </span>
          <span class="item-card-price">{{ item.price.label }}</span>
        </div>
        <Button
          :label="hasElement ? 'Mais 1' : 'Adicionar'"
          icon="pi pi-plus s-md"
          class="btn-green-primary"
          :class="{ 'btn-added': hasElement }"
          @click="addToCart"
          style="padding: 2px 3px 2px 3px !important;"
        />
      </div>
  
    </div>
  </template>
  
  <script src="./script.ts" />
  <style src="./style.css"></style>