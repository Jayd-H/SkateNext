import React from "react";
import ActGrid, { ActNodeData, ActConnectionData } from "./ActGrid";
import Gyroscope from "../../../assets/icons/gyroscope.svg";

const ICON_CONFIG = {
  SIZE: 400,
  SPACING: 400,
  INITIAL_OFFSET: 20,
};

type IconPosition = "left" | "right";

const getIconStyle = (position: IconPosition) => ({
  transform: position === "left" ? [{ scaleX: -1 }] : undefined,
});

const getIconPosition = (position: IconPosition, index: number) => ({
  left: position === "left" ? -(ICON_CONFIG.SIZE / 2) : ICON_CONFIG.SIZE / 2,
  top: ICON_CONFIG.INITIAL_OFFSET + index * ICON_CONFIG.SPACING,
});

const backgroundElements = [
  {
    component: (
      <Gyroscope
        width={ICON_CONFIG.SIZE}
        height={ICON_CONFIG.SIZE}
        style={getIconStyle("left")}
      />
    ),
    position: getIconPosition("left", 0),
  },
  {
    component: (
      <Gyroscope
        width={ICON_CONFIG.SIZE}
        height={ICON_CONFIG.SIZE}
        style={getIconStyle("right")}
      />
    ),
    position: getIconPosition("right", 1),
  },
  {
    component: (
      <Gyroscope
        width={ICON_CONFIG.SIZE}
        height={ICON_CONFIG.SIZE}
        style={getIconStyle("left")}
      />
    ),
    position: getIconPosition("left", 2),
  },
  {
    component: (
      <Gyroscope
        width={ICON_CONFIG.SIZE}
        height={ICON_CONFIG.SIZE}
        style={getIconStyle("right")}
      />
    ),
    position: getIconPosition("right", 3),
  },
];

const nodes: ActNodeData[] = [
  {
    id: "stance",
    dataId: "stance",
    type: "info",
    x: -2,
    y: 2,
    name: "Stance",
  },
  {
    id: "pushing",
    dataId: "pushing",
    type: "info",
    x: 0,
    y: 5,
    name: "Pushing",
  },
  {
    id: "basicshuvs",
    type: "folder",
    dataId: "basicshuvs",
    x: 1,
    y: 12,
    name: "Basic Shuvs",
  },
  {
    id: "fakieshuvs",
    type: "folder",
    dataId: "fakieshuvs",
    x: 2,
    y: 8,
    name: "Fakie Shuvs",
  },
  {
    id: "nollieshuvs",
    type: "folder",
    dataId: "nollieshuvs",
    x: 2,
    y: 15,
    name: "Nollie Shuvs",
  },
  {
    id: "ncs",
    type: "folder",
    dataId: "ncs",
    x: -2,
    y: 20,
    name: "NCs+",
  },
  {
    id: "manual",
    dataId: "manual",
    type: "trick",
    x: 2,
    y: 18,
    name: "Manual",
  },
  {
    id: "nosemanual",
    dataId: "nosemanual",
    type: "trick",
    x: 1,
    y: 21,
    name: "Nose Manual",
  },
  {
    id: "nc",
    dataId: "nc",
    type: "trick",
    x: -1,
    y: 17,
    name: "No Comply",
  },
  {
    id: "kickturn",
    dataId: "kickturn",
    type: "trick",
    x: -2,
    y: 10,
    name: "Kick Turn",
  },
  {
    id: "powerslide",
    dataId: "powerslide",
    type: "trick",
    x: -2,
    y: 14,
    name: "Powerslide",
  },
  {
    id: "boneless",
    dataId: "boneless",
    type: "trick",
    x: -1,
    y: 24,
    name: "Boneless",
  },
  {
    id: "ollie",
    dataId: "ollie",
    type: "boss",
    name: "Ollie",
  },
];

const createConnections = (): ActConnectionData[] => {
  return [
    { fromNode: "stance", toNode: "pushing", type: "lined" },
    { fromNode: "pushing", toNode: "kickturn", type: "lined" },
    { fromNode: "pushing", toNode: "fakieshuvs", type: "lined" },
    { fromNode: "kickturn", toNode: "powerslide", type: "lined" },
    { fromNode: "basicshuvs", toNode: "fakieshuvs", type: "dotted" },
    { fromNode: "basicshuvs", toNode: "nollieshuvs", type: "dotted" },
    { fromNode: "powerslide", toNode: "nc", type: "dotted" },
    { fromNode: "nc", toNode: "ncs", type: "lined" },
    { fromNode: "manual", toNode: "nosemanual", type: "lined" },
    { fromNode: "ncs", toNode: "boneless", type: "dotted" },
  ];
};

interface Act1Props {
  onTrickPress: (id: string) => void;
  onInfoPress: (id: string) => void;
  onBossPress: (id: string) => void;
  onFolderPress: (id: string) => void;
  trickCompletionStates: Record<string, number>;
  infoCompletionStates: Record<string, boolean>;
}

const Act1: React.FC<Act1Props> = (props) => {
  return (
    <ActGrid
      {...props}
      nodes={nodes}
      connections={createConnections()}
      backgroundElements={backgroundElements}
      actNumber={1}
    />
  );
};

export default Act1;
