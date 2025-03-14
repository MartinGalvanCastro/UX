export function getNextAlarmTimestamp(alarm: { cadence: number; firstDoseHour: string }): number {
  const [hoursStr, minutesStr] = alarm.firstDoseHour.split(':');
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);
  const now = new Date();
  let nextDose = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes
  );
  while (nextDose.getTime() <= now.getTime()) {
    nextDose.setHours(nextDose.getHours() + alarm.cadence);
  }
  return nextDose.getTime();
}