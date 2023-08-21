export const getWeekDays = (): string[] => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const todayIndex = new Date().getDay(); //index of current day
  //mapping function that generates the day name based on the index i.
  return Array.from({ length: 7 }, (_, i) => days[(todayIndex + i) % 7]);
};

// calculating the index of the day in the days array, wrapping around to the beginning of the array if needed.
