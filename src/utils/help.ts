function convertTZ(date: Date | string, tzString: string): Date {
  // Parse the input date and convert it to the target timezone
  return new Date(
    (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
      timeZone: tzString,
    })
  );
}

export const formatDateTime = (
  dateString: string | undefined,
  timezone: string
): string => {
  if (!dateString) return "";

  // Parse the server's UTC date string
  const utcDate = new Date(dateString);

  // Convert the UTC date to the client's timezone
  const dateInUserTZ = convertTZ(utcDate, timezone);

  // Format the date in the user's local time zone
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    // timeZone: timezone, // User's time zone
    // timeZoneName: "short", // Includes timezone abbreviation (e.g., PDT, IST)
  }).format(dateInUserTZ);

  return formattedDate;
};
