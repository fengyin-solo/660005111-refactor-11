<template>
  <ResultPanel title="🌊 瀑布图 (Spectrogram)" style="margin-top:16px">
    <canvas ref="cvs" width="800" height="200" class="waterfall-canvas"></canvas>
  </ResultPanel>
</template>

<script setup lang="ts">
import ResultPanel from './ResultPanel.vue'
import { usePlotCanvas } from '../composables/usePlotCanvas'
import { clearPlot } from '../utils/plot'
import { useSignalStore } from '../store/signal'
const store = useSignalStore()

const cvs = usePlotCanvas((ctx, W, H) => {
  const rows = store.result?.waterfall || []
  if (!rows.length) return
  clearPlot(ctx, W, H)
  const rowH = H / rows.length
  for (let r = 0; r < rows.length; r++) {
    const vals = rows[r].values, n = vals.length
    if (!n) continue
    const valsMin = Math.min(...vals), valsMax = Math.max(...vals)
    const vRange = valsMax - valsMin || 1
    for (let i = 0; i < n; i++) {
      const t = (vals[i] - valsMin) / vRange
      const rv = Math.round(t * 200)
      const gv = Math.round(t * 100 + (1-t) * 50)
      const bv = Math.round((1-t) * 200 + 30)
      ctx.fillStyle = `rgb(${rv},${gv},${bv})`
      ctx.fillRect(i * W / n, r * rowH, W / n + 1, rowH + 1)
    }
  }
})
</script>

<style scoped>
.waterfall-canvas { display:block; width:100%; border-radius:4px }
</style>
