import React from "react";
import { View, Dimensions } from "react-native";
import ActGrid, { Node, Connection } from "./ActGrid";
import Gyroscope from "../../../assets/icons/gyroscope.svg";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const GRID_COLS = 32;
const GRID_ROWS = 60;

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
  // this will be a different button, i want it to be a congrats with a percentage of total completion across all of it
  { id: "ollie", dataId: "ollie", type: "boss" },
];

const connections: Connection[] = [];

interface Act4Props {
  onTrickPress: (id: string) => void;
  onInfoPress: (id: string) => void;
  onBossPress: (id: string) => void;
  onFolderPress: (id: string) => void;
  trickCompletionStates: Record<string, number>;
  infoCompletionStates: Record<string, boolean>;
}

const Act4: React.FC<Act4Props> = (props) => {
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

export default Act4;
