<template>
  <ResultPanel title="⭐ 星座图 (IQ平面)">
    <canvas ref="cvs" width="300" height="300" class="const-canvas"></canvas>
  </ResultPanel>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import ResultPanel from './ResultPanel.vue'
import { useSignalStore } from '../store/signal'
import { THEME } from '../theme'
import { getCanvasView, clearCanvas, drawCenterAxes, drawAxisLabel } from '../utils/canvas'
const store = useSignalStore()
const cvs = ref<HTMLCanvasElement>()

function draw() {
  const view = getCanvasView(cvs.value!)
  clearCanvas(view)
  drawCenterAxes(view)

  const pts = store.result?.constellation || []
  if (pts.length === 0) return
  const { ctx, W, H } = view
  const scale = W * 0.4
  for (const pt of pts) {
    const x = W/2 + pt.i * scale, y = H/2 - pt.q * scale
    ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI*2)
    ctx.fillStyle = THEME.seriesColor; ctx.fill()
    ctx.strokeStyle = 'rgba(66,165,245,0.5)'; ctx.stroke()
  }
  drawAxisLabel(view, 'I →', W-25, H/2-5)
  drawAxisLabel(view, 'Q ↑', W/2+5, 14)
}

onMounted(draw)
watch(() => store.result, draw)
</script>

<style scoped>
.const-canvas { display:block; margin:0 auto; border-radius:4px }
</style>
