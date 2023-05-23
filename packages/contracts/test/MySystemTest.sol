// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import { MudV2Test } from "@latticexyz/std-contracts/src/test/MudV2Test.t.sol";
import { IWorld } from "../src/codegen/world/IWorld.sol";
import { Matrix } from "../src/codegen/Tables.sol";

contract MyMatrixTest is MudV2Test {
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

  function testAddPoint() public {
    bytes32 key = world.addPoint(28, 28);

    uint32 x = Matrix.getX(world, key);
    uint32 y = Matrix.getY(world, key);
    assertEq(x, 28);
    assertEq(y, 28);
  }
}
