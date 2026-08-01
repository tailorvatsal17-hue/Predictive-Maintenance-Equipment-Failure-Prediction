export const formatNumber = (value: number, decimals = 2): string =>
  Number.isFinite(value) ? value.toFixed(decimals) : '—';

export const formatInt = (value: number): string => Math.round(value).toLocaleString();

export const formatPercent = (value: number, decimals = 2): string =>
  `${(value * 100).toFixed(decimals)}%`;

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function getMaintenanceBucket(rul: number) {
  if (rul > 120) return { id: 'healthy', label: 'Healthy', color: '#10b981' };
  if (rul > 60) return { id: 'schedule', label: 'Schedule Maintenance', color: '#f59e0b' };
  if (rul > 30) return { id: 'required', label: 'Maintenance Required', color: '#f97316' };
  return { id: 'immediate', label: 'Immediate Inspection', color: '#ef4444' };
}
