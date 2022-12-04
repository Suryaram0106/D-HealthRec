// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Records{

event AddRecord(string recipient, uint pId);
event AddDescFile(uint pId, string desc, string cid);

struct Person {
    uint id;
    string name;
    string dob;
    string gender;
    string ethAddres;
    string cid;
    
  }

  Person[] private recordList;

  mapping(uint256 => Person) recordToOwner;

  function addRecord(string memory name, string memory dob, string memory gender,string memory ethAddres,string memory cid) external {
    uint id = recordList.length;
    recordList.push(Person(id, name, dob, gender,ethAddres,cid));
    recordToOwner[id].ethAddres = ethAddres;
    emit AddRecord(ethAddres, id);
  }

  function getRecordList() external view returns (Person[] memory) {
    return recordList;
  }

  function getRecordListEth(string calldata ethAddres) external view returns (Person[] memory) {
    
      Person[] memory temporary = new Person[](recordList.length);
    uint counter = 0;
    for(uint i=0; i<recordList.length; i++) {
      if(recordToOwner[i].ethAddres.equals( ethAddres)) {
        temporary[counter] = recordList[i];
        counter++;
      }
    }

    Person[] memory result = new Person[](counter);
    for(uint i=0; i<counter; i++) {
      result[i] = temporary[i];
    }
    return result;
  }

  function setDescription(uint id, string memory ethAddres, string memory cid) external {
    if (recordToOwner[id].ethAddres.equals(ethAddres)) {

      recordList[id].ethAddres = ethAddres;
      recordList[id].cid = cid;
      emit AddDescFile(id,ethAddres,cid);
    }
  }

}