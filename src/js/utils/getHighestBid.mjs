export function getHighestBid(bids) {
  if (!bids || bids.length === 0) return null; // Return null if no bids

  // Use the reduce method to find the highest bid by amount
  const highestBid = bids.reduce((maxBid, currentBid) => {
    return currentBid.amount > maxBid.amount ? currentBid : maxBid;
  });

  return highestBid.amount; // Return only the amount of the highest bid
}
