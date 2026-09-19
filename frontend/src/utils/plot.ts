// 结果面板共用的绘图约定：配色、清屏与坐标轴。新增图形面板时直接复用，调整样式或刻度口径只需改这里。
export const PLOT_COLORS = {
  background: '#0d1520',
  axis: '#2a3a4a',
  label: '#8899aa',
  series: '#42a5f5',
} as const

/** 用面板底色铺满整个画布（清屏） */
export function clearPlot(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.fillStyle = PLOT_COLORS.background
  ctx.fillRect(0, 0, width, height)
}

/** 在画布中心绘制十字坐标轴 */
export function drawCenteredAxes(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.strokeStyle = PLOT_COLORS.axis
  ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(0, height / 2); ctx.lineTo(width, height / 2); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(width / 2, 0); ctx.lineTo(width / 2, height); ctx.stroke()
}

/** ECharts 数值轴的统一配置：轴标题居中、刻度颜色一致 */
export function valueAxis(name: string, nameGap: number) {
  return {
    type: 'value' as const,
    name,
    nameLocation: 'middle' as const,
    nameGap,
    axisLabel: { color: PLOT_COLORS.label },
  }
}
