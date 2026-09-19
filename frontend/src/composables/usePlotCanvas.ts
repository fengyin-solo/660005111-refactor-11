import { ref, watch, onMounted } from 'vue'
import { useSignalStore } from '../store/signal'

/** 画布类结果面板的共用骨架：挂载与数据更新时用最新的画布上下文回调重绘 */
export function usePlotCanvas(draw: (ctx: CanvasRenderingContext2D, width: number, height: number) => void) {
  const store = useSignalStore()
  const cvs = ref<HTMLCanvasElement>()

  function render() {
    const c = cvs.value
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return
    draw(ctx, c.width, c.height)
  }

  onMounted(render)
  watch(() => store.result, render)

  return cvs
}
