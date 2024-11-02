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
  { id: "stance", dataId: "stance", x: 8, y: 22, type: "info" },
  { id: "pushing", dataId: "pushing", x: 8, y: 18, type: "info" },
  {
    id: "basicshuvs",
    type: "folder",
    dataId: "basicshuvs",
    x: 12,
    y: 18,
  },
  {
    id: "fakieshuvs",
    type: "folder",
    dataId: "fakieshuvs",
    x: 12,
    y: 14,
  },
  {
    id: "nollieshuvs",
    type: "folder",
    dataId: "nollieshuvs",
    x: 12,
    y: 10,
  },
  {
    id: "ncs",
    type: "folder",
    dataId: "ncs",
    x: 3,
    y: 6,
  },
  { id: "manual", dataId: "manual", x: 8, y: 14, type: "trick" },
  { id: "nosemanual", dataId: "nosemanual", x: 8, y: 10, type: "trick" },
  { id: "nc", dataId: "nc", x: 3, y: 10, type: "trick" },
  { id: "kickturn", dataId: "kickturn", x: 4, y: 18, type: "trick" },
  { id: "ollie", dataId: "ollie", type: "boss" },
  { id: "powerslide", dataId: "powerslide", x: 4, y: 14, type: "trick" },
  { id: "boneless", dataId: "boneless", x: 10, y: 6, type: "trick" },
];

const connections: Connection[] = [
  { fromNode: "stance", toNode: "pushing", type: "lined" },
  { fromNode: "pushing", toNode: "basicshuvs", type: "lined" },
  { fromNode: "basicshuvs", toNode: "ollie", type: "dotted" },
  { fromNode: "pushing", toNode: "ollie", type: "dotted" },
  { fromNode: "pushing", toNode: "nosemanual", type: "lined" },
  { fromNode: "pushing", toNode: "kickturn", type: "lined" },
  { fromNode: "pushing", toNode: "ollie", type: "dotted" },
  { fromNode: "nc", toNode: "ncs", type: "lined" },
];

interface Act1Props {
  onTrickPress: (id: string) => void;
  onInfoPress: (id: string) => void;
  onBossPress: (id: string) => void;
  onFolderPress: (id: string) => void;
  trickCompletionStates: Record<string, number>;
  infoCompletionStates: Record<string, boolean>;
}

const Act1: React.FC<Act1Props> = (props) => {
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

export default Act1;
