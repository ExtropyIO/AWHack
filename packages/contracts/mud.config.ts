import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  tables: {
    Counter: {
      keySchema: {},
      schema: "uint32",
    },
    Dog: {
      keySchema: {
        dogId: "bytes32",
      },
      schema: {
        owner: "address",
        name: "string",
        color: "string",
      },
    },
  },
});
