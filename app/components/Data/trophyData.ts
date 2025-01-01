export interface Trophy {
  id: string;
  title: string;
  description: string;
  requiredTricks: string[];
}

export const TROPHY_DATA: Trophy[] = [
  {
    id: "allshuvs",
    title: "All the Shuvs",
    description: "BS Shuv and FS Shuv in all stances",
    requiredTricks: [
      "shuv",
      "fsshuv",
      "switchshuv",
      "switchfsshuv",
      "nollieshuv",
      "nolliefsshuv",
      "fakieshuv",
      "fakiefsshuv",
    ],
  },
  {
    id: "tremaster",
    title: "Tre Master",
    description: "Treflip in all stances",
    requiredTricks: [
      "treflip",
      "switchtreflip",
      "nollietreflip",
      "fakietreflip",
    ],
  },
  {
    id: "straighteight",
    title: "Straight-Eight",
    description: "Kickflip and Heelflip in all stances",
    requiredTricks: [
      "kickflip",
      "heelflip",
      "switchflip",
      "switchheelflip",
      "nollieflip",
      "nollieheelflip",
      "fakieflip",
      "fakieheelflip",
    ],
  },
  {
    id: "oldschoolking",
    title: "Old School King",
    description: "Master the classics",
    requiredTricks: [
      "nc",
      "fsnc180",
      "bsnc180",
      "strawberrymilkshake",
      "boneless",
    ],
  },
  {
    id: "spinmaster",
    title: "Spin Master",
    description: "Complete all 360-degree rotations",
    requiredTricks: [
      "bs360ollie",
      "fs360ollie",
      "fakiebs360",
      "fakiefs360",
      "nolliebs360",
      "nolliefs360",
    ],
  },
  {
    id: "impossible",
    title: "Mission Impossible",
    description: "Impossible trick in every stance",
    requiredTricks: [
      "impossible",
      "fakieimpossible",
      "nollieimpossible",
      "switchimpossible",
    ],
  },
  {
    id: "latemaster",
    title: "Late Than Never",
    description: "Master all late flip variations",
    requiredTricks: ["lateflip", "lateheel", "latebsshuv", "latefsshuv"],
  },
  {
    id: "controlfreak",
    title: "Control Freak",
    description: "Perfect the art of board control",
    requiredTricks: ["manual", "nosemanual", "powerslide", "kickturn"],
  },
  {
    id: "dolphintrainer",
    title: "Dolphin Trainer",
    description: "Complete all dolphin flip variations",
    requiredTricks: [
      "dolphinflip",
      "fakiedolphinflip",
      "nolliedolphinflip",
      "switchdolphinflip",
    ],
  },
  {
    id: "biggerbetter",
    title: "Bigger is Better",
    description: "Master all biggerspin variations",
    requiredTricks: [
      "biggerspin",
      "fsbiggerspin",
      "fakiebiggerspin",
      "fakiefsbiggerspin",
      "nolliebiggerspin",
      "nolliefsbiggerspin",
    ],
  },
];
