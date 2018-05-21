const RecordStore = function (name) {
  this.name = name;
  this.funds = 0;
  this.recordStock = [];
};

RecordStore.prototype.addFunds = function(fundsToAdd){
  this.funds += fundsToAdd;
}

RecordStore.prototype.addRecordToStock = function(recordToAdd){
  this.recordStock.push(recordToAdd);
}

RecordStore.prototype.buyRecord = function(recordToBuy){
  if (this.funds >= recordToBuy.price) {
    this.recordStock.push(recordToBuy);
    this.funds -= recordToBuy.price;
  }
}

RecordStore.prototype.findRecordByTitle = function(recordTitle){
  const recordTitlesList = this.recordStock.map((record) => {
    return record.title;
  });

  return recordTitlesList.includes(recordTitle);
}

RecordStore.prototype.removeRecord = function(recordToRemove){
  if (this.findRecordByTitle(recordToRemove.title)){
    const adjustedStockCollection = this.recordStock.filter((record) => {
      return record.title != recordToRemove.title;
    });
    this.recordStock = adjustedStockCollection;
    return true;
  } else {
    return false;
  }
}

RecordStore.prototype.sellRecord = function(recordToSell){
  if (this.removeRecord(recordToSell)) {
    this.funds += recordToSell.price;
    return true;
  } else {
    return false;
  }
}

module.exports = RecordStore;
