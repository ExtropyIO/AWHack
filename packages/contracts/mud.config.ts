import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  tables: {
    Counter: {
      keySchema: {},
      schema: "uint32",
    },
    Matrix: {
      keySchema: {
        matrixId: "bytes32",
      },
      schema: {
        x: "uint32",
        y: "uint32",
      },
    },
  },
});
