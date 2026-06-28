
<template>
    <RouterView />
    <Toast />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Toast from 'primevue/toast';

export default defineComponent({
  components: {
    Toast
  }
})
</script>


