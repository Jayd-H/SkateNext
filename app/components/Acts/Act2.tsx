import React from "react";
import { View, Dimensions } from "react-native";
import ActGrid, { Node, Connection } from "./ActGrid";
import Gyroscope from "../../../assets/icons/gyroscope.svg";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const GRID_COLS = 16;
const GRID_ROWS = 30;

const boundaryX: number = 6;
const boundaryY: number = 6;
const BOUNDARY_LIMITS = {
  minX: -SCREEN_WIDTH / boundaryX,
  maxX: SCREEN_WIDTH / boundaryX,
  minY: -SCREEN_HEIGHT / boundaryY,
  maxY: SCREEN_HEIGHT / boundaryY,
  minScale: 0.8,
  maxScale: 1.25,
};

const nodes: Node[] = [
  { id: "kickflip", dataId: "kickflip", type: "boss", x: 12, y: 5 },
  {
    id: "fakieollie",
    dataId: "fakieollie",
    type: "trick",
    x: 12,
    y: 22,
  },
  {
    id: "nollie",
    dataId: "nollie",
    type: "trick",
    x: 12,
    y: 14,
  },
  {
    id: "switchollie",
    dataId: "switchollie",
    type: "trick",
    x: 12,
    y: 6,
  },
  {
    id: "ollievariations",
    dataId: "ollievariations",
    type: "folder",
    x: 8,
    y: 22,
  },
  {
    id: "fakieollievariations",
    dataId: "fakieollievariations",
    type: "folder",
    x: 12,
    y: 18,
  },
  {
    id: "nollievariations",
    dataId: "nollievariations",
    type: "folder",
    x: 12,
    y: 10,
  },
  {
    id: "switchshuvs",
    dataId: "switchshuvs",
    type: "folder",
    x: 3,
    y: 22,
  },
  {
    id: "bigspin",
    dataId: "bigspin",
    type: "trick",
    x: 4,
    y: 18,
  },
  {
    id: "fsbigspin",
    dataId: "fsbigspin",
    type: "trick",
    x: 4,
    y: 10,
  },
  {
    id: "bsbigspins",
    dataId: "bsbigspins",
    type: "folder",
    x: 4,
    y: 14,
  },
  {
    id: "fsbigspins",
    dataId: "fsbigspins",
    type: "folder",
    x: 4,
    y: 6,
  },
  {
    id: "kickflipinfo",
    dataId: "kickflipinfo",
    type: "info",
    x: 8,
    y: 6,
  },
];

const connections: Connection[] = [
  { fromNode: "ollievariations", toNode: "kickflip", type: "dotted" },
  { fromNode: "fakieollie", toNode: "fakieollievariations", type: "lined" },
  { fromNode: "nollie", toNode: "nollievariations", type: "lined" },
  { fromNode: "bigspin", toNode: "bsbigspins", type: "lined" },
  { fromNode: "fsbigspin", toNode: "fsbigspins", type: "lined" },
  { fromNode: "bigspin", toNode: "kickflip", type: "dotted" },
  { fromNode: "fakieollie", toNode: "kickflip", type: "dotted" },
];

interface Act2Props {
  onTrickPress: (id: string) => void;
  onInfoPress: (id: string) => void;
  onBossPress: (id: string) => void;
  onFolderPress: (id: string) => void;
  trickCompletionStates: Record<string, number>;
  infoCompletionStates: Record<string, boolean>;
}

const Act2: React.FC<Act2Props> = (props) => {
  const backgroundComponent = (
    <View className="absolute -z-10 -left-[200px] top-[20px]">
      <Gyroscope
        width={400}
        height={400}
        style={{ transform: [{ scaleX: -1 }] }}
      />
    </View>
  );

  return (
    <ActGrid
      {...props}
      nodes={nodes}
      connections={connections}
      backgroundComponent={backgroundComponent}
      boundaryLimits={BOUNDARY_LIMITS}
      gridConfig={{ cols: GRID_COLS, rows: GRID_ROWS }}
    />
  );
};

export default Act2;
