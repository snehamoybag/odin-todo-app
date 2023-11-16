import { format } from "date-fns";

export const getTodayDate = (outputFormat = "yyyy-MM-dd") =>
  format(new Date(), outputFormat);

// formats due date and time to i.e. 31st Jan, 2023 at 5pm
export const getFormatedDueDateAndTime = (timeStamp) =>
  `Due on ${format(new Date(timeStamp), "do MMM',' yyyy 'at' h':'m aaa")}`;

export default getTodayDate;
