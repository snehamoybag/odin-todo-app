import { format } from "date-fns";

export const getTodayDate = (outputFormat = "yyyy-MM-dd") =>
  format(new Date(), outputFormat);

export default getTodayDate;
