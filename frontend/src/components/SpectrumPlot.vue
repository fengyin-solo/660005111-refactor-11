<template>
  <ResultPanel title="📊 FFT频谱图">
    <div ref="chart" class="chart"></div>
  </ResultPanel>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import ResultPanel from './ResultPanel.vue'
import { PLOT_COLORS, valueAxis } from '../utils/plot'
import { useSignalStore } from '../store/signal'
const store = useSignalStore()
const chart = ref<HTMLDivElement>()
let instance: echarts.ECharts | null = null

function update() {
  if (!instance || !store.result) return
  const { frequencies, magnitudes } = store.result.spectrum
  const n = frequencies.length
  const halfN = Math.floor(n / 2)
  const data = []
  for (let i = 0; i < halfN; i++) {
    data.push([frequencies[i], magnitudes[i]])
  }
  instance.setOption({
    backgroundColor: 'transparent',
    grid: { left: 50, right: 15, top: 15, bottom: 35 },
    xAxis: valueAxis('频率 (Hz)', 25),
    yAxis: valueAxis('幅度 (dB)', 40),
    series: [{
      type: 'line', data, symbol: 'none', lineStyle: { color: PLOT_COLORS.series, width: 1.5 },
      areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(66,165,245,0.4)' }, { offset: 1, color: 'rgba(66,165,245,0.02)' }]) }
    }],
    animation: false
  })
}

onMounted(() => {
  if (chart.value) { instance = echarts.init(chart.value); update() }
})
watch(() => store.result, update)
onUnmounted(() => { instance?.dispose() })
</script>

<style scoped>
.chart { width:100%; height:280px }
</style>
