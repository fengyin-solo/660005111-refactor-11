/**
 * 各结果面板共用的图形样式口径。
 * 调整配色 / 刻度标签样式时只改这一处，所有面板同步生效。
 */
export const THEME = {
  /** 画布背景色（清屏时铺设） */
  canvasBg: '#0d1520',
  /** 坐标轴线颜色 */
  axisLine: '#2a3a4a',
  /** 坐标轴刻度 / 标签文字颜色 */
  axisLabel: '#8899aa',
  /** 坐标轴标签字号 */
  axisFont: '10px system-ui',
  /** 数据序列主色（频谱曲线、星座点等） */
  seriesColor: '#42a5f5',
} as const
