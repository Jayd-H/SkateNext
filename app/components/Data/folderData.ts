export interface FolderData {
  id: string;
  nodeTitle: string;
  title: string;
  description: string;
  containedTricks: string[];
}

export const FOLDER_DATA: FolderData[] = [
  {
    id: "basicshuvs",
    nodeTitle: "Shuvs", 
    title: "Basic Shuvs",  
    description: "These are the first basic shuv variations you should learn, frontside and backside. ",
    containedTricks: ["shuv", "fsshuv"],
  },
  {
    id: "fakieshuvs",
    nodeTitle: "Fakie Shuvs",
    title: "Fakie Shuvs",
    description: "Now moving onto fakie shuvs, frontside and backside.",
    containedTricks: ["fakieshuv", "fakiefsshuv"],
  },
  {
    id: "nollieshuvs",
    nodeTitle: "Nollie Shuvs",
    title: "Nollie Shuvs",
    description: "Finally, nollie shuvs, frontside and backside.",
    containedTricks: ["nollieshuv", "nolliefsshuv"],
  },
  {
    id: "switchshuvs",
    nodeTitle: "Switch Shuvs",
    title: "Switch Shuvs",
    description: "The last set of shuv variations, switch frontside and backside.",
    containedTricks: ["switchshuv", "switchfsshuv"],
  },
  {
    id: "ncs",
    nodeTitle: "No-Complys+",
    title: "Further No-Complys",
    description: "Learn some more advanced no-comply variations.",
    containedTricks: ["fsnc180", "bsnc180"],

  }
];