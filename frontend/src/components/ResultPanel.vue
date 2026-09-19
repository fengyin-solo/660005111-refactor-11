<template>
  <div class="panel">
    <h3 :style="{ marginBottom: `${titleGap}px` }">{{ title }}</h3>
    <slot />
  </div>
</template>

<script setup lang="ts">
// 结果面板统一外壳：面板样式 + 标题。新图形直接套用，无需重复这套处理。
withDefaults(defineProps<{ title: string; titleGap?: number }>(), { titleGap: 8 })
</script>

<style scoped>
.panel { background:#1a2332; border-radius:8px; padding:16px; border:1px solid #2a3a4a }
.panel h3 { color:#90caf9; font-size:14px }
</style>
