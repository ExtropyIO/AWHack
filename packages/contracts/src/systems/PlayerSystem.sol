// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { Position } from "../codegen/Tables.sol";
import {addressToEntity} from "../Utils.sol";

contract PlayerSystem is System {
  function spawn(int32 x, int32 y ) public  {
       bytes32 player = addressToEntity(_msgSender()); 
       Position.set(player,x,y);
  }
}
