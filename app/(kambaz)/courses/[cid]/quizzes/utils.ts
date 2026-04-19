  /**
   * Used to produce a date and time in the format: MONTH DAY, YEAR at TIME with TIME being in the 
   * 12 hour format with AM and PM, YEAR only applying if the given year is the same as the current
   * year, and MONTH being a three character abbreviation
   * @param date the given date
   * @returns a string containing MONTH DAY, YEAR at TIME for the given date
   */
export const produceDateAndTime = (date: Date) => {
    const currentDate = new Date();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    let dateString = "";
    dateString = months[date.getMonth()] + " " + date.getDate().toString();
    if (currentDate.getFullYear() !== date.getFullYear()) {
      dateString = dateString +  ", " + date.getFullYear().toString();
    }
    dateString = dateString + " at " + time;
    return dateString;
}

/**
 * compares the given time and the current time 
 * @param date the given date
 * @returns negative when the given date comes before the current time, positive if after, and zero if same time
 */
export const compareTime = (date: Date) => {
    const now = new Date();
    return date.getTime() - now.getTime();
}

/**
 * produces the availability status for the given quiz based on the current time
 * @param quiz the given quiz
 * @returns the availability status, either closed, available, available until, not available, or not available until as a string
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const produceQuizAvailability = (quiz: any) => {
    if (!quiz.availableDate && !quiz.untilDate) return "available";

    const availableComparison = quiz.availableDate ? compareTime(new Date(quiz.availableDate)) : -1;
    const untilComparison = quiz.untilDate ? compareTime(new Date(quiz.untilDate)) : 1;

    // past negative, future positive
    if (untilComparison < 0) return "closed";
    if (availableComparison > 0) return "not available until";
    if (quiz.untilDate) return "available until";

    return "available";
}

  /**
   * Formats the ISO string given in the JSON file into a format compatible with datetime-local
   * and accounts for the user's timezone
   * @param isoDate the isodate as a string from the JSON file
   * @returns a formatted string as YYYY-MM-DDTHH:mm
   */
export const formatDate = (isoDate: string) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    if (isNaN(date.getTime())) return "";
    const timezoneOffset = date.getTimezoneOffset() * 60000; // 60000 ms/min
    const localDate = new Date(date.getTime() - timezoneOffset);
    return localDate.toISOString().slice(0, 16);
}