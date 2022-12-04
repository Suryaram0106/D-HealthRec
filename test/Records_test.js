const {expect} = require("chai");
const {ethers} = require("hardhat");

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


describe("Records Contract", function() {
  let Database;
  let database;
  let owner;

  Record_List = 5;
  
  function verifyRecord(recordChain, record) {
      expect(record.name).to.equal(recordChain.name);
      expect(record.dob.toString()).to.equal(recordChain.dob.toString());
      expect(record.gender).to.equal(recordChain.gender);
  }

  function verifyRecordList(recordsFromChain, recordList) {
      expect(recordsFromChain.length).to.not.equal(0);
      expect(recordsFromChain.length).to.equal(recordList.length);
      for (let i = 0; i < recordList.length; i++) {
          const recordChain1 = recordsFromChain[i];
          const record1 = recordList[i];
          verifyRecord(recordChain1, record1);
      }
  }


  beforeEach(async function() {
    Database = await ethers.getContractFactory("Records");
    [owner] = await ethers.getSigners();
    database = await Database.deploy();

    recordList = [];

    for(let i=0; i< Record_List; i++) {
      let record = {
        'name': getRandomInt(1, 1000).toString(),
        'dob': getRandomInt(1800, 2021).toString(),
        'gender': getRandomInt(1, 1000).toString(),
        'desc': getRandomInt(1, 1000).toString(),
        'descdate': getRandomInt(1, 1000).toString(),
      };

      await database.addRecord(record.name, record.dob, record.gender, record.desc,record.descdate);
      recordList.push(record);
    } 

  });




  describe("Get Records List", function() {
   
    it("should return all the records", async function(){
      const recordsFromChain = await database.getRecordList();
      expect(recordsFromChain.length).to.equal(Record_List);
      verifyRecordList(recordsFromChain, recordList);
    })
  })




  describe("Add Record", function(){
    it("should emit AddRecord event", async function() {
      let record = {
        'name': getRandomInt(1, 1000).toString(),
        'dob': getRandomInt(1800, 2021).toString(),
        'gender': getRandomInt(1, 1000).toString(),
        'desc': getRandomInt(1, 1000).toString(),
        'descdate': getRandomInt(1, 1000).toString(),
      };

      await expect(await database.addRecord(record.name, record.dob, record.gender, record.desc,record.descdate)
    ).to.emit(database, 'AddRecord').withArgs(owner.address, 5);
    })
  })

 

  describe("Set Description", function() {
      it("Should emit SetDescription event", async function () {
          const Person_ID = 1;
          const Desc = "This is my x ray";
          const DescDate = "10 oct 2022"
          await expect(
              database.setDescription(Person_ID,Desc,DescDate)
          ).to.emit(
              database, 'AddDescFile'
          ).withArgs(
              Person_ID,Desc,DescDate
          )
      })
  })
});