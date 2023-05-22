// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import { MudV2Test } from "@latticexyz/std-contracts/src/test/MudV2Test.t.sol";
import { IWorld } from "../src/codegen/world/IWorld.sol";
import { Dog } from "../src/codegen/Tables.sol";

contract MySystemTest is MudV2Test {
  IWorld world;

  function setUp() public override {
    super.setUp();
    world = IWorld(worldAddress);
  }

  function testWorldExists() public {
    uint256 codeSize;
    address addr = worldAddress;
    assembly {
      codeSize := extcodesize(addr)
    }
    assertTrue(codeSize > 0);
  }

  function testAddEntry() public {
    bytes32 key = world.addEntry("bob", "blue");

    string memory name = Dog.getName(world, key);
    string memory color = Dog.getColor(world, key);
    assertEq(name, "bob");
    assertEq(color, "blue");
  }
}
