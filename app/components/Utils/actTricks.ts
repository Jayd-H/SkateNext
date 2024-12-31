import { ActNodeData } from "../Acts/ActGrid";
import { FOLDER_DATA } from "../Data/folderData";
import { act1Nodes } from "../Acts/Act1";
import { act2Nodes } from "../Acts/Act2";
import { act3Nodes } from "../Acts/Act3";
import { act4Nodes } from "../Acts/Act4";

interface ActTrickCache {
  [actNumber: number]: string[];
}

const expandFolderTricks = (folderId: string): string[] => {
  const folder = FOLDER_DATA.find((f) => f.id === folderId);
  const tricks = folder ? folder.containedTricks : [];
  return tricks;
};

const sortNodesByPosition = (nodes: ActNodeData[]): ActNodeData[] => {
  return [...nodes].sort((a, b) => {
    if (a.y === undefined || b.y === undefined) return 0;
    return a.y - b.y;
  });
};

const extractTricksFromNodes = (nodes: ActNodeData[]): string[] => {
  const sortedNodes = sortNodesByPosition(nodes);
  const tricks: string[] = [];
  const bossNodes: ActNodeData[] = [];

  sortedNodes.forEach((node) => {
    if (node.type === "boss") {
      bossNodes.push(node);
      return;
    }

    if (node.type === "trick") {
      tricks.push(node.dataId);
    } else if (node.type === "folder") {
      tricks.push(...expandFolderTricks(node.dataId));
    }
  });

  bossNodes.forEach((boss) => {
    tricks.push(boss.dataId);
  });

  return tricks;
};

const actTrickCache: ActTrickCache = {
  1: extractTricksFromNodes(act1Nodes),
  2: extractTricksFromNodes(act2Nodes),
  3: extractTricksFromNodes(act3Nodes),
  4: extractTricksFromNodes(act4Nodes),
};

export const getActTricks = (actNumber: number): string[] => {
  console.log("[ActTricks] Getting tricks for act:", actNumber);
  const tricks = actTrickCache[actNumber] || [];
  console.log("[ActTricks] Retrieved tricks count:", tricks.length);
  return tricks;
};
