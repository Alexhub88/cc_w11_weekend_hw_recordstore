const Record = require('../record.js');
const RecordCollector = require('../record_collector.js');
const assert = require('assert');

describe('RecordCollector', function () {

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

    recordCollector1 = new RecordCollector('Magus');
  });

  it('should start with no funds', function () {
    assert.strictEqual(recordCollector1.funds, 0);
  });

  it('should be able to add funds', function () {
    recordCollector1.addFunds(45);
    assert.strictEqual(recordCollector1.funds, 45);
  });

  it('should start with an empty collection of records', function () {
    assert.deepStrictEqual(recordCollector1.recordCollection, []);
  });

  it('should be able to add a record to its collection of records', function () {
    recordCollector1.addRecordToCollection(record1);
    assert.deepStrictEqual(recordCollector1.recordCollection, [record1]);
  });

  it('should be able to find a record by title', function () {
    recordCollector1.addRecordToCollection(record1);
    recordCollector1.addRecordToCollection(record2);
    const isRecordInCollection = recordCollector1.findRecordByTitle('The Miracle');
    assert.deepStrictEqual(isRecordInCollection, true);
    const isRecord2InCollection = recordCollector1.findRecordByTitle('Under Pressure');
    assert.deepStrictEqual(isRecord2InCollection, false);
  });

  it('should be able to remove a record from its collection', function () {
    recordCollector1.addRecordToCollection(record1);
    recordCollector1.addRecordToCollection(record2);
    recordCollector1.addRecordToCollection(record3);
    assert.deepStrictEqual(recordCollector1.recordCollection, [record1, record2, record3]);
    assert.equal(recordCollector1.removeRecord(record2), true);
    assert.deepStrictEqual(recordCollector1.recordCollection, [record1, record3]);
    assert.equal(recordCollector1.removeRecord(record4), false);
  });

  it('should be able to buy a record if it has sufficient funds', function () {
    recordCollector1.addRecordToCollection(record1);
    assert.deepStrictEqual(recordCollector1.recordCollection, [record1]);
    recordCollector1.addFunds(2000);
    recordCollector1.buyRecord(record2);
    assert.deepStrictEqual(recordCollector1.recordCollection, [record1, record2]);
    recordCollector1.buyRecord(record3);
    assert.deepStrictEqual(recordCollector1.recordCollection, [record1, record2]);
  });

  it('should be able to sell a record if it has the record', function () {
    recordCollector1.addRecordToCollection(record1);
    recordCollector1.addRecordToCollection(record2);
    recordCollector1.addRecordToCollection(record3);
    assert.deepStrictEqual(recordCollector1.recordCollection, [record1, record2, record3]);
    assert.equal(recordCollector1.funds, 0);
    assert.equal(recordCollector1.sellRecord(record1), true);
    assert.equal(recordCollector1.funds, 1000);
    assert.equal(recordCollector1.sellRecord(record4), false);
  });

});
