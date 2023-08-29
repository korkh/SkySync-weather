export const getWeekDay = (dateStr: string) => {
  const date = new Date(dateStr);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return daysOfWeek[date.getDay()];
};

export const getCustomTime = (date: string) => {
  return date.split(" ")[1].substring(0, 5);
};

export const getCustomDate = (date: string) => {
  return new Date(date).getDate().toString();
};
