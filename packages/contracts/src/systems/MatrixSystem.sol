// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { Matrix } from "../codegen/tables/Matrix.sol";

contract MatrixSystem is System {
  function addPoint(uint32 x, uint32 y) public returns (bytes32) {
    bytes32 key = bytes32(abi.encodePacked(block.number, msg.sender, gasleft()));
    address owner = _msgSender();
    Matrix.set(key, x, y);
    return key;
  }
}
