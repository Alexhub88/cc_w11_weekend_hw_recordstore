const Record = require('../record.js');
const RecordCollector = require('../record_collector.js');
const RecordStore = require('../record_store.js');
const Transaction= require('../transaction.js');
const assert = require('assert');

describe('Transaction', function () {

  beforeEach(function () {
    record1 = new Record({
      title: 'Their Greatest Hits 1971 - 1975',
      artist: 'Eagles',
      genre: 'rock',
      price: 1000
    });
    record2 = new Record({
      title: 'The Miracle',
      artist: 'Queen',
      genre: 'rock',
      price: 1500
    });
    record3 = new Record({
      title: 'Ziggy Stardust',
      artist: 'David Bowie',
      genre: 'rock',
      price: 2500
    });
    record4 = new Record({
      title: 'Tango In The Night',
      artist: 'Fleetwood Mac',
      genre: 'rock',
      price: 1300
    });
    recordCollector = new RecordCollector('Jim');
    recordCollector.addRecordToCollection(record1);
    recordCollector.addRecordToCollection(record2);
    recordStore = new RecordStore('Dead Format Records');
    recordStore.addRecordToStock(record3);
    recordStore.addRecordToStock(record4);
    transaction1 = new Transaction(recordCollector, recordStore);
    transaction2 = new Transaction(recordStore, recordCollector);
  });

  it('should have a buyer', function () {
    assert.deepStrictEqual(transaction1.buyer, recordCollector);
  });

  it('should have a seller', function () {
    assert.deepStrictEqual(transaction1.seller, recordStore);
  });

  it('should be able to handle an exchange of a record', function () {
    assert.equal(transaction1.buyer.funds, 0);
    assert.equal(transaction1.seller.funds, 0);
    assert.deepStrictEqual(transaction1.buyer.recordCollection, [record1, record2]);
    transaction1.buyer.addFunds(3000);
    assert.equal(transaction1.buyer.funds, 3000);
    transaction1.executeTransaction(record4);
    assert.deepStrictEqual(transaction1.buyer.recordCollection, [record1, record2, record4]);
    assert.deepStrictEqual(transaction1.seller.recordStock, [record3]);
    assert.equal(transaction1.buyer.funds, 1700);
    assert.equal(transaction1.seller.funds, 1300);
    transaction2.executeTransaction(record1);
    assert.deepStrictEqual(transaction2.buyer.recordStock, [record3, record1]);
    assert.deepStrictEqual(transaction2.seller.recordCollection, [record2, record4]);
    assert.equal(transaction2.buyer.funds, 300);
    assert.equal(transaction2.seller.funds, 2700);
  });

});
