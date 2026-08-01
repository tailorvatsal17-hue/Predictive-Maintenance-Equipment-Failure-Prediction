import { useTheme } from '@/context/ThemeContext';

export function useChartTheme() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  return {
    isDark,
    gridStroke: isDark ? '#1e293b' : '#e2e8f0',
    axisColor: isDark ? '#94a3b8' : '#475569',
    textColor: isDark ? '#e2e8f0' : '#0f172a',
    tooltipBg: isDark ? 'rgba(15,23,42,0.95)' : 'rgba(255,255,255,0.95)',
    tooltipBorder: isDark ? '#334155' : '#e2e8f0',
  };
}
