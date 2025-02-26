/**
 * Retrieves the highest bid from a list of bids.
 * @param {Array} bids - An array of bid objects, where each bid contains an `amount` and a `bidder` object with a `name` property.
 * @returns {Object} An object containing the highest bid amount and the name of the bidder.
 * @returns {number} highestBid - The highest bid amount.
 * @returns {string|null} highestBidName - The name of the bidder who placed the highest bid, or `null` if no bids exist.
 */

export function getHighestBid(bids) {
  if (!bids || bids.length === 0) {
    return { highestBid: 0, highestBidName: null };
  }

  const highestBid = bids.reduce(
    (maxBid, bid) => {
      return bid.amount > maxBid.amount ? bid : maxBid;
    },
    { amount: 0, bidder: { name: null } }
  );

  return {
    highestBid: highestBid.amount,
    highestBidName: highestBid.bidder.name,
  };
}
