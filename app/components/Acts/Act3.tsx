import React from "react";
import { View, Dimensions } from "react-native";
import ActGrid, { Node, Connection } from "./ActGrid";
import Gyroscope from "../../../assets/icons/gyroscope.svg";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const GRID_COLS = 24;
const GRID_ROWS = 45;

const boundaryX: number = 6;
const boundaryY: number = 6;
const BOUNDARY_LIMITS = {
  minX: -SCREEN_WIDTH / boundaryX,
  maxX: SCREEN_WIDTH / boundaryX,
  minY: -SCREEN_HEIGHT / boundaryY,
  maxY: SCREEN_HEIGHT / boundaryY,
  minScale: 0.75,
  maxScale: 1.25,
};

const initialScale = 0.75;

const nodes: Node[] = [
  { id: "treflip", dataId: "treflip", type: "boss" },
  { id: "heelflip", dataId: "heelflip", type: "trick", x: 18, y: 34 },
  {
    id: "kickflipvariations",
    dataId: "kickflipvariations",
    type: "folder",
    x: 12,
    y: 34,
  },
  {
    id: "heelflipvariations",
    dataId: "heelflipvariations",
    type: "folder",
    x: 18,
    y: 28,
  },
  {
    id: "varialkickflip",
    dataId: "varialkickflip",
    type: "trick",
    x: 12,
    y: 22,
  },
  {
    id: "varialheelflip",
    dataId: "varialheelflip",
    type: "trick",
    x: 18,
    y: 16,
  },
  {
    id: "varialheelflipvariations",
    dataId: "varialheelflipvariations",
    type: "folder",
    x: 18,
    y: 10,
  },
  {
    id: "varialflipvariations",
    dataId: "varialflipvariations",
    type: "folder",
    x: 12,
    y: 16,
  },
  {
    id: "bsflipvariations",
    dataId: "bsflipvariations",
    type: "folder",
    x: 12,
    y: 28,
  },
  {
    id: "fsflipvariations",
    dataId: "fsflipvariations",
    type: "folder",
    x: 6,
    y: 28,
  },
  {
    id: "bsheelflipvariations",
    dataId: "bsheelflipvariations",
    type: "folder",
    x: 24,
    y: 28,
  },
  {
    id: "fsheelflipvariations",
    dataId: "fsheelflipvariations",
    type: "folder",
    x: 18,
    y: 22,
  },
  {
    id: "hardflip",
    dataId: "hardflip",
    type: "trick",
    x: 6,
    y: 22,
  },
  {
    id: "inwardheelflip",
    dataId: "inwardheelflip",
    type: "trick",
    x: 24,
    y: 22,
  },
  {
    id: "hardflipvariations",
    dataId: "hardflipvariations",
    type: "folder",
    x: 6,
    y: 16,
  },
  {
    id: "inwardheelflipvariations",
    dataId: "inwardheelflipvariations",
    type: "folder",
    x: 24,
    y: 16,
  },
  {
    id: "biggerspin",
    dataId: "biggerspin",
    type: "trick",
    x: 0,
    y: 34,
  },
  {
    id: "biggerspins",
    dataId: "biggerspins",
    type: "folder",
    x: 0,
    y: 28,
  },
  {
    id: "fsbiggerspin",
    dataId: "fsbiggerspin",
    type: "trick",
    x: 0,
    y: 22,
  },
  {
    id: "fsbiggerspins",
    dataId: "fsbiggerspins",
    type: "folder",
    x: 0,
    y: 16,
  },
  {
    id: "hospitalflip",
    dataId: "hospitalflip",
    type: "trick",
    x: 3,
    y: 10,
  },
  {
    id: "impossible",
    dataId: "impossible",
    type: "trick",
    x: 9,
    y: 10,
  },
  {
    id: "dolphinflip",
    dataId: "dolphinflip",
    type: "trick",
    x: 6,
    y: 4,
  },
];

const connections: Connection[] = [
  { fromNode: "kickflipvariations", toNode: "bsflipvariations", type: "lined" },
  { fromNode: "bsflipvariations", toNode: "varialkickflip", type: "dotted" },
  { fromNode: "varialkickflip", toNode: "varialflipvariations", type: "lined" },
  { fromNode: "varialflipvariations", toNode: "treflip", type: "lined" },
  { fromNode: "kickflipvariations", toNode: "fsflipvariations", type: "lined" },
  { fromNode: "fsflipvariations", toNode: "hardflip", type: "dotted" },
  { fromNode: "hardflip", toNode: "hardflipvariations", type: "lined" },

  { fromNode: "heelflip", toNode: "heelflipvariations", type: "lined" },
  {
    fromNode: "heelflipvariations",
    toNode: "fsheelflipvariations",
    type: "lined",
  },
  {
    fromNode: "fsheelflipvariations",
    toNode: "varialheelflip",
    type: "dotted",
  },
  {
    fromNode: "varialheelflip",
    toNode: "varialheelflipvariations",
    type: "lined",
  },
  {
    fromNode: "inwardheelflip",
    toNode: "inwardheelflipvariations",
    type: "lined",
  },

  {
    fromNode: "heelflipvariations",
    toNode: "bsheelflipvariations",
    type: "lined",
  },
  {
    fromNode: "bsheelflipvariations",
    toNode: "inwardheelflip",
    type: "dotted",
  },

  { fromNode: "biggerspin", toNode: "biggerspins", type: "lined" },
  { fromNode: "biggerspins", toNode: "fsbiggerspin", type: "dotted" },
  { fromNode: "fsbiggerspin", toNode: "fsbiggerspins", type: "lined" },
];

interface Act3Props {
  onTrickPress: (id: string) => void;
  onInfoPress: (id: string) => void;
  onBossPress: (id: string) => void;
  onFolderPress: (id: string) => void;
  trickCompletionStates: Record<string, number>;
  infoCompletionStates: Record<string, boolean>;
}

const Act3: React.FC<Act3Props> = (props) => {
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
      initialScale={initialScale}
    />
  );
};

export default Act3;
