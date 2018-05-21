const RecordCollector = function (name) {
  this.name = name;
  this.funds = 0;
  this.recordCollection  = [];
};

RecordCollector.prototype.addFunds = function(fundsToAdd){
  this.funds += fundsToAdd;
}

RecordCollector.prototype.addRecordToCollection = function(recordToAdd){
  this.recordCollection.push(recordToAdd);
}

RecordCollector.prototype.findRecordByTitle = function(recordTitle){
  const recordTitlesList = this.recordCollection.map((record) => {
    return record.title;
  });

  return recordTitlesList.includes(recordTitle);
}

RecordCollector.prototype.removeRecord = function(recordToRemove){
  if (this.findRecordByTitle(recordToRemove.title)){
    const adjustedRecordCollection = this.recordCollection.filter((record) => {
      return record.title != recordToRemove.title;
    });
    this.recordCollection = adjustedRecordCollection;
    return true;
  } else {
    return false;
  }
}

RecordCollector.prototype.buyRecord = function(recordToBuy){
  if (this.funds >= recordToBuy.price) {
    this.recordCollection.push(recordToBuy);
    this.funds -= recordToBuy.price;
  }
}

RecordCollector.prototype.sellRecord = function(recordToSell){
  if (this.removeRecord(recordToSell)) {
    this.funds += recordToSell.price;
    return true;
  } else {
    return false;
  }
}

module.exports = RecordCollector;
