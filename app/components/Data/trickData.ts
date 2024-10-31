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
    id: "ollie",
    name: "Ollie",
    description: "The foundation of street skating, the first trick you should learn. Place your back foot on the tail and your front foot in the middle of the board. Pop the tail and slide your front foot up the board. Jump and level out the board with your front foot.",
    common_mistakes: "[Not leveling out the board] Make sure you are sliding your foot into the board and not just up it. [Not jumping after you pop] If you find yourself not getting off the ground after you pop, more than likely you aren't jumping. Make sure you jump off of your back foot when you pop the tail.",
    difficulty: "2",
    video_link: "ollie.mp4",
    alt_names: ""
  },
  {
    id: "nc",
    name: "No Comply",
    description: "A trick where you step off the board with your front foot, pop the tail with your back foot, and then jump back onto the board. Start with your front foot behind the front bolts. Step off with your front foot, simultaneously popping the tail with your back foot. As the board rises, slide your back foot forward and jump back onto the board with both feet.",
    common_mistakes: "[Stepping off too early] Make sure you step off and pop almost simultaneously. [Not popping enough] Remember to give a solid pop with your back foot to get the board off the ground.",
    difficulty: "2",
    video_link: "no_comply.mp4",
    alt_names: "No-comply"
  },
  {
    id: "fsnc180",
    name: "No Comply Frontside 180",
    description: "A variation of the No Comply where the board rotates 180 degrees. Start like a regular No Comply, but as you step off, use your back foot to guide the board in a 180-degree rotation. Jump back onto the board as it completes the rotation.",
    common_mistakes: "[Not rotating enough] Make sure to use your shoulders to guide the full 180-degree rotation. [Landing with the wrong foot forward] Remember that after the rotation, your stance will be switched.",
    difficulty: "1",
    video_link: "no_comply_180.mp4",
    alt_names: "NC 180, Frontside No Comply 180"
  },
  {
    id: "bsnc180",
    name: "No Comply Backside 180",
    description: "A No Comply variation where the board rotates 180 degrees backside. Set up like a regular No Comply, but use your back foot to guide the board in a backside rotation. Jump back on the board as it completes the 180-degree turn.",
    common_mistakes: "[Not scooping enough] Make sure to scoop the board with your back foot for a full rotation. [Landing with the wrong foot forward] Remember that after the rotation, your stance will be switched.",
    difficulty: "2",
    video_link: "no_comply_backside_180.mp4",
    alt_names: "NC Backside 180, BS No Comply 180"
  },
  {
    id: "strawberrymilkshake",
    name: "Strawberry Milkshake",
    description: "You push the board over on to your back foot causing the spin, front foot is planted on the ground, as the board wraps around back foot, then you jump back on the board.",
    common_mistakes: "[Not pushing the board enough] Make sure to push the board over your back foot to initiate the spin and continue until the full wrap.",
    difficulty: "3",
    video_link: "strawberry_milkshake.mp4",
    alt_names: "Cigarette Flip, Old School Impossible",
  },
  {
    id: "kickturn",
    name: "Kickturn",
    description: "A fundamental trick where you lift the front wheels and pivot on the back wheels to change direction. Place your back foot on the tail and your front foot over the front trucks. Lean back slightly to lift the front wheels, then use your shoulders and hips to guide the turn.",
    common_mistakes: "[Not lifting the front wheels enough] Make sure to press down on the tail to get the front wheels clear of the ground. [Losing balance] Keep your core engaged and knees bent for stability.",
    difficulty: "1",
    video_link: "kickturn.mp4",
    alt_names: "Pivot"
  },
  {
    id: "fs180",
    name: "Frontside 180",
    description: "A trick where you and your board rotate 180 degrees frontside while in the air. Set up like an Ollie, but as you pop, wind up your upper body in the opposite direction of the spin. As you jump, unwind your body to initiate the 180-degree rotation. Land with your feet over the bolts.",
    common_mistakes: "[Not winding up enough] Make sure to wind up your shoulders before you pop for maximum rotation. [Incomplete rotation] Commit to the full 180 degrees by following through with your shoulders and hips.",
    difficulty: "3",
    video_link: "frontside_180.mp4",
    alt_names: "Front 180, FS 180, Ollie Frontside 180"
  },
  {
    id: "bs180",
    name: "Backside 180",
    description: "Similar to the Frontside 180, but rotating in the opposite direction. Set up like an Ollie, wind up your upper body in the direction of the spin. As you pop and jump, use your shoulders and hips to guide the 180-degree rotation. Land with your feet over the bolts, now riding switch.",
    common_mistakes: "[Under-rotating] Make sure to turn your head to look over your back shoulder to complete the rotation. [Sliding out on landing] Keep your weight centered over the board as you land.",
    difficulty: "3",
    video_link: "backside_180.mp4",
    alt_names: "Back 180, BS 180, Ollie Backside 180"
  },
  {
    id: "manual",
    name: "Manual",
    description: "A wheelie on your back wheels. Start with your back foot on the tail and front foot over the front bolts. Shift your weight back to lift the front wheels, finding the balance point. Keep your arms out for balance and your knees bent.",
    common_mistakes: "[Leaning too far back] Find the sweet spot where you're balanced - not so far back that you fall off. [Not keeping your shoulders parallel] Keep your shoulders in line with the board to maintain direction.",
    difficulty: "3",
    video_link: "manual.mp4",
    alt_names: "Manny, Wheelie"
  },
  {
    id: "nosemanual",
    name: "Nose Manual",
    description: "Like a Manual, but on the front wheels. Start with your front foot on the nose and back foot behind the back bolts. Shift your weight forward to lift the back wheels, finding the balance point. Use your arms and knees to maintain balance.",
    common_mistakes: "[Leaning too far forward] Find the balance point where you're not at risk of the board slipping out. [Looking down] Keep your head up and look forward to maintain balance.",
    difficulty: "4",
    video_link: "nose_manual.mp4",
    alt_names: ""
  },
  {
    id: "shuv",
    name: "Shuvit",
    description: "A trick where the board rotates 180 degrees horizontally without flipping. Place your back foot on the tail and front foot in the middle. Scoop the tail backwards while simultaneously jumping. The board should rotate beneath you. Land with both feet over the bolts.",
    common_mistakes: "[Not jumping high enough] Remember to jump up as you scoop to allow the board to rotate beneath you. [Incomplete rotation] Scoop more aggressively with your back foot to ensure full rotation.",
    difficulty: "1",
    video_link: "shuvit.mp4",
    alt_names: "Shove-it, Shuv, BS Shuvit"
  },
  {
    id: "fsshuv",
    name: "Frontside Shuvit",
    description: "A Shuvit where the board rotates frontside (towards your toes). Set up like a regular Shuvit, but scoop the tail forward and jump. The board should rotate 180 degrees frontside beneath you. Land with both feet over the bolts.",
    common_mistakes: "[Scooping in the wrong direction] Make sure you're scooping towards your toes for the frontside rotation. [Not jumping high enough] Focus on getting a good pop to allow the board to rotate fully.",
    difficulty: "2",
    video_link: "frontside_shuvit.mp4",
    alt_names: "Front Shuv, FS Shuvit"
  },
  {
    id: "fakieshuv",
    name: "Fakie Shuvit",
    description: "Performing a Shuvit while riding fakie (backwards). Set up like a regular Shuvit but while rolling fakie. Scoop the nose of the board with your front foot while jumping. The mechanics are similar to a regular Shuvit, but you're scooping in the opposite direction.",
    common_mistakes: "[Leaning back too much] Try to keep your weight centered over the board. [Rotating with your body] Let the board do the rotating - your body should stay relatively still.",
    difficulty: "1",
    video_link: "fakie_shuvit.mp4",
    alt_names: "Fakie Shuv, Fakie Shove-it"
  },
  {
    id: "fakiefsshuv",
    name: "Fakie Frontside Shuvit",
    description: "A Fakie Shuvit with a frontside rotation. Set up like a Fakie Shuvit, but scoop the nose forward and jump. The board should rotate 180 degrees frontside beneath you. Land with both feet over the bolts.",
    common_mistakes: "[Not scooping enough] Focus on a strong scoop to get the board to rotate fully. [Rotating your body] Keep your shoulders parallel to the board to avoid over-rotation.",
    difficulty: "2",
    video_link: "fakie_frontside_shuvit.mp4",
    alt_names: "Fakie Front Shuv, Fakie FS Shuvit"
  },
  {
    id: "nollieshuv",
    name: "Nollie Shuvit",
    description: "A Shuvit performed from the nose of the board. Start with your front foot on the nose and back foot behind the back bolts. Pop the nose with your front foot and scoop forward, allowing the board to rotate 180 degrees beneath you. Jump and land back on the board.",
    common_mistakes: "[Not popping enough] Make sure to give a crisp pop with your front foot. [Rotating your body] Keep your body still and let the board do the rotating.",
    difficulty: "2",
    video_link: "nollie_shuvit.mp4",
    alt_names: "Nollie Shuv, Nollie Shove-it, Nollie BS Shuvit"
  },
  {
    id: "nolliefsshuv",
    name: "Nollie Frontside Shuvit",
    description: "Like a Nollie Shuvit, but the board rotates frontside (towards your heels). Pop with your front foot on the nose and scoop towards your heels. The board should rotate 180 degrees frontside beneath you. Jump and land back on the board.",
    common_mistakes: "[Scooping in the wrong direction] Make sure you're scooping towards your heels for the frontside rotation. [Rotating your upper body] Try to keep your shoulders parallel to the board.",
    difficulty: "2",
    video_link: "nollie_frontside_shuvit.mp4",
    alt_names: "Nollie Front Shuv, Nollie FS Shuvit"
  },
  {
    id: "boneless",
    name: "Boneless",
    description: "A trick where you grab the board with your front hand, step off with your front foot, then jump back on. Start by bending down and grabbing the middle of the board with your front hand. Step off with your front foot, lift the board with your hand and back foot, then jump and bring the board with you. Land with both feet on the bolts.",
    common_mistakes: "[Not grabbing the board properly] Make sure you have a solid grip on the middle of the board. [Not lifting the board high enough] Use both your hand and back foot to really lift the board off the ground.",
    difficulty: "3",
    video_link: "boneless.mp4",
    alt_names: ""
  },
  {
    id: "powerslide",
    name: "Powerslide",
    description: "A technique to stop or slow down by turning the board sideways and sliding. Approach with moderate speed, then shift your weight onto your back foot while turning the board 90 degrees. Push the board out in front of you and apply pressure to the wheels to initiate the slide.",
    common_mistakes: "[Not committing to the slide] Fully commit to turning the board sideways to avoid catching an edge. [Leaning too far back] While you need to shift weight to your back foot, don't lean so far that you lose control.",
    difficulty: "2",
    video_link: "powerslide.mp4",
    alt_names: ""
  },
  {
    id: "fakiebs180",
    name: "Fakie Backside 180",
    description: "A 180-degree backside rotation performed while riding fakie. Start in fakie stance, wind up your upper body in the direction of the spin. As you pop, use your shoulders and hips to guide the rotation. Land with your feet over the bolts, now riding in your regular stance.",
    common_mistakes: "[Not winding up enough] Wind up your shoulders before popping to generate more rotation. [Popping too weakly] Give a solid pop to get enough air time for the full rotation.",
    difficulty: "4",
    video_link: "fakie_backside_180.mp4",
    alt_names: "Fakie Back 180, Half Cab"
  },
  {
    id: "fakiefs180",
    name: "Fakie Frontside 180",
    description: "A 180-degree frontside rotation while riding fakie. Begin in fakie stance and wind up your upper body opposite to the spin direction. Pop and use your shoulders to initiate the frontside rotation. Land with your feet over the bolts, ending up in your regular stance.",
    common_mistakes: "[Under-rotating] Make sure to turn your head and shoulders fully to complete the rotation. [Leaning back on takeoff] Keep your weight centered over the board throughout the trick.",
    difficulty: "4",
    video_link: "fakie_frontside_180.mp4",
    alt_names: "Fakie Front 180"
  },
  {
    id: "nolliebs180",
    name: "Nollie Backside 180",
    description: "A 180-degree backside rotation performed from a nollie. Start with your front foot on the nose, wind up your body in the spin direction. Pop off the nose and use your shoulders to guide the backside rotation. Land with both feet over the bolts, now riding switch.",
    common_mistakes: "[Not popping enough] Ensure a strong pop off the nose to get enough height for the rotation. [Rotating too early] Let the pop happen before initiating the rotation.",
    difficulty: "5",
    video_link: "nollie_backside_180.mp4",
    alt_names: "Nollie Back 180, Nollie BS 180"
  },
  {
    id: "nolliefs180",
    name: "Nollie Frontside 180",
    description: "A 180-degree frontside spin from a nollie position. Begin with your front foot on the nose, wind up opposite to the spin direction. Pop off the nose and use your shoulders to lead the frontside rotation. Land with both feet over the bolts in a switch stance.",
    common_mistakes: "[Insufficient pop] Focus on a strong pop off the nose to get enough air time. [Over-rotating] Control your spin by spotting your landing early.",
    difficulty: "5",
    video_link: "nollie_frontside_180.mp4",
    alt_names: "Nollie Front 180, Nollie FS 180"
  },
];