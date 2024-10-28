import React from "react";
import { View, Dimensions, ScaledSize } from "react-native";
import { Svg, Path } from "react-native-svg";
import { TrickButton, InfoButton, BossButton } from "./ButtonComponents";
import { TRICK_DATA } from "./trickData";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT }: ScaledSize =
  Dimensions.get("window");

const GRID_COLS = 6;
const GRID_ROWS = 12;

const CELL_WIDTH = SCREEN_WIDTH / GRID_COLS;
const CELL_HEIGHT = SCREEN_HEIGHT / GRID_ROWS;

const CENTER_X = Math.floor(GRID_COLS / 2);
const CENTER_Y = Math.floor(GRID_ROWS / 2);

interface Trick {
  id: string;
  type: "trick" | "info" | "boss";
  x?: number;
  y?: number;
}

const tricks: Trick[] = [
  { id: "9", x: CENTER_X + 2, y: 6, type: "trick" },
  { id: "1", x: CENTER_X, y: 8, type: "trick" },
  { id: "3", x: CENTER_X, y: CENTER_Y, type: "trick" },
  { id: "2", type: "boss" },
];

interface Connection {
  from: string;
  to: string;
  type: "lined" | "dotted";
}

const connections: Connection[] = [
  { from: "2", to: "3", type: "lined" },
  { from: "3", to: "9", type: "dotted" },
  { from: "9", to: "1", type: "lined" },
];

interface Act1GridProps {
  onTrickPress: (id: string) => void;
  onInfoPress: (id: string) => void;
  onBossPress: (id: string) => void;
  trickCompletionStates: Record<string, number>;
}

const Act1Grid: React.FC<Act1GridProps> = ({
  onTrickPress,
  onInfoPress,
  onBossPress,
  trickCompletionStates,
}) => {
  const getPosition = (trick: Trick): { x: number; y: number } => {
    if (trick.type === "boss") {
      return { x: SCREEN_WIDTH / 2, y: CELL_HEIGHT };
    }
    return {
      x: (trick.x ?? 0) * CELL_WIDTH,
      y: (trick.y ?? 0) * CELL_HEIGHT,
    };
  };

  const renderConnections = () => {
    return connections.map((connection, index) => {
      const fromTrick = tricks.find((t) => t.id === connection.from);
      const toTrick = tricks.find((t) => t.id === connection.to);

      if (!fromTrick || !toTrick) return null;

      const { x: x1, y: y1 } = getPosition(fromTrick);
      const { x: x2, y: y2 } = getPosition(toTrick);

      let d: string;

      if (toTrick.type === "boss") {
        d = `M${x1},${y1} L${x1},${y2}`;
      } else {
        const midY = (y1 + y2) / 2;
        d = `M${x1},${y1} L${x1},${midY} L${x2},${midY} L${x2},${y2}`;
      }

      return (
        <Path
          key={index}
          d={d}
          stroke="#EBEFEF"
          strokeWidth="2"
          fill="none"
          strokeDasharray={connection.type === "dotted" ? "5,5" : ""}
        />
      );
    });
  };

  return (
    <View className="flex-1 bg-transparent">
      <Svg className="absolute inset-0">{renderConnections()}</Svg>
      {tricks.map((trick) => {
        const trickData = TRICK_DATA.find((t) => t.id === trick.id);
        if (!trickData) return null;

        if (trick.type === "boss") {
          return (
            <View
              key={trick.id}
              className="absolute top-0 left-0 right-0 items-center"
            >
              <BossButton
                id={trick.id}
                name={trickData.name}
                onPress={onBossPress}
                isCompleted={trickCompletionStates[trick.id] || 0}
              />
            </View>
          );
        }

        const { x, y } = getPosition(trick);
        const buttonWidth = trick.type === "trick" ? 85 : 75;

        return (
          <View
            key={trick.id}
            className="absolute"
            style={{
              left: x - buttonWidth / 2,
              top: y - 50,
            }}
          >
            {trick.type === "trick" && (
              <TrickButton
                id={trick.id}
                name={trickData.name}
                onPress={onTrickPress}
                isCompleted={trickCompletionStates[trick.id] || 0}
              />
            )}
            {trick.type === "info" && (
              <InfoButton
                id={trick.id}
                name={trickData.name}
                onPress={onInfoPress}
                isCompletedInfo={false}
              />
            )}
          </View>
        );
      })}
    </View>
  );
};

export default Act1Grid;
