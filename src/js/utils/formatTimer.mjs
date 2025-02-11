export function formatTimeLeft(endsAtString) {
  const endsAt = new Date(endsAtString);
  const now = new Date();
  const timeDiff = endsAt - now;

  // If Auction is closed returns expired:
  if (timeDiff <= 0) {
    return { time: "Auction Closed", expired: true };
  }

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);

  return { time: `${days}d : ${hours}h : ${minutes}m`, expired: false };
}
