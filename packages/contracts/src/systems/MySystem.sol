// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import { System } from "@latticexyz/world/src/System.sol";
import { Dog, DogTableId } from "../codegen/tables/Dog.sol";

contract MySystem is System {
  function addEntry(string memory name, string memory color) public returns (bytes32) {
    bytes32 key = bytes32(abi.encodePacked(block.number, msg.sender, gasleft()));
    address owner = _msgSender();
    Dog.set(key, owner, name, color);
    return key;
  }
}
