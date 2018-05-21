const Record = require('../record.js');
const RecordCollector = require('../record_collector.js');
const RecordStore = require('../record_store.js');
const assert = require('assert');

describe('RecordStore', function () {

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

    recordStore = new RecordStore('Dead Format Records');
  });

  it('should start with no funds', function () {
    assert.strictEqual(recordStore.funds, 0);
  });

  it('should be able to add funds', function () {
    recordStore.addFunds(87);
    assert.strictEqual(recordStore.funds, 87);
  });

  it('should start with an empty collection of records', function () {
    assert.deepStrictEqual(recordStore.recordStock, []);
  });

  it('should be able to add a record to its collection of records', function () {
    recordStore.addRecordToStock(record1);
    assert.deepStrictEqual(recordStore.recordStock, [record1]);
  });

  it('should be able to find a record by title', function () {
    recordStore.addRecordToStock(record1);
    recordStore.addRecordToStock(record2);
    const isRecordInCollection = recordStore.findRecordByTitle('The Miracle');
    assert.deepStrictEqual(isRecordInCollection, true);
    const isRecord2InCollection = recordStore.findRecordByTitle('Under Pressure');
    assert.deepStrictEqual(isRecord2InCollection, false);
  });

  it('should be able to remove a record from its collection', function () {
    recordStore.addRecordToStock(record1);
    recordStore.addRecordToStock(record2);
    recordStore.addRecordToStock(record3);
    assert.deepStrictEqual(recordStore.recordStock, [record1, record2, record3]);
    assert.equal(recordStore.removeRecord(record2), true);
    assert.deepStrictEqual(recordStore.recordStock, [record1, record3]);
    assert.equal(recordStore.removeRecord(record4), false);
  });

  it('should be able to sell a record if it has the record', function () {
    recordStore.addRecordToStock(record1);
    recordStore.addRecordToStock(record2);
    recordStore.addRecordToStock(record3);
    assert.deepStrictEqual(recordStore.recordStock, [record1, record2, record3]);
    assert.equal(recordStore.funds, 0);
    assert.equal(recordStore.sellRecord(record1), true);
    assert.equal(recordStore.funds, 1000);
    assert.equal(recordStore.sellRecord(record4), false);
  });

});
