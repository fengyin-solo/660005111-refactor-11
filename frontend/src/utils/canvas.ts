/**
 * Canvas 类结果面板的共用处理：取上下文、清屏、中心坐标轴、轴标签。
 * 均为独立小函数，各面板按自身顺序组合调用（空数据时是否清屏由面板自行决定）。
 */
import { THEME } from '../theme'

export interface CanvasView {
  ctx: CanvasRenderingContext2D
  W: number
  H: number
}

/** 取 2D 上下文与画布尺寸 */
export function getCanvasView(canvas: HTMLCanvasElement): CanvasView {
  return { ctx: canvas.getContext('2d')!, W: canvas.width, H: canvas.height }
}

/** 清屏：铺设统一背景色 */
export function clearCanvas({ ctx, W, H }: CanvasView) {
  ctx.fillStyle = THEME.canvasBg
  ctx.fillRect(0, 0, W, H)
}

/** 绘制中心十字坐标轴 */
export function drawCenterAxes({ ctx, W, H }: CanvasView) {
  ctx.strokeStyle = THEME.axisLine
  ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(0, H / 2); ctx.lineTo(W, H / 2); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H); ctx.stroke()
}

/** 按统一口径绘制一条轴标签 */
export function drawAxisLabel({ ctx }: CanvasView, text: string, x: number, y: number) {
  ctx.fillStyle = THEME.axisLabel
  ctx.font = THEME.axisFont
  ctx.fillText(text, x, y)
}
