<template>
  <div class="panel">
    <h3>{{ title }}</h3>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<style scoped>
.panel { background:#1a2332; border-radius:8px; padding:16px; border:1px solid #2a3a4a }
.panel h3 { margin-bottom:var(--panel-title-gap, 8px); color:#90caf9; font-size:14px }
</style>
