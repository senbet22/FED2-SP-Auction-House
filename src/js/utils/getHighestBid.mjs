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
