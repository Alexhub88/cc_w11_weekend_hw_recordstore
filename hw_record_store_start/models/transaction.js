const Transaction = function (buyer, seller, record) {
  this.buyer = buyer;
  this.seller = seller;
  this.record = record;
};

Transaction.prototype.buyerHasFundsForRecord = function(record){
  return this.buyer.funds >= record.price;
}

Transaction.prototype.removeRecordFromSeller = function(record){
  this.seller.removeRecord(record);
}

Transaction.prototype.sellerHasRecord = function(record){
  return this.seller.findRecordByTitle(record.title);
}

Transaction.prototype.executeTransaction = function(record){
  if (this.buyerHasFundsForRecord(record) && this.sellerHasRecord(record)){
    // console.log('buyer', this.buyer);
      this.seller.sellRecord(record);
      this.buyer.buyRecord(record);
  }
}



module.exports = Transaction;
