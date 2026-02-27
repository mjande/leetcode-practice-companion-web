export interface Interval {
  intervalDays: number;
  intervalMonths: number;
}

export function displayInterval(interval: Interval): string {
  const mapping = Object.entries(intervalMappings)
    .find(([, value]) => {
      return value.intervalDays == interval.intervalDays && value.intervalMonths  == interval.intervalMonths
    });

  if (!mapping) return 'error';
  return mapping[0];
}

export function parseInterval(intervalStr: string): Interval {
  return intervalMappings[intervalStr];
}

export const intervalMappings: Record<string, Interval> = {
  '1 day': { intervalDays: 1, intervalMonths: 0 },
  '2 days': { intervalDays: 2, intervalMonths: 0 },
  '4 days': { intervalDays: 4, intervalMonths: 0 },
  '1 week': { intervalDays: 7, intervalMonths: 0 },
  '2 weeks': { intervalDays: 14, intervalMonths: 0 },
  '1 month': { intervalDays: 0, intervalMonths: 1 },
  '2 months': { intervalDays: 0, intervalMonths: 2 },
  '4 months': { intervalDays: 0, intervalMonths: 4 },
  '6 months': { intervalDays: 0, intervalMonths: 6 },
  '1 year': { intervalDays: 0, intervalMonths: 12 },
  'Done!': { intervalDays: 0, intervalMonths: 0 },
}