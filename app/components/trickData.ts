export interface Trick {
  id: string;
  name: string;
  description: string;
  common_mistakes: string;
  difficulty: string;
  video_link: string;
  alt_names: string;
}

export const TRICK_DATA: Trick[] = [
  {
    id: "1",
    name: "Ollie",
    description: "The foundation of street skating, the first trick you should learn. Place your back foot on the tail and your front foot in the middle of the board. Pop the tail and slide your front foot up the board. Jump and level out the board with your front foot.",
    common_mistakes: "[Not leveling out the board] Make sure you are sliding your foot into the board and not just up it. [Not jumping after you pop] If you find yourself not getting off the ground after you pop, more than likely you aren't jumping. Make sure you jump off of your back foot when you pop the tail.",
    difficulty: "2",
    video_link: "ollie.mp4",
    alt_names: ""
  },
  {
    id: "2",
    name: "Shuvit",
    description: "A trick where the board rotates 180 degrees horizontally without flipping. Place your back foot on the tail and front foot in the middle. Scoop the tail backwards while simultaneously jumping. The board should rotate beneath you. Land with both feet over the bolts.",
    common_mistakes: "[Not jumping high enough] Remember to jump up as you scoop to allow the board to rotate beneath you. [Incomplete rotation] Scoop more aggressively with your back foot to ensure full rotation. [Landing with one foot] Try to catch the board with both feet at the same time for better control.",
    difficulty: "1",
    video_link: "shuvit.mp4",
    alt_names: "Shove-it, Shuv"
  },
  {
    id: "3",
    name: "Kickturn",
    description: "A fundamental trick where you lift the front wheels and pivot on the back wheels to change direction. Place your back foot on the tail and your front foot over the front trucks. Lean back slightly to lift the front wheels, then use your shoulders and hips to guide the turn.",
    common_mistakes: "[Not lifting the front wheels enough] Make sure to press down on the tail to get the front wheels clear of the ground. [Losing balance] Keep your core engaged and knees bent for stability.",
    difficulty: "1",
    video_link: "kickturn.mp4",
    alt_names: "Pivot"
  }
];