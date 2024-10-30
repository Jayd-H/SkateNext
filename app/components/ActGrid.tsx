import React from "react";
import { View, Dimensions, ScaledSize } from "react-native";
import { Svg, Path } from "react-native-svg";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { TrickButton, InfoButton, BossButton } from "./ButtonComponents";
import { TRICK_DATA } from "./trickData";
import { INFO_DATA } from "./infoData";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT }: ScaledSize =
  Dimensions.get("window");

const GRID_COLS = 8;
const GRID_ROWS = 20;

const CELL_WIDTH = SCREEN_WIDTH / GRID_COLS;
const CELL_HEIGHT = SCREEN_HEIGHT / GRID_ROWS;

export interface Node {
  id: string;
  type: "trick" | "info" | "boss";
  dataId: string;
  x?: number;
  y?: number;
}

export interface Connection {
  fromNode: string;
  toNode: string;
  type: "lined" | "dotted";
}

interface ActGridProps {
  nodes: Node[];
  connections: Connection[];
  onTrickPress: (id: string) => void;
  onInfoPress: (id: string) => void;
  onBossPress: (id: string) => void;
  trickCompletionStates: Record<string, number>;
  infoCompletionStates: Record<string, boolean>;
  backgroundComponent?: React.ReactNode;
  boundaryLimits: {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
    minScale: number;
    maxScale: number;
  };
  gridConfig: {
    cols: number;
    rows: number;
  };
}

const ActGrid: React.FC<ActGridProps> = ({
  nodes,
  connections,
  onTrickPress,
  onInfoPress,
  onBossPress,
  trickCompletionStates,
  infoCompletionStates,
  backgroundComponent,
  boundaryLimits,
  gridConfig,
}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const baseScale = useSharedValue(1);
  const CELL_WIDTH = SCREEN_WIDTH / gridConfig.cols;
  const CELL_HEIGHT = SCREEN_HEIGHT / gridConfig.rows;

  const panGesture = Gesture.Pan().onChange((event) => {
    const newX = translateX.value + event.changeX;
    const newY = translateY.value + event.changeY;

    if (newX >= boundaryLimits.minX && newX <= boundaryLimits.maxX) {
      translateX.value = newX;
    }
    if (newY >= boundaryLimits.minY && newY <= boundaryLimits.maxY) {
      translateY.value = newY;
    }
  });

  const pinchGesture = Gesture.Pinch()
    .onChange((event) => {
      const newScale = baseScale.value * event.scale;
      if (
        newScale >= boundaryLimits.minScale &&
        newScale <= boundaryLimits.maxScale
      ) {
        scale.value = newScale;
      }
    })
    .onBegin(() => {
      baseScale.value = scale.value;
    })
    .onFinalize(() => {
      baseScale.value = scale.value;
    });

  const gesture = Gesture.Simultaneous(panGesture, pinchGesture);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });

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

  const bossNodes = nodes.filter((node) => node.type === "boss");
  const regularNodes = nodes.filter((node) => node.type !== "boss");

  return (
    <View className="flex-1 bg-transparent">
      {backgroundComponent}

      <GestureDetector gesture={gesture}>
        <Animated.View className="flex-1" style={rStyle}>
          <Svg
            className="absolute inset-0 -z-20"
            width={SCREEN_WIDTH * 2}
            height={SCREEN_HEIGHT * 2}
          >
            {renderConnections()}
          </Svg>

          {regularNodes.map((node) => {
            const nodeData = getNodeData(node);
            if (!nodeData) return null;

            const { x, y } = getPosition(node);
            const buttonWidth = node.type === "trick" ? 70 : 80;

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
        </Animated.View>
      </GestureDetector>

      {bossNodes.map((node) => {
        const nodeData = getNodeData(node);
        if (!nodeData) return null;

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
      })}
    </View>
  );
};

export default ActGrid;
