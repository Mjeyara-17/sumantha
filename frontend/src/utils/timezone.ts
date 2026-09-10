/**
 * Utility to get the current time representing calendar values in the target timezone.
 * Returns a Date object where year/month/day/hours/minutes match the target timezone's wall clock.
 */
export function getTargetTime(timezone: string): Date {
  const now = new Date();
  
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false
    });
    
    const parts = formatter.formatToParts(now);
    const dateMap = parts.reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {} as Record<string, string>);
    
    return new Date(
      parseInt(dateMap.year),
      parseInt(dateMap.month) - 1, // 0-indexed month
      parseInt(dateMap.day),
      parseInt(dateMap.hour),
      parseInt(dateMap.minute),
      parseInt(dateMap.second)
    );
  } catch (error) {
    console.error(`Fallback timezone translation failed for ${timezone}:`, error);
    return now; // Fallback to local system time on error
  }
}

/**
 * Creates target Date object from year, month, day and HH:MM time string.
 */
export function parseConfigDate(
  year: number,
  month: number,
  day: number,
  timeStr: string
): Date {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return new Date(year, month - 1, day, hours, minutes, 0, 0);
}

/**
 * Formats date into display string (e.g. "September 11, 2026")
 */
export function formatBirthdayDisplay(year: number, month: number, day: number): string {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return `${months[month - 1]} ${day}, ${year}`;
}
