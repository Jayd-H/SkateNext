import React from "react";
import { View, Dimensions } from "react-native";
import ActGrid, { Node, Connection } from "./ActGrid";
import Gyroscope from "../../assets/icons/gyroscope.svg";

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

// these are all jumbled up at this point
const nodes: Node[] = [
  { id: "stance", dataId: "1", x: 8, y: 26, type: "info" },
  { id: "pushing", dataId: "2", x: 8, y: 24, type: "info" },
  { id: "shuv", dataId: "9", x: 12, y: 24, type: "trick" },
  { id: "fshuv", dataId: "10", x: 12, y: 21, type: "trick" },
  { id: "nshuv", dataId: "10", x: 12, y: 18, type: "trick" },
  { id: "frshuv", dataId: "10", x: 12, y: 15, type: "trick" },
  { id: "ollie", dataId: "1", type: "boss" },
];

const connections: Connection[] = [
  { fromNode: "stance", toNode: "pushing", type: "lined" },
  { fromNode: "pushing", toNode: "shuv", type: "lined" },
  { fromNode: "shuv", toNode: "fshuv", type: "lined" },
  { fromNode: "node1", toNode: "node4", type: "lined" },
  { fromNode: "fshuv", toNode: "ollie", type: "dotted" },
  { fromNode: "pushing", toNode: "ollie", type: "dotted" },
];

interface Act1Props {
  onTrickPress: (id: string) => void;
  onInfoPress: (id: string) => void;
  onBossPress: (id: string) => void;
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
