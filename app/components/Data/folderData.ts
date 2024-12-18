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
    containedTricks: ["fsnc180", "bsnc180","strawberrymilkshake"],
  },
  {
    id:"ollievariations",
    nodeTitle: "Ollies+",
    title: "Ollie Variations",
    description: "Learn some more advanced ollie variations.",
    containedTricks: ["fs180", "bs180"],
  },
  {
    id:"switchollievariations",
    nodeTitle: "SwOllies+",
    title: "Switch Ollie Variations",
    description: "Learn some more advanced switch ollie variations.",
    containedTricks: ["switchfs180", "switchbs180"],
  },
  {
    id: "nollievariations",
    nodeTitle: "Nollies+",
    title: "Nollie Variations",
    description: "Learn some more advanced nollie variations.",
    containedTricks: ["nolliefs180", "nolliebs180"],
  },
  {
    id: "fakieollievariations",
    nodeTitle: "FOllies+",
    title: "Fakie Ollie Variations",
    description: "Learn some more advanced fakie ollie variations.",
    containedTricks: ["fakiefs180", "fakiebs180"],
  },
   {
    id: "treflips",
    nodeTitle: "Tre Flips",
    title: "360 Flip Variations",
    description: "Master the 360 flip in different stances. The regular tre flip is a foundational trick to learn first.",
    containedTricks: ["fakietreflip", "nollietreflip", "switchtreflip"],
  },
  {
    id: "laserflips",
    nodeTitle: "Laser Flips",
    title: "360 Heelflip Variations",
    description: "The laser flip family - a frontside 360 with a heelflip in different stances.",
    containedTricks: ["fakielasertreflip", "nollielasertreflip", "switchlasertreflip"],
  },
  {
    id: "impossibles",
    nodeTitle: "Impossibles",
    title: "Impossible Variations",
    description: "The impossible trick family - vertical wrapped 360° rotations in different stances.",
    containedTricks: ["fakieimpossible", "nollieimpossible", "switchimpossible"],
  },
  {
    id: "ghettobirds",
    nodeTitle: "Ghetto Birds",
    title: "Ghetto Bird Variations",
    description: "The ghetto bird family - hardflip late backside 180s in different stances.",
    containedTricks: ["ghettobird", "fakieghettobird", "nollieghettobird", "switchghettobird"],
  },
  {
    id: "dolphinflips",
    nodeTitle: "Dolphin Flips",
    title: "Forward Flip Variations",
    description: "The dolphin flip family - forward-flipping variations in different stances.",
    containedTricks: ["dolphinflip", "fakiedolphinflip", "nolliedolphinflip", "switchdolphinflip"],
  },
  {
    id: "nightmareflips",
    nodeTitle: "Nightmare Flips",
    title: "Nightmare Flip Variations",
    description: "The nightmare flip family - varial double flips in different stances.",
    containedTricks: ["nightmareflip", "fakienightmareflip", "nollienightmareflip", "switchnightmareflip"],
  },
  {
    id: "daydreamflips",
    nodeTitle: "Daydream Flips",
    title: "Daydream Flip Variations",
    description: "The daydream flip family - varial double heelflips in different stances.",
    containedTricks: ["daydreamflip", "fakiedaydreamflip", "nolliedaydreamflip", "switchdaydreamflip"],
  },
  {
    id: "bigflips",
    nodeTitle: "Big Flips",
    title: "Big Flip Variations",
    description: "The big flip family - kickflip bigspin variations in different stances.",
    containedTricks: ["bigflip", "fakiebigflip", "nolliebigflip", "switchbigflip"],
  },
  {
    id: "bigheels",
    nodeTitle: "Big Heels",
    title: "Big Heel Variations",
    description: "The big heel family - heelflip bigspin variations in different stances.",
    containedTricks: ["bigheel", "fakiebigheel", "nolliebigheel", "switchbigheel"],
  },
  {
    id: "gazellespins",
    nodeTitle: "Gazelle Spins",
    title: "Gazelle Spin Variations",
    description: "The gazelle spin family - 540° board rotation with 360° body rotation variations.",
    containedTricks: ["gazellespin", "fakiegazellespin", "nolliegazellespin", "switchgazellespin"],
  },
  {
    id: "gazelleflips",
    nodeTitle: "Gazelle Flips",
    title: "Gazelle Flip Variations",
    description: "The gazelle flip family - kickflip gazelle variations in all stances.",
    containedTricks: ["gazelleflip", "fakiegazelleflip", "nolliegazelleflip", "switchgazelleflip"],
  },
  {
    id: "doubleflips",
    nodeTitle: "Double Flips",
    title: "Double Kickflip Variations",
    description: "The double kickflip family in different stances.",
    containedTricks: ["doubleflip", "fakiedoubleflip", "nolliedoubleflip", "switchdoubleflip"],
  },
  {
    id: "doubleheels",
    nodeTitle: "Double Heels",
    title: "Double Heelflip Variations",
    description: "The double heelflip family in different stances.",
    containedTricks: ["doubleheelflip", "fakiedoubleheelflip", "nolliedoubleheelflip", "switchdoubleheelflip"],
  },
  {
    id: "doubletres",
    nodeTitle: "Double Tres",
    title: "Double Tre Flip Variations",
    description: "The double tre flip family in different stances.",
    containedTricks: ["doubletreflip", "fakiedoubletreflip", "nolliedoubletreflip", "switchdoubletreflip"],
  },
  {
    id: "doublelasers",
    nodeTitle: "Double Lasers",
    title: "Double Laser Flip Variations",
    description: "The double laser flip family in different stances.",
    containedTricks: ["doublelaser", "fakiedoublelaser", "nolliedoublelaser", "switchdoublelaser"],
  },
  {
    id: "biggerspins",
    nodeTitle: "BSpins+",
    title: "Bigger Spin Variations",
    description: "The bigger spin family - 540° board rotation with 180° body rotation variations.",
    containedTricks: ["fakiebiggerspin", "nolliebiggerspin", "switchbiggerspin"],
  },
  {
    id: "fsbiggerspins",
    nodeTitle: "FS BSpins+",
    title: "Frontside Bigger Spin Variations",
    description: "The frontside bigger spin family in different stances.",
    containedTricks: ["fakiefsbiggerspin", "nolliefsbiggerspin", "switchfsbiggerspin"],
  },
  {
    id: "hospitalflips",
    nodeTitle: "Hospital Flips+",
    title: "Hospital Flip Variations",
    description: "The hospital flip family - half flip catch and return variations.",
    containedTricks: ["fakiehospitalflip", "nolliehospitalflip", "switchhospitalflip"],
  },
  {
    id: "bsmysticspins",
    nodeTitle: "BS Mystic Spins",
    title: "Backside Mystic Spin Variations",
    description: "The backside mystic spin family in different stances.",
    containedTricks: ["bsmysticspin", "fakiebsmysticspin", "nolliebsmysticspin", "switchbsmysticspin"],
  },
  {
    id: "fsmysticspins",
    nodeTitle: "FS Mystic Spins",
    title: "Frontside Mystic Spin Variations",
    description: "The frontside mystic spin family in different stances.",
    containedTricks: ["fsmysticspin", "fakiefsmysticspin", "nolliefsmysticspin", "switchfsmysticspin"],
  },
  {
    id: "bsbigspins",
    nodeTitle: "BS Bigspins",
    title: "Backside Bigspin Variations",
    description: "The backside bigspin family in different stances.",
    containedTricks: ["fakiebigspin", "nolliebigspin", "switchbigspin"],
  },
  {
    id: "fsbigspins",
    nodeTitle: "FS Bigspins",
    title: "Frontside Bigspin Variations",
    description: "The frontside bigspin family in different stances.",
    containedTricks: ["fakiefsbigspin", "nolliefsbigspin", "switchfsbigspin"],
  },
  {
    id: "kickflipvariations",
    nodeTitle: "Kickflips+",
    title: "Kickflip Variations",
    description: "The kickflip family in different stances.",
    containedTricks: ["fakieflip", "nollieflip", "switchflip"],
  },
  {
    id: "heelflipvariations",
    nodeTitle: "Heelflips+",
    title: "Heelflip Variations",
    description: "The heelflip family in different stances.",
    containedTricks: ["fakieheelflip", "nollieheelflip", "switchheelflip"],
  },
  {
    id: "varialflipvariations",
    nodeTitle: "Varials+",
    title: "Varial Flip Variations",
    description: "The varial flip family in different stances.",
    containedTricks: ["fakievarialkickflip", "nollievarialkickflip", "switchvarialkickflip"],
  },
  {
    id: "varialheelflipvariations",
    nodeTitle: "VHeels+",
    title: "Varial Heelflip Variations",
    description: "The varial heel family in different stances.",
    containedTricks: ["fakievarialheelflip", "nollievarialheelflip", "switchvarialheelflip"],
  },
  {
    id: "hardflipvariations",
    nodeTitle: "HFlips+",
    title: "Hard Flip Variations",
    description: "The hard flip family in different stances.",
    containedTricks: ["fakiehardflip", "nolliehardflip", "switchhardflip"],
  },
  {
    id: "inwardheelflipvariations",
    nodeTitle: "IHeels+",
    title: "Inward Heelflip Variations",
    description: "The inward heel family in different stances.",
    containedTricks: ["fakieinwardheel", "nollieinwardheel", "switchinwardheel"],
  },
  {
    id: "bsflipvariations",
    nodeTitle: "BS Flips",
    title: "Backside Flips",
    description: "The backside flip family - backside 180 with kickflip variations in different stances.",
    containedTricks: ["bsflip", "fakiebsflip", "nolliebsflip", "switchbsflip"],
  },
  {
    id: "fsflipvariations",
    nodeTitle: "FS Flips",
    title: "Frontside Flips",
    description: "The frontside flip family - frontside 180 with kickflip variations in different stances.",
    containedTricks: ["fsflip", "fakiefsflip", "nolliefsflip", "switchfsflip"],
  },
  {
    id: "bsheelflipvariations",
    nodeTitle: "BS Heels",
    title: "Backside Heelflips",
    description: "The backside heelflip family - backside 180 with heelflip variations in different stances.",
    containedTricks: ["bsheelflip", "fakiebsheelflip", "nolliebsheelflip", "switchbsheelflip"],
  },
  {
    id: "fsheelflipvariations",
    nodeTitle: "FS Heels",
    title: "Frontside Heelflips", 
    description: "The frontside heelflip family - frontside 180 with heelflip variations in different stances.",
    containedTricks: ["fsheelflip", "fakiefsheelflip", "nolliefsheelflip", "switchfsheelflip"],
  }
];