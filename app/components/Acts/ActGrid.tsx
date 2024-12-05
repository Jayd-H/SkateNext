import React, { useState, useMemo } from "react";
import { View, ScrollView, Dimensions, StyleSheet } from "react-native";
import { FOLDER_DATA } from "../Data/folderData";
import {
  TrickButton,
  BossButton,
  InfoButton,
  FolderButton,
} from "./NodeButtons";
import {
  ConnectionContainer,
  type Point,
  type ConnectionProps,
} from "./Connection";
import { getProgressiveTrick, StatsButton } from "./NodeButtons/StatsButton";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Constants
const CELL_SIZE = 45;
const BUTTON_SIZE = {
  width: 90,
  height: 90,
};
const BOSS_MARGIN = {
  top: 100,
  bottom: 30,
};
const DEFAULT_CONNECTION_COLOR = "#7A9E9B";
const DEFAULT_CONNECTION_THICKNESS = 2;

// Types
export type NodeType = "trick" | "info" | "boss" | "folder";

export interface ActNodeData {
  id: string;
  dataId: string;
  type: NodeType;
  x?: number;
  y?: number;
  name: string;
}

export interface ActConnectionData {
  fromNode: string;
  toNode: string;
  type: "lined" | "dotted";
  color?: string;
}

interface BackgroundElement {
  component: React.ReactNode;
  position: {
    left: number;
    top: number;
  };
}

interface ActGridProps {
  nodes: ActNodeData[];
  connections: ActConnectionData[];
  onTrickPress: (id: string) => void;
  onInfoPress: (id: string) => void;
  onBossPress: (id: string) => void;
  onFolderPress: (id: string) => void;
  trickCompletionStates: Record<string, number>;
  infoCompletionStates: Record<string, boolean>;
  backgroundElements?: BackgroundElement[];
  actNumber: number;
}

const ActGrid: React.FC<ActGridProps> = ({
  nodes,
  connections,
  onTrickPress,
  onInfoPress,
  onBossPress,
  onFolderPress,
  trickCompletionStates,
  infoCompletionStates,
  backgroundElements = [],
  actNumber,
}) => {
  // State
  const [contentHeight, setContentHeight] = useState(0);

  // Memoized Values
  const regularNodes = useMemo(
    () => nodes.filter((node) => node.type !== "boss"),
    [nodes]
  );

  const bossNode = useMemo(
    () => nodes.find((node) => node.type === "boss"),
    [nodes]
  );

  const maxY = useMemo(
    () => Math.max(...regularNodes.map((n) => n.y || 0)),
    [regularNodes]
  );

  const minHeight = useMemo(
    () =>
      Math.max(
        SCREEN_HEIGHT,
        (maxY + 1) * CELL_SIZE + BOSS_MARGIN.top + BUTTON_SIZE.height
      ),
    [maxY]
  );

  // Helper Functions
  const getScreenPosition = (node: ActNodeData): Point | null => {
    if (node.x === undefined || node.y === undefined) return null;

    return {
      x: SCREEN_WIDTH / 2 + node.x * CELL_SIZE,
      y: node.y * CELL_SIZE,
    };
  };

  const processConnections = useMemo(() => {
    const processedConnections: ConnectionProps[] = [];

    connections.forEach((connection) => {
      const fromNode = nodes.find((n) => n.id === connection.fromNode);
      const toNode = nodes.find((n) => n.id === connection.toNode);

      if (!fromNode || !toNode) return;

      const fromPos = getScreenPosition(fromNode);
      const toPos = getScreenPosition(toNode);

      if (!fromPos || !toPos) return;

      processedConnections.push({
        startPoint: fromPos,
        endPoint: toPos,
        type: connection.type,
        color: connection.color || DEFAULT_CONNECTION_COLOR,
        thickness: DEFAULT_CONNECTION_THICKNESS,
      });
    });

    return processedConnections;
  }, [connections, nodes]);

  // Render Functions
  const renderNode = (node: ActNodeData) => {
    const position = getScreenPosition(node);
    if (!position) return null;

    const commonStyle = {
      position: "absolute" as const,
      left: position.x - BUTTON_SIZE.width / 2,
      top: position.y - BUTTON_SIZE.height / 2,
    };

    switch (node.type) {
      case "trick":
        return (
          <View key={node.id} style={commonStyle}>
            <TrickButton
              id={node.dataId}
              name={node.name}
              onPress={onTrickPress}
              isCompleted={trickCompletionStates[node.dataId] || 0}
            />
          </View>
        );

      case "info":
        return (
          <View key={node.id} style={commonStyle}>
            <InfoButton
              id={node.dataId}
              name={node.name}
              onPress={onInfoPress}
              isCompletedInfo={infoCompletionStates[node.dataId] || false}
            />
          </View>
        );

      case "folder": {
        const folderData = FOLDER_DATA.find((f) => f.id === node.dataId);
        if (!folderData) return null;

        return (
          <View key={node.id} style={commonStyle}>
            <FolderButton
              id={node.id}
              title={folderData.title}
              nodeTitle={folderData.nodeTitle}
              containedTricks={folderData.containedTricks}
              onPress={onFolderPress}
              trickCompletionStates={trickCompletionStates}
            />
          </View>
        );
      }

      default:
        return null;
    }
  };

  const renderBottomButton = () => {
    if (actNumber === 4) {
      return (
        <View style={styles.bossContainer}>
          <StatsButton
            onPress={() => {
              const trickId = getProgressiveTrick(trickCompletionStates);
              onTrickPress(trickId);
            }}
            trickStates={trickCompletionStates}
          />
        </View>
      );
    }

    if (!bossNode) return null;

    return (
      <View style={styles.bossContainer}>
        <BossButton
          id={bossNode.dataId}
          name={bossNode.name}
          onPress={onBossPress}
          isCompleted={trickCompletionStates[bossNode.dataId] || 0}
        />
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.scrollContent, { minHeight }]}
    >
      {backgroundElements.map((bg, index) => (
        <View key={index} style={[styles.backgroundElement, bg.position]}>
          {bg.component}
        </View>
      ))}

      <ConnectionContainer
        connections={processConnections}
        width={SCREEN_WIDTH}
        height={minHeight}
      />

      <View
        style={styles.nodesContainer}
        onLayout={(e) => setContentHeight(e.nativeEvent.layout.height)}
      >
        {regularNodes.map(renderNode)}
      </View>

      {renderBottomButton()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  backgroundElement: {
    position: "absolute",
  },
  nodesContainer: {
    flex: 1,
    minHeight: SCREEN_HEIGHT,
  },
  bossContainer: {
    position: "absolute",
    bottom: BOSS_MARGIN.bottom,
    left: 0,
    right: 0,
    alignItems: "center",
    width: "100%",
  },
});

export default ActGrid;
