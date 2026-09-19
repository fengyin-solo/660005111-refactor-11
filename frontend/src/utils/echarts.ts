/**
 * ECharts 类结果面板的共用配置口径。
 */
import { THEME } from '../theme'

/** 数值坐标轴的统一配置：名称居中、刻度标签颜色一致 */
export function valueAxis(name: string, nameGap: number) {
  return {
    type: 'value' as const,
    name,
    nameLocation: 'middle' as const,
    nameGap,
    axisLabel: { color: THEME.axisLabel },
  }
}
