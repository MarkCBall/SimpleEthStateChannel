pragma solidity ^0.5.0;

contract HelloWorld {

  string public message;
  address owner;

  constructor(string memory _message) public {
    owner = msg.sender;
    message = _message;
  }

  function updateMessage(string memory _newMessage) public {
    require(msg.sender == owner);
    message = _newMessage;
  }
}
