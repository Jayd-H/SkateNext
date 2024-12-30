import React from "react";
import ActGrid, { ActNodeData, ActConnectionData } from "./ActGrid";
import Minerals from "../../../assets/icons/minerals.svg";

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
      <Minerals
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
      <Minerals
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
      <Minerals
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
      <Minerals
        width={ICON_CONFIG.SIZE}
        height={ICON_CONFIG.SIZE}
        style={getIconStyle("right")}
        fill={"#131b19"}
      />
    ),
    position: getIconPosition("right", 3),
  },
  {
    component: (
      <Minerals
        width={ICON_CONFIG.SIZE}
        height={ICON_CONFIG.SIZE}
        style={getIconStyle("left")}
        fill={"#131b19"}
      />
    ),
    position: getIconPosition("left", 4),
  },
  {
    component: (
      <Minerals
        width={ICON_CONFIG.SIZE}
        height={ICON_CONFIG.SIZE}
        style={getIconStyle("right")}
        fill={"#131b19"}
      />
    ),
    position: getIconPosition("right", 5),
  },
];

const nodes: ActNodeData[] = [
  {
    id: "heelflip",
    dataId: "heelflip",
    type: "trick",
    x: 2,
    y: 2,
    name: "Heelflip",
  },
  {
    id: "kickflipvariations",
    dataId: "kickflipvariations",
    type: "folder",
    x: -2,
    y: 2,
    name: "Kickflip Variations",
  },
  {
    id: "heelflipvariations",
    dataId: "heelflipvariations",
    type: "folder",
    x: 2,
    y: 5,
    name: "Heelflip Variations",
  },
  {
    id: "bsflipvariations",
    dataId: "bsflipvariations",
    type: "folder",
    x: -1,
    y: 5,
    name: "BS Flip Variations",
  },
  {
    id: "fsflipvariations",
    dataId: "fsflipvariations",
    type: "folder",
    x: -2,
    y: 8,
    name: "FS Flip Variations",
  },
  {
    id: "fsheelflipvariations",
    dataId: "fsheelflipvariations",
    type: "folder",
    x: 1,
    y: 8,
    name: "FS Heelflip Variations",
  },
  {
    id: "bsheelflipvariations",
    dataId: "bsheelflipvariations",
    type: "folder",
    x: 2,
    y: 11,
    name: "BS Heelflip Variations",
  },
  {
    id: "varialkickflip",
    dataId: "varialkickflip",
    type: "trick",
    x: -1,
    y: 11,
    name: "Varial Kickflip",
  },
  {
    id: "varialheelflip",
    dataId: "varialheelflip",
    type: "trick",
    x: 1,
    y: 14,
    name: "Varial Heelflip",
  },
  {
    id: "hardflip",
    dataId: "hardflip",
    type: "trick",
    x: -2,
    y: 14,
    name: "Hardflip",
  },
  {
    id: "inwardheelflip",
    dataId: "inwardheelflip",
    type: "trick",
    x: 2,
    y: 17,
    name: "Inward Heelflip",
  },
  {
    id: "varialflipvariations",
    dataId: "varialflipvariations",
    type: "folder",
    x: -1,
    y: 17,
    name: "Varial Flip Variations",
  },
  {
    id: "varialheelflipvariations",
    dataId: "varialheelflipvariations",
    type: "folder",
    x: 1,
    y: 20,
    name: "Varial Heelflip Variations",
  },
  {
    id: "hardflipvariations",
    dataId: "hardflipvariations",
    type: "folder",
    x: -2,
    y: 20,
    name: "Hardflip Variations",
  },
  {
    id: "inwardheelflipvariations",
    dataId: "inwardheelflipvariations",
    type: "folder",
    x: 2,
    y: 23,
    name: "Inward Heelflip Variations",
  },
  {
    id: "biggerspin",
    dataId: "biggerspin",
    type: "trick",
    x: -1,
    y: 23,
    name: "Biggerspin",
  },
  {
    id: "biggerspins",
    dataId: "biggerspins",
    type: "folder",
    x: -1,
    y: 26,
    name: "Biggerspins",
  },
  {
    id: "fsbiggerspin",
    dataId: "fsbiggerspin",
    type: "trick",
    x: 0,
    y: 29,
    name: "FS Biggerspin",
  },
  {
    id: "fsbiggerspins",
    dataId: "fsbiggerspins",
    type: "folder",
    x: 0,
    y: 32,
    name: "FS Biggerspins",
  },
  {
    id: "hospitalflip",
    dataId: "hospitalflip",
    type: "trick",
    x: 0,
    y: 35,
    name: "Hospital Flip",
  },
  {
    id: "impossible",
    dataId: "impossible",
    type: "trick",
    x: 0,
    y: 38,
    name: "Impossible",
  },
  {
    id: "dolphinflip",
    dataId: "dolphinflip",
    type: "trick",
    x: 0,
    y: 41,
    name: "Dolphin Flip",
  },
  {
    id: "treflip",
    dataId: "treflip",
    type: "boss",
    x: 0,
    y: 44,
    name: "360 Flip",
  },
];

const connections: ActConnectionData[] = [
  { fromNode: "heelflip", toNode: "heelflipvariations", type: "lined" },
  { fromNode: "kickflipvariations", toNode: "varialkickflip", type: "lined" },
  { fromNode: "heelflipvariations", toNode: "varialheelflip", type: "lined" },
  { fromNode: "varialkickflip", toNode: "hardflip", type: "dotted" },
  { fromNode: "varialheelflip", toNode: "inwardheelflip", type: "dotted" },
  { fromNode: "hardflip", toNode: "hardflipvariations", type: "lined" },
  {
    fromNode: "inwardheelflip",
    toNode: "inwardheelflipvariations",
    type: "lined",
  },
  { fromNode: "hardflipvariations", toNode: "biggerspin", type: "dotted" },
  { fromNode: "biggerspin", toNode: "fsbiggerspin", type: "dotted" },
  { fromNode: "fsbiggerspin", toNode: "impossible", type: "dotted" },
  { fromNode: "impossible", toNode: "treflip", type: "lined" },
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
  return (
    <ActGrid
      {...props}
      nodes={nodes}
      connections={connections}
      backgroundElements={backgroundElements}
      actNumber={3}
    />
  );
};

export default Act3;
