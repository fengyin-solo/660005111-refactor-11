<template>
  <ResultPanel title="⭐ 星座图 (IQ平面)">
    <canvas ref="cvs" width="300" height="300" class="const-canvas"></canvas>
  </ResultPanel>
</template>

<script setup lang="ts">
import ResultPanel from './ResultPanel.vue'
import { usePlotCanvas } from '../composables/usePlotCanvas'
import { PLOT_COLORS, clearPlot, drawCenteredAxes } from '../utils/plot'
import { useSignalStore } from '../store/signal'
const store = useSignalStore()

const cvs = usePlotCanvas((ctx, W, H) => {
  clearPlot(ctx, W, H)
  drawCenteredAxes(ctx, W, H)

  const pts = store.result?.constellation || []
  if (pts.length === 0) return
  const scale = W * 0.4
  for (const pt of pts) {
    const x = W/2 + pt.i * scale, y = H/2 - pt.q * scale
    ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI*2)
    ctx.fillStyle = PLOT_COLORS.series; ctx.fill()
    ctx.strokeStyle = 'rgba(66,165,245,0.5)'; ctx.stroke()
  }
  ctx.fillStyle = PLOT_COLORS.label; ctx.font = '10px system-ui'
  ctx.fillText('I →', W-25, H/2-5); ctx.fillText('Q ↑', W/2+5, 14)
})
</script>

<style scoped>
.const-canvas { display:block; margin:0 auto; border-radius:4px }
</style>
