/**
 * Formats a timestamp into a human-readable string representing the bid time.
 * @param {string|number} timestamp - The timestamp to be formatted.
 * @returns {string} A formatted string representing the time in "HH:mm dd MMM yyyy" format.
 */

export function formatBidTime(timestamp) {
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes} ${day} ${month} ${year}`;
}
