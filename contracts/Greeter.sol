//SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "hardhat/console.sol";

contract Greeter {
    string private _greeting;
    bool private _callSetGreeting;
    uint256 private _totalCallCount;

    mapping(address => uint256) private _callCount;
    string [] private _greetingHistory;

    address private _owner;

    event SetGreeting(address sender, string oldGreeting, string newGreeting);

    constructor(string memory greeting_) {
        console.log("Deploying a Greeter with greeting:", greeting_);
        _greeting = greeting_;
        _owner = msg.sender;
    }

    function setGreetingPayable(string memory greeting_) public payable {
        require(msg.value == 1 ether, "msg.value is not 1 ether");
        _setGreetingPrivate(msg.sender, greeting_);
    }

    function withdrawAll() public payable {
        payable(_owner).transfer(address(this).balance);
    }

    function setGreeting(string memory greeting_) public {
        _setGreetingPrivate(msg.sender, greeting_);
    }

    function greet() public view returns (string memory) {
        return _greeting;
    }
        
    function getGreetingHistoryCount() public view returns(uint256 count) {
        return _greetingHistory.length;
    }

    function _setGreetingPrivate(address sender, string memory greeting_) private {
        console.log("Changing greeting from '%s' to '%s'", _greeting, greeting_);
        _totalCallCount++;
        _callCount[sender]++;
        
        string [] storage greetingHistory = _getGreetingHistory();
        greetingHistory.push(_greeting);

        emit SetGreeting(sender, _greeting, greeting_);

        _greeting = greeting_;
    }

    function _getGreetingHistory() private view returns(string [] storage) {
        return _greetingHistory;
    }
}