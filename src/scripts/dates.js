import { format } from "date-fns";

export const getTodayDate = (outputFormat = "yyyy-MM-dd") =>
  format(new Date(), outputFormat);

// formats due date and time to i.e. 31st Jan, 2023 at 5pm
export const getFormatedDueDateAndTime = (timeStamp) =>
  `${format(new Date(timeStamp), "do MMM',' yyyy 'at' hh':'mm aaa")}`;

// get week number in local format
export const getWeekNumOfYear = (timeStamp) =>
  `${format(new Date(timeStamp), "hh':'mm aaa")}`;

export default getTodayDate;
