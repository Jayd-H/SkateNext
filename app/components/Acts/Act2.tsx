import React from "react";
import ActGrid, { ActNodeData, ActConnectionData } from "./ActGrid";
import Emerald from "../../../assets/icons/emerald.svg";
import { ScrollView } from "react-native";

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
      <Emerald
        width={ICON_CONFIG.SIZE}
        height={ICON_CONFIG.SIZE}
        style={getIconStyle("left")}
        fill={"#131b19"}
      />
    ),
    position: getIconPosition("left", 0),
  },
  {
    component: (
      <Emerald
        width={ICON_CONFIG.SIZE}
        height={ICON_CONFIG.SIZE}
        style={getIconStyle("right")}
        fill={"#131b19"}
      />
    ),
    position: getIconPosition("right", 1),
  },
  {
    component: (
      <Emerald
        width={ICON_CONFIG.SIZE}
        height={ICON_CONFIG.SIZE}
        style={getIconStyle("left")}
        fill={"#131b19"}
      />
    ),
    position: getIconPosition("left", 2),
  },
  {
    component: (
      <Emerald
        width={ICON_CONFIG.SIZE}
        height={ICON_CONFIG.SIZE}
        style={getIconStyle("right")}
        fill={"#131b19"}
      />
    ),
    position: getIconPosition("right", 3),
  },
];

const nodes: ActNodeData[] = [
  {
    id: "fakieollie",
    dataId: "fakieollie",
    type: "trick",
    x: -2,
    y: 2,
    name: "Fakie Ollie",
  },
  {
    id: "nollie",
    dataId: "nollie",
    type: "trick",
    x: 2,
    y: 2,
    name: "Nollie",
  },
  {
    id: "switchollie",
    dataId: "switchollie",
    type: "trick",
    x: 0,
    y: 6,
    name: "Switch Ollie",
  },
  {
    id: "ollievariations",
    dataId: "ollievariations",
    type: "folder",
    x: -2,
    y: 9,
    name: "Ollie Variations",
  },
  {
    id: "fakieollievariations",
    dataId: "fakieollievariations",
    type: "folder",
    x: -1,
    y: 12,
    name: "Fakie Ollie Variations",
  },
  {
    id: "nollievariations",
    dataId: "nollievariations",
    type: "folder",
    x: 2,
    y: 9,
    name: "Nollie Variations",
  },
  {
    id: "switchshuvs",
    dataId: "switchshuvs",
    type: "folder",
    x: 0,
    y: 15,
    name: "Switch Shuvs",
  },
  {
    id: "bigspin",
    dataId: "bigspin",
    type: "trick",
    x: -1,
    y: 18,
    name: "Bigspin",
  },
  {
    id: "fsbigspin",
    dataId: "fsbigspin",
    type: "trick",
    x: 1,
    y: 21,
    name: "FS Bigspin",
  },
  {
    id: "bsbigspins",
    dataId: "bsbigspins",
    type: "folder",
    x: -2,
    y: 24,
    name: "BS Bigspins",
  },
  {
    id: "fsbigspins",
    dataId: "fsbigspins",
    type: "folder",
    x: 2,
    y: 24,
    name: "FS Bigspins",
  },
  {
    id: "kickflipinfo",
    dataId: "kickflipinfo",
    type: "info",
    x: 0,
    y: 27,
    name: "Kickflip Info",
  },
  {
    id: "kickflip",
    dataId: "kickflip",
    type: "boss",
    name: "Kickflip",
  },
];

export const act2Nodes = nodes;

const createConnections = (): ActConnectionData[] => {
  return [
    { fromNode: "fakieollie", toNode: "switchollie", type: "lined" },
    { fromNode: "nollie", toNode: "switchollie", type: "lined" },

    { fromNode: "fakieollie", toNode: "fakieollievariations", type: "lined" },
    { fromNode: "nollie", toNode: "nollievariations", type: "lined" },

    { fromNode: "switchollie", toNode: "switchshuvs", type: "dotted" },

    { fromNode: "switchshuvs", toNode: "bigspin", type: "dotted" },
    { fromNode: "bigspin", toNode: "fsbigspin", type: "lined" },
    { fromNode: "fsbigspin", toNode: "fsbigspins", type: "dotted" },
    { fromNode: "bigspin", toNode: "bsbigspins", type: "dotted" },
  ];
};
interface Act2Props {
  onTrickPress: (id: string) => void;
  onInfoPress: (id: string) => void;
  onBossPress: (id: string) => void;
  onFolderPress: (id: string) => void;
  trickCompletionStates: Record<string, number>;
  infoCompletionStates: Record<string, boolean>;
  scrollViewRef?: React.RefObject<ScrollView>;
}

const Act2: React.FC<Act2Props> = (props) => {
  return (
    <ActGrid
      {...props}
      nodes={nodes}
      connections={createConnections()}
      backgroundElements={backgroundElements}
      actNumber={2}
    />
  );
};

export default Act2;
