import { PhaserLayer } from "../createPhaserLayer";
import { createCamera } from "./createCamera";
import { createControlsSystem } from "./createControlSystems";
import { createMapSystem } from "./createMapSystem";
import { createPlayerSystem } from "./createPlayerSystem";

export const registerSystems = (layer: PhaserLayer) => {
  createCamera(layer);
  createMapSystem(layer);
  createPlayerSystem(layer);
  createControlsSystem(layer);
};