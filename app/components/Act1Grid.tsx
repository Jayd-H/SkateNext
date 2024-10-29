// TODO: this file is a bit of a mess, ideally there should be a generic act component, then each act should be a seperate component that only dictates the layout of the nodes and connections

import React from "react";
import { View, Dimensions, ScaledSize } from "react-native";
import { Svg, Path } from "react-native-svg";
import { TrickButton, InfoButton, BossButton } from "./ButtonComponents";
import { TRICK_DATA } from "./trickData";
import { INFO_DATA } from "./infoData";
import Gyroscope from "../../assets/icons/gyroscope.svg";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT }: ScaledSize =
  Dimensions.get("window");

const GRID_COLS = 6;
const GRID_ROWS = 12;

const CELL_WIDTH = SCREEN_WIDTH / GRID_COLS;
const CELL_HEIGHT = SCREEN_HEIGHT / GRID_ROWS;

const CENTER_X = Math.floor(GRID_COLS / 2);
const CENTER_Y = Math.floor(GRID_ROWS / 2);

interface Node {
  id: string;
  type: "trick" | "info" | "boss";
  dataId: string;
  x?: number;
  y?: number;
}

interface Connection {
  fromNode: string;
  toNode: string;
  type: "lined" | "dotted";
}

// TODO rename these to actually be the trick they are representing and set up the nodes for act 1
const nodes: Node[] = [
  { id: "node1", dataId: "9", x: CENTER_X + 2, y: 6, type: "trick" },
  { id: "node2", dataId: "10", x: CENTER_X, y: 8, type: "trick" },
  { id: "node3", dataId: "3", x: CENTER_X, y: CENTER_Y, type: "trick" },
  { id: "node4", dataId: "1", type: "boss" },
  { id: "node5", dataId: "2", x: CENTER_X, y: 4, type: "info" },
];

const connections: Connection[] = [
  { fromNode: "node2", toNode: "node3", type: "lined" },
  { fromNode: "node3", toNode: "node1", type: "dotted" },
  { fromNode: "node1", toNode: "node4", type: "lined" },
];

interface Act1GridProps {
  onTrickPress: (id: string) => void;
  onInfoPress: (id: string) => void;
  onBossPress: (id: string) => void;
  trickCompletionStates: Record<string, number>;
  infoCompletionStates: Record<string, boolean>;
}

const Act1Grid: React.FC<Act1GridProps> = ({
  onTrickPress,
  onInfoPress,
  onBossPress,
  trickCompletionStates,
  infoCompletionStates,
}) => {
  const getPosition = (node: Node): { x: number; y: number } => {
    if (node.type === "boss") {
      return { x: SCREEN_WIDTH / 2, y: CELL_HEIGHT };
    }
    return {
      x: (node.x ?? 0) * CELL_WIDTH,
      y: (node.y ?? 0) * CELL_HEIGHT,
    };
  };

  const renderConnections = () => {
    return connections.map((connection, index) => {
      const fromNode = nodes.find((n) => n.id === connection.fromNode);
      const toNode = nodes.find((n) => n.id === connection.toNode);

      if (!fromNode || !toNode) return null;

      const { x: x1, y: y1 } = getPosition(fromNode);
      const { x: x2, y: y2 } = getPosition(toNode);

      let d: string;

      if (toNode.type === "boss") {
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

  const getNodeData = (node: Node) => {
    if (node.type === "info") {
      return INFO_DATA.find((i) => i.id === node.dataId);
    }
    return TRICK_DATA.find((t) => t.id === node.dataId);
  };

  return (
    <View className="flex-1 bg-transparent">
      <Svg className="absolute inset-0">{renderConnections()}</Svg>
      {nodes.map((node) => {
        const nodeData = getNodeData(node);
        if (!nodeData) return null;

        if (node.type === "boss") {
          return (
            <View
              key={node.id}
              className="absolute top-0 left-0 right-0 items-center"
            >
              <BossButton
                id={node.dataId}
                name={nodeData.name}
                onPress={onBossPress}
                isCompleted={trickCompletionStates[node.dataId] || 0}
              />
            </View>
          );
        }

        const { x, y } = getPosition(node);
        const buttonWidth = node.type === "trick" ? 85 : 75;

        return (
          <View
            key={node.id}
            className="absolute"
            style={{
              left: x - buttonWidth / 2,
              top: y - 50,
            }}
          >
            {node.type === "trick" && (
              <TrickButton
                id={node.dataId}
                name={nodeData.name}
                onPress={onTrickPress}
                isCompleted={trickCompletionStates[node.dataId] || 0}
              />
            )}
            {node.type === "info" && (
              <InfoButton
                id={node.dataId}
                name={nodeData.name}
                onPress={onInfoPress}
                isCompletedInfo={infoCompletionStates[node.dataId] || false}
              />
            )}
          </View>
        );
      })}
      <View className="absolute -z-10 -left-[200px] top-[20px]">
        <Gyroscope
          width={400}
          height={400}
          style={{ transform: [{ scaleX: -1 }] }}
        />
      </View>
    </View>
  );
};

export default Act1Grid;
