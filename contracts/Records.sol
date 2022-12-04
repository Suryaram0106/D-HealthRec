// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Records{

event AddRecord(address recipient, uint pId);
event AddDescFile(uint pId, string desc, string descdate);

struct Person {
    uint id;
    string name;
    string dob;
    string gender;
    string desc;
    string descdate;
    
  }

  Person[] private recordList;

  mapping(uint256 => address) recordToOwner;

  function addRecord(string memory name, string memory dob, string memory gender,string memory desc,string memory descdate) external {
    uint id = recordList.length;
    recordList.push(Person(id, name, dob, gender,desc,descdate));
    recordToOwner[id] = msg.sender;
    emit AddRecord(msg.sender, id);
  }

  function getRecordList() external view returns (Person[] memory) {
    return recordList;
  }

  function setDescription(uint id, string memory desc, string memory descdate) external {
    if (recordToOwner[id] == msg.sender) {

      recordList[id].desc = desc;
      recordList[id].descdate = descdate;
      emit AddDescFile(id,desc,descdate);
    }
  }

}