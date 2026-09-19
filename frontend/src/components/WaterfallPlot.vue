<template>
  <ResultPanel title="🌊 瀑布图 (Spectrogram)" style="margin-top:16px">
    <canvas ref="cvs" width="800" height="200" class="waterfall-canvas"></canvas>
  </ResultPanel>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import ResultPanel from './ResultPanel.vue'
import { useSignalStore } from '../store/signal'
import { getCanvasView, clearCanvas } from '../utils/canvas'
const store = useSignalStore()
const cvs = ref<HTMLCanvasElement>()

function draw() {
  const view = getCanvasView(cvs.value!)
  const rows = store.result?.waterfall || []
  if (!rows.length) return
  clearCanvas(view)
  const { ctx, W, H } = view
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
}

onMounted(draw)
watch(() => store.result, draw)
</script>

<style scoped>
.waterfall-canvas { display:block; width:100%; border-radius:4px }
</style>
