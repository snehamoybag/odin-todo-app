import { format } from "date-fns";

export const getTodayDate = (outputFormat = "yyyy-MM-dd") => {
  return format(new Date(), outputFormat);
};
