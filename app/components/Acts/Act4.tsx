import React from "react";
import ActGrid, { ActNodeData, ActConnectionData } from "./ActGrid";
import Gyroscope from "../../../assets/icons/gyroscope.svg";
import { View } from "react-native";

const nodes: ActNodeData[] = [
  {
    id: "bsmysticspins",
    dataId: "bsmysticspins",
    type: "folder",
    x: -1,
    y: 2,
    name: "BS Mystic Spins",
  },
  {
    id: "fsmysticspins",
    dataId: "fsmysticspins",
    type: "folder",
    x: 1,
    y: 5,
    name: "FS Mystic Spins",
  },
  {
    id: "doubleflips",
    dataId: "doubleflips",
    type: "folder",
    x: -2,
    y: 8,
    name: "Double Flips",
  },
  {
    id: "doubleheels",
    dataId: "doubleheels",
    type: "folder",
    x: 2,
    y: 8,
    name: "Double Heels",
  },
  {
    id: "treflips",
    dataId: "treflips",
    type: "folder",
    x: -1,
    y: 12,
    name: "Tre Flips",
  },
  {
    id: "laserflips",
    dataId: "laserflips",
    type: "folder",
    x: 1,
    y: 15,
    name: "Laser Flips",
  },
  {
    id: "doubletres",
    dataId: "doubletres",
    type: "folder",
    x: -1,
    y: 18,
    name: "Double Tres",
  },
  {
    id: "doublelasers",
    dataId: "doublelasers",
    type: "folder",
    x: 1,
    y: 21,
    name: "Double Lasers",
  },
  {
    id: "impossibles",
    dataId: "impossibles",
    type: "folder",
    x: -2,
    y: 24,
    name: "Impossibles",
  },
  {
    id: "dolphinflips",
    dataId: "dolphinflips",
    type: "folder",
    x: 2,
    y: 24,
    name: "Dolphin Flips",
  },
  {
    id: "nightmareflips",
    dataId: "nightmareflips",
    type: "folder",
    x: -1,
    y: 27,
    name: "Nightmare Flips",
  },
  {
    id: "daydreamflips",
    dataId: "daydreamflips",
    type: "folder",
    x: 1,
    y: 30,
    name: "Daydream Flips",
  },
  {
    id: "bigflips",
    dataId: "bigflips",
    type: "folder",
    x: -2,
    y: 33,
    name: "Big Flips",
  },
  {
    id: "bigheels",
    dataId: "bigheels",
    type: "folder",
    x: 2,
    y: 33,
    name: "Big Heels",
  },
  {
    id: "gazellespins",
    dataId: "gazellespins",
    type: "folder",
    x: -1,
    y: 36,
    name: "Gazelle Spins",
  },
  {
    id: "gazelleflips",
    dataId: "gazelleflips",
    type: "folder",
    x: 1,
    y: 39,
    name: "Gazelle Flips",
  },
  {
    id: "lateflip",
    dataId: "lateflip",
    type: "trick",
    x: -2,
    y: 42,
    name: "Late Flip",
  },
  {
    id: "lateheel",
    dataId: "lateheel",
    type: "trick",
    x: 2,
    y: 42,
    name: "Late Heel",
  },
  {
    id: "latebsshuv",
    dataId: "latebsshuv",
    type: "trick",
    x: -1,
    y: 45,
    name: "Late BS Shuv",
  },
  {
    id: "latefsshuv",
    dataId: "latefsshuv",
    type: "trick",
    x: 1,
    y: 48,
    name: "Late FS Shuv",
  },
  {
    id: "bs360ollie",
    dataId: "bs360ollie",
    type: "trick",
    x: -2,
    y: 51,
    name: "BS 360",
  },
  {
    id: "fs360ollie",
    dataId: "fs360ollie",
    type: "trick",
    x: 2,
    y: 51,
    name: "FS 360",
  },
  {
    id: "blizzardflip",
    dataId: "blizzardflip",
    type: "trick",
    x: -1,
    y: 54,
    name: "Blizzard Flip",
  },
  {
    id: "ghettobirds",
    dataId: "ghettobirds",
    type: "folder",
    x: 0,
    y: 57,
    name: "Ghetto Birds",
  },
];

const connections: ActConnectionData[] = [
  { fromNode: "bsmysticspins", toNode: "fsmysticspins", type: "dotted" },
  { fromNode: "doubleflips", toNode: "doubleheels", type: "dotted" },
  { fromNode: "treflips", toNode: "laserflips", type: "dotted" },
  { fromNode: "treflips", toNode: "doubletres", type: "lined" },
  { fromNode: "laserflips", toNode: "doublelasers", type: "lined" },
  { fromNode: "impossibles", toNode: "nightmareflips", type: "lined" },
  { fromNode: "dolphinflips", toNode: "daydreamflips", type: "lined" },
  { fromNode: "bigflips", toNode: "gazellespins", type: "dotted" },
  { fromNode: "gazellespins", toNode: "gazelleflips", type: "lined" },
  { fromNode: "lateflip", toNode: "lateheel", type: "dotted" },
  { fromNode: "latebsshuv", toNode: "latefsshuv", type: "dotted" },
  { fromNode: "bs360ollie", toNode: "fs360ollie", type: "dotted" },
  { fromNode: "bs360ollie", toNode: "blizzardflip", type: "lined" },
  { fromNode: "blizzardflip", toNode: "ghettobirds", type: "lined" },
];

const backgroundElements = [
  {
    component: (
      <Gyroscope
        width={400}
        height={400}
        style={{ transform: [{ scaleX: -1 }] }}
      />
    ),
    position: { left: -200, top: 20 },
  },
];

interface Act4Props {
  onTrickPress: (id: string) => void;
  onInfoPress: (id: string) => void;
  onBossPress: (id: string) => void;
  onFolderPress: (id: string) => void;
  trickCompletionStates: Record<string, number>;
  infoCompletionStates: Record<string, boolean>;
}

const Act4: React.FC<Act4Props> = (props) => {
  return (
    <View className="flex-1">
      <ActGrid
        {...props}
        nodes={nodes}
        connections={connections}
        backgroundElements={backgroundElements}
        actNumber={4}
      />
    </View>
  );
};

export default Act4;
