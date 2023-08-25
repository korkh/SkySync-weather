export const getWeekDays = (items: number): string[] => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const todayIndex = new Date().getDay();
  return Array.from({ length: items }, (_, i) => days[(todayIndex + i) % 7]);
};

// calculating the index of the day in the days array, wrapping around to the beginning of the array if needed.
