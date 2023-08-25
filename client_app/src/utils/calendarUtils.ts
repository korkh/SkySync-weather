export const getWeekDay = (dateStr: string) => {
  const date = new Date(dateStr);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return daysOfWeek[date.getDay()];
};

export const getCustomTime = (date: string) => {
  return date.split(" ")[1].substring(0, 5);
};

export const getCustomDate = (date: string) => {
  return new Date(date).getDate().toString();
};
