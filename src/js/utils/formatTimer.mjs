/**
 * Formats the remaining time until the auction ends.
 * @param {string} endsAtString - The ending timestamp of the auction in ISO string format.
 * @returns {Object} An object containing the formatted time string and a boolean indicating if the auction has expired.
 * @returns {string} time - The remaining time in the format "Xd : Xh : Xm" or "Auction Closed" if the auction has ended.
 * @returns {boolean} expired - A boolean that is `true` if the auction has ended, and `false` otherwise.
 */

export function formatTimeLeft(endsAtString) {
  const endsAt = new Date(endsAtString);
  const now = new Date();
  const timeDiff = endsAt - now;

  if (timeDiff <= 0) {
    return { time: "Auction Closed", expired: true };
  }

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);

  return { time: `${days}d : ${hours}h : ${minutes}m`, expired: false };
}
