export interface Trick {
  id: string;
  name: string;
  description: string;
  common_mistakes: string;
  difficulty: string;
  video_link: string;
  alt_names: string;
}

//! SOME TRICKS DO NOT HAVE VIDEO LINKS

export const TRICK_DATA: Trick[] = [
  {
    id: "ollie",
    name: "Ollie",
    description:
      "The foundation of street skating, the first trick you should learn. Place your back foot on the tail and your front foot in the middle of the board. Pop the tail and slide your front foot up the board. Jump and level out the board with your front foot.",
    common_mistakes:
      "[Not leveling out the board] Make sure you are sliding your foot into the board and not just up it. [Not jumping after you pop] If you find yourself not getting off the ground after you pop, more than likely you aren't jumping. Make sure you jump off of your back foot when you pop the tail.",
    difficulty: "2",
    video_link: "https://www.youtube.com/watch?v=JNmUK9fvrAs",
    alt_names: "",
  },
  {
    id: "nc",
    name: "No Comply",
    description:
      "A trick where you step off the board with your front foot, pop the tail with your back foot, and then jump back onto the board. Start with your front foot behind the front bolts. Step off with your front foot, simultaneously popping the tail with your back foot. As the board rises, slide your back foot forward and jump back onto the board with both feet.",
    common_mistakes:
      "[Stepping off too early] Make sure you step off and pop almost simultaneously. [Not popping enough] Remember to give a solid pop with your back foot to get the board off the ground.",
    difficulty: "2",
    video_link: "https://www.youtube.com/watch?v=1YCgBMx3kjc",
    alt_names: "No-comply",
  },
  {
    id: "fsnc180",
    name: "No Comply Frontside 180",
    description:
      "A variation of the No Comply where the board rotates 180°. Start like a regular No Comply, but as you step off, use your back foot to guide the board in a 180° rotation. Jump back onto the board as it completes the rotation.",
    common_mistakes:
      "[Not rotating enough] Make sure to use your shoulders to guide the full 180° rotation. [Landing with the wrong foot forward] Remember that after the rotation, your stance will be switched.",
    difficulty: "1",
    video_link: "https://www.youtube.com/watch?v=HsL2pGAHK3s",
    alt_names: "NC 180, Frontside No Comply 180",
  },
  {
    id: "bsnc180",
    name: "No Comply Backside 180",
    description:
      "A No Comply variation where the board rotates 180° backside. Set up like a regular No Comply, but use your back foot to guide the board in a backside rotation. Jump back on the board as it completes the 180° turn.",
    common_mistakes:
      "[Not scooping enough] Make sure to scoop the board with your back foot for a full rotation. [Landing with the wrong foot forward] Remember that after the rotation, your stance will be switched.",
    difficulty: "2",
    video_link: "https://www.youtube.com/watch?v=l_oGvClbaLA",
    alt_names: "NC Backside 180, BS No Comply 180",
  },
  {
    id: "strawberrymilkshake",
    name: "Strawberry Milkshake",
    description:
      "You push the board over on to your back foot causing the spin, front foot is planted on the ground, as the board wraps around back foot, then you jump back on the board.",
    common_mistakes:
      "[Not pushing the board enough] Make sure to push the board over your back foot to initiate the spin and continue until the full wrap.",
    difficulty: "3",
    video_link: "https://www.youtube.com/watch?v=1kUESwSIrC8",
    alt_names: "Cigarette Flip, Old School Impossible",
  },
  {
    id: "kickturn",
    name: "Kickturn",
    description:
      "A fundamental trick where you lift the front wheels and pivot on the back wheels to change direction. Place your back foot on the tail and your front foot over the front trucks. Lean back slightly to lift the front wheels, then use your shoulders and hips to guide the turn.",
    common_mistakes:
      "[Not lifting the front wheels enough] Make sure to press down on the tail to get the front wheels clear of the ground. [Losing balance] Keep your core engaged and knees bent for stability.",
    difficulty: "1",
    video_link: "https://www.youtube.com/watch?v=dWnq3iKUjv8",
    alt_names: "Pivot",
  },
  {
    id: "fs180",
    name: "Frontside 180",
    description:
      "A trick where you and your board rotate 180° frontside while in the air. Set up like an Ollie, but as you pop, wind up your upper body in the opposite direction of the spin. As you jump, unwind your body to initiate the 180° rotation. Land with your feet over the bolts.",
    common_mistakes:
      "[Not winding up enough] Make sure to wind up your shoulders before you pop for maximum rotation. [Incomplete rotation] Commit to the full 180° by following through with your shoulders and hips.",
    difficulty: "3",
    video_link: "https://www.youtube.com/watch?v=bRmL15mNBcA",
    alt_names: "Front 180, FS 180, Ollie Frontside 180",
  },
  {
    id: "bs180",
    name: "Backside 180",
    description:
      "Similar to the Frontside 180, but rotating in the opposite direction. Set up like an Ollie, wind up your upper body in the direction of the spin. As you pop and jump, use your shoulders and hips to guide the 180° rotation. Land with your feet over the bolts, now riding switch.",
    common_mistakes:
      "[Under-rotating] Make sure to turn your head to look over your back shoulder to complete the rotation. [Sliding out on landing] Keep your weight centered over the board as you land.",
    difficulty: "3",
    video_link: "https://www.youtube.com/watch?v=1q4cS1yH2II",
    alt_names: "Back 180, BS 180, Ollie Backside 180",
  },
  {
    id: "manual",
    name: "Manual",
    description:
      "A wheelie on your back wheels. Start with your back foot on the tail and front foot over the front bolts. Shift your weight back to lift the front wheels, finding the balance point. Keep your arms out for balance and your knees bent.",
    common_mistakes:
      "[Leaning too far back] Find the sweet spot where you're balanced - not so far back that you fall off. [Not keeping your shoulders parallel] Keep your shoulders in line with the board to maintain direction.",
    difficulty: "3",
    video_link: "https://www.youtube.com/watch?v=EoVh5VbgUcQ",
    alt_names: "Manny, Wheelie",
  },
  {
    id: "nosemanual",
    name: "Nose Manual",
    description:
      "Like a Manual, but on the front wheels. Start with your front foot on the nose and back foot behind the back bolts. Shift your weight forward to lift the back wheels, finding the balance point. Use your arms and knees to maintain balance.",
    common_mistakes:
      "[Leaning too far forward] Find the balance point where you're not at risk of the board slipping out. [Looking down] Keep your head up and look forward to maintain balance.",
    difficulty: "4",
    video_link: "https://www.youtube.com/watch?v=2r-NDDLkI48",
    alt_names: "",
  },
  {
    id: "shuv",
    name: "Shuvit",
    description:
      "A trick where the board rotates 180° horizontally without flipping. Place your back foot on the tail and front foot in the middle. Scoop the tail backwards while simultaneously jumping. The board should rotate beneath you. Land with both feet over the bolts.",
    common_mistakes:
      "[Not jumping high enough] Remember to jump up as you scoop to allow the board to rotate beneath you. [Incomplete rotation] Scoop more aggressively with your back foot to ensure full rotation.",
    difficulty: "1",
    video_link: "https://www.youtube.com/watch?v=D9hiD1jV9ZI",
    alt_names: "Shove-it, Shuv, BS Shuvit",
  },
  {
    id: "fsshuv",
    name: "Frontside Shuvit",
    description:
      "A Shuvit where the board rotates frontside (towards your toes). Set up like a regular Shuvit, but scoop the tail forward and jump. The board should rotate 180° frontside beneath you. Land with both feet over the bolts.",
    common_mistakes:
      "[Scooping in the wrong direction] Make sure you're scooping towards your toes for the frontside rotation. [Not jumping high enough] Focus on getting a good pop to allow the board to rotate fully.",
    difficulty: "2",
    video_link: "https://www.youtube.com/watch?v=Qy9fdczTPFM",
    alt_names: "Front Shuv, FS Shuvit",
  },
  {
    id: "fakieshuv",
    name: "Fakie Shuvit",
    description:
      "Performing a Shuvit while riding fakie (backwards). Set up like a regular Shuvit but while rolling fakie. Scoop the nose of the board with your front foot while jumping. The mechanics are similar to a regular Shuvit, but you're scooping in the opposite direction.",
    common_mistakes:
      "[Leaning back too much] Try to keep your weight centered over the board. [Rotating with your body] Let the board do the rotating - your body should stay relatively still.",
    difficulty: "1",
    video_link: "https://www.youtube.com/watch?v=7mYSWAwSeWY&t",
    alt_names: "Fakie Shuv, Fakie Shove-it",
  },
  {
    id: "fakiefsshuv",
    name: "Fakie Frontside Shuvit",
    description:
      "A Fakie Shuvit with a frontside rotation. Set up like a Fakie Shuvit, but scoop the nose forward and jump. The board should rotate 180° frontside beneath you. Land with both feet over the bolts.",
    common_mistakes:
      "[Not scooping enough] Focus on a strong scoop to get the board to rotate fully. [Rotating your body] Keep your shoulders parallel to the board to avoid over-rotation.",
    difficulty: "2",
    video_link: "https://www.youtube.com/watch?v=WFnV3KEobcs",
    alt_names: "Fakie Front Shuv, Fakie FS Shuvit",
  },
  {
    id: "nollieshuv",
    name: "Nollie Shuvit",
    description:
      "A Shuvit performed from the nose of the board. Start with your front foot on the nose and back foot behind the back bolts. Pop the nose with your front foot and scoop forward, allowing the board to rotate 180° beneath you. Jump and land back on the board.",
    common_mistakes:
      "[Not popping enough] Make sure to give a crisp pop with your front foot. [Rotating your body] Keep your body still and let the board do the rotating.",
    difficulty: "2",
    video_link: "https://www.youtube.com/watch?v=9wjY423kRaA",
    alt_names: "Nollie Shuv, Nollie Shove-it, Nollie BS Shuvit",
  },
  {
    id: "nolliefsshuv",
    name: "Nollie Frontside Shuvit",
    description:
      "Like a Nollie Shuvit, but the board rotates frontside (towards your heels). Pop with your front foot on the nose and scoop towards your heels. The board should rotate 180°frontside beneath you. Jump and land back on the board.",
    common_mistakes:
      "[Scooping in the wrong direction] Make sure you're scooping towards your heels for the frontside rotation. [Rotating your upper body] Try to keep your shoulders parallel to the board.",
    difficulty: "2",
    video_link: "https://www.youtube.com/watch?v=fYw1natIN98",
    alt_names: "Nollie Front Shuv, Nollie FS Shuvit",
  },
  {
    id: "boneless",
    name: "Boneless",
    description:
      "A trick where you grab the board with your front hand, step off with your front foot, then jump back on. Start by bending down and grabbing the middle of the board with your front hand. Step off with your front foot, lift the board with your hand and back foot, then jump and bring the board with you. Land with both feet on the bolts.",
    common_mistakes:
      "[Not grabbing the board properly] Make sure you have a solid grip on the middle of the board. [Not lifting the board high enough] Use both your hand and back foot to really lift the board off the ground.",
    difficulty: "3",
    video_link: "https://www.youtube.com/watch?v=PYnZP4Qv_AU",
    alt_names: "",
  },
  {
    id: "powerslide",
    name: "Powerslide",
    description:
      "A technique to stop or slow down by turning the board sideways and sliding. Approach with moderate speed, then shift your weight onto your back foot while turning the board 90°. Push the board out in front of you and apply pressure to the wheels to initiate the slide.",
    common_mistakes:
      "[Not committing to the slide] Fully commit to turning the board sideways to avoid catching an edge. [Leaning too far back] While you need to shift weight to your back foot, don't lean so far that you lose control.",
    difficulty: "2",
    video_link: "https://www.youtube.com/watch?v=U2xD-BsTbUU",
    alt_names: "",
  },
  {
    id: "fakieollie",
    name: "Fakie Ollie",
    description:
      "An Ollie performed while riding fakie. Set up like a regular Ollie, but while rolling fakie. Pop the tail and slide your front foot up the board. Jump and level out the board with your front foot.",
    common_mistakes:
      "[Not leveling out the board] Make sure you are sliding your foot into the board and not just up it. [Leaning to far back] Keep your weight centered over the board throughout the trick.",
    difficulty: "3",
    video_link: "https://www.youtube.com/watch?v=0onlNi8FKzQ",
    alt_names: "",
  },
  {
    id: "fakiebs180",
    name: "Fakie Backside 180",
    description:
      "A 180° backside rotation performed while riding fakie. Start in fakie stance, wind up your upper body in the direction of the spin. As you pop, use your shoulders and hips to guide the rotation. Land with your feet over the bolts, now riding in your regular stance.",
    common_mistakes:
      "[Not winding up enough] Wind up your shoulders before popping to generate more rotation. [Popping too weakly] Give a solid pop to get enough air time for the full rotation.",
    difficulty: "4",
    video_link: "https://www.youtube.com/watch?v=Fsy_uqivyzY",
    alt_names: "Fakie Back 180, Half Cab",
  },
  {
    id: "fakiefs180",
    name: "Fakie Frontside 180",
    description:
      "A 180° frontside rotation while riding fakie. Begin in fakie stance and wind up your upper body opposite to the spin direction. Pop and use your shoulders to initiate the frontside rotation. Land with your feet over the bolts, ending up in your regular stance.",
    common_mistakes:
      "[Under-rotating] Make sure to turn your head and shoulders fully to complete the rotation. [Leaning back on takeoff] Keep your weight centered over the board throughout the trick.",
    difficulty: "4",
    video_link: "https://www.youtube.com/watch?v=gh1eZ5bQex4",
    alt_names: "Fakie Front 180",
  },
  {
    id: "nollie",
    name: "Nollie",
    description:
      "An Ollie performed from the nose of the board. Start with your front foot on the nose and back foot behind the back bolts. Pop the nose with your front foot and slide your bacl foot up the back of the board. Jump and level out the board with your back foot.",
    common_mistakes:
      "[Not getting enough pop] Make sure to give a strong pop off the nose to get the board off the ground. [Not sliding your foot up] Slide your foot up the board to level it out in the air.",
    difficulty: "4",
    video_link: "https://www.youtube.com/watch?v=Yo516iAEK60",
    alt_names: "",
  },
  {
    id: "nolliebs180",
    name: "Nollie Backside 180",
    description:
      "A 180° backside rotation performed from a nollie. Start with your front foot on the nose, wind up your body in the spin direction. Pop off the nose and use your shoulders to guide the backside rotation. Land with both feet over the bolts, now riding switch.",
    common_mistakes:
      "[Not popping enough] Ensure a strong pop off the nose to get enough height for the rotation. [Rotating too early] Let the pop happen before initiating the rotation.",
    difficulty: "5",
    video_link: "https://www.youtube.com/watch?v=o6DkecApPk4",
    alt_names: "Nollie Back 180, Nollie BS 180",
  },
  {
    id: "nolliefs180",
    name: "Nollie Frontside 180",
    description:
      "A 180° frontside spin from a nollie position. Begin with your front foot on the nose, wind up opposite to the spin direction. Pop off the nose and use your shoulders to lead the frontside rotation. Land with both feet over the bolts in a switch stance.",
    common_mistakes:
      "[Insufficient pop] Focus on a strong pop off the nose to get enough air time. [Over-rotating] Control your spin by spotting your landing early.",
    difficulty: "5",
    video_link: "https://www.youtube.com/watch?v=hRzVTCMT8o4",
    alt_names: "Nollie Front 180, Nollie FS 180",
  },
  {
    id: "switchshuv",
    name: "Switch Shuvit",
    description:
      "A Shuvit performed while riding switch. Set up like a regular Shuvit, but while riding switch. Scoop the tail backwards and jump. The board should rotate 180° beneath you. Land with both feet over the bolts.",
    common_mistakes:
      "[Not jumping high enough] Remember to jump up as you scoop to allow the board to rotate beneath you. [Incomplete rotation] Scoop more aggressively with your back foot to ensure full rotation.",
    difficulty: "3",
    video_link: "https://www.youtube.com/watch?v=D9hiD1jV9ZI&t=11s",
    alt_names: "Switch Shove-it, Switch Shuv",
  },
  {
    id: "switchfsshuv",
    name: "Switch Frontside Shuvit",
    description:
      "A Shuvit where the board rotates frontside (towards your toes) while riding switch. Set up like a regular Shuvit, but scoop the tail forward and jump. The board should rotate 180° frontside beneath you. Land with both feet over the bolts.",
    common_mistakes:
      "[Scooping in the wrong direction] Make sure you're scooping towards your toes for the frontside rotation. [Not jumping high enough] Focus on getting a good pop to allow the board to rotate fully.",
    difficulty: "3",
    video_link: "https://www.youtube.com/watch?v=IUARe36-HiQ",
    alt_names: "Switch Front Shuv, Switch FS Shuvit",
  },
  {
    id: "switchollie",
    name: "Switch Ollie",
    description:
      "An Ollie performed while riding switch. Set up like a regular Ollie, but while riding switch. Pop the tail and slide your front foot up the board. Jump and level out the board with your front foot.",
    common_mistakes:
      "[Not leveling out the board] Make sure you are sliding your foot into the board and not just up it. [Not jumping after you pop] If you find yourself not getting off the ground after you pop, more than likely you aren't jumping. Make sure you jump off of your back foot when you pop the tail.",
    difficulty: "4",
    video_link: "https://www.youtube.com/watch?v=GSiTHdPag0Y",
    alt_names: "",
  },
  {
    id: "switchbs180",
    name: "Switch Backside 180",
    description:
      "A 180° backside rotation performed while riding switch. Start in switch stance, wind up your upper body in the direction of the spin. As you pop, use your shoulders and hips to guide the rotation. Land with your feet over the bolts, now riding in your regular stance.",
    common_mistakes:
      "[Not winding up enough] Wind up your shoulders before popping to generate more rotation. [Popping too weakly] Give a solid pop to get enough air time for the full rotation.",
    difficulty: "6",
    video_link: "https://www.youtube.com/watch?v=cZ2JBecvOB8",
    alt_names: "Switch Back 180",
  },
  {
    id: "switchfs180",
    name: "Switch Frontside 180",
    description:
      "A 180° frontside rotation performed while riding switch. Begin in switch stance and wind up your upper body opposite to the spin direction. Pop and use your shoulders to initiate the frontside rotation. Land with your feet over the bolts, ending up in your regular stance.",
    common_mistakes:
      "[Under-rotating] Make sure to turn your head and shoulders fully to complete the rotation. [Leaning back on takeoff] Keep your weight centered over the board throughout the trick.",
    difficulty: "6",
    video_link: "https://www.youtube.com/watch?v=-SuBbSj38Ok",
    alt_names: "Switch Front 180",
  },
  {
    id: "bigspin",
    name: "Bigspin",
    description:
      "A Shuvit with a 360° backside rotation with a 180° body rotation. Start like a regular Shuvit, wind up in the opposite direction of the spin. Scoop the tail and jump, allowing the board to rotate 360° beneath you. Simultaneously, turn your body 180° backside.",
    common_mistakes:
      "[Not winding up enough] Make sure to wind up your shoulders before you pop for maximum rotation. [Incomplete rotation] Commit to the full 360° by following through with your shoulders and hips.",
    difficulty: "5",
    video_link: "https://www.youtube.com/watch?v=SorQYAeFiOE",
    alt_names: "360 Shuvit 180 Body Varial, BS Bigspin",
  },
  {
    id: "fakiebigspin",
    name: "Fakie Bigspin",
    description:
      "A Bigspin performed while riding fakie. Set up like a regular Bigspin, but while rolling fakie. Wind up in the opposite direction of the spin, scoop the tail and jump. The board should rotate 360° beneath you with a 180° body rotation.",
    common_mistakes:
      "[Leaning back too much] Try to keep your weight centered over the board. [Rotating with your body] Let the board do the rotating - your body should stay relatively still.",
    difficulty: "4",
    video_link: "https://www.youtube.com/watch?v=M_ZleklIAt0",
    alt_names: "Fakie 360 Shuvit 180 Body Varial, Fakie BS Bigspin",
  },
  {
    id: "nolliebigspin",
    name: "Nollie Bigspin",
    description:
      "A backside Bigspin performed from a nollie position. Start with your front foot on the nose, wind up your body in the opposite direction of the spin. Pop off the nose and use your shoulders to guide the 360° board rotation and 180° body rotation.",
    common_mistakes:
      "[Leaning back too much] Try to keep your weight centered over the board.",
    difficulty: "5",
    video_link: "https://www.youtube.com/watch?v=k10m6ZS_QB0",
    alt_names: "Nollie 360 Shuvit 180 Body Varial, Nollie BS Bigspin",
  },
  {
    id: "fsbigspin",
    name: "FS Bigspin",
    description:
      "A Bigspin with a 360° frontside rotation and a 180° body rotation. Start like a regular Bigspin, wind up in the direction of the spin. Scoop the tail and jump, allowing the board to rotate 360° beneath you. Simultaneously, turn your body 180° frontside.",
    common_mistakes:
      "[Not winding up enough] Make sure to wind up your shoulders before you pop for maximum rotation. [Incomplete rotation] Commit to the full 360° by following through with your shoulders and hips.",
    difficulty: "5",
    video_link: "https://www.youtube.com/watch?v=O6uMQJE2OVw",
    alt_names: "Front Bigspin, FS Bigspin",
  },
  {
    id: "fakiefsbigspin",
    name: "Fakie FS Bigspin",
    description:
      "A Bigspin performed while riding fakie with a frontside rotation. Set up like a regular Bigspin, but while rolling fakie. Wind up in the direction of the spin, scoop the tail and jump. The board should rotate 360° beneath you with a 180° body rotation.",
    common_mistakes:
      "[Leaning back too much] Try to keep your weight centered over the board.",
    difficulty: "5",
    video_link: "https://www.youtube.com/watch?v=RpjMDi3QCAU",
    alt_names: "Fakie Front Bigspin, Fakie FS Bigspin",
  },
  {
    id: "nolliefsbigspin",
    name: "Nollie FS Bigspin",
    description:
      "A Bigspin performed from a nollie position with a frontside rotation. Start with your front foot on the nose, wind up your body in the direction of the spin. Pop off the nose and use your shoulders to guide the 360° board rotation and 180° body rotation.",
    common_mistakes:
      "[Leaning back too much] Try to keep your weight centered over the board.",
    difficulty: "5",
    video_link: "https://www.youtube.com/watch?v=HLYVnxTPTvw",
    alt_names: "Nollie Front Bigspin, Nollie FS Bigspin",
  },
  {
    id: "kickflip",
    name: "Kickflip",
    description:
      "An Ollie that involves sliding your front foot off the side of the board to flip it whilst sliding up. Start like an Ollie, but as you slide your front foot up, flick it off the side of the board. The board should flip beneath you. Jump and catch the board, then land.",
    common_mistakes:
      "[Not flicking hard enough] Make sure to give a strong flick off the side of the board. [Not jumping high enough] Focus on getting a good pop to allow the board to rotate fully.",
    difficulty: "6",
    video_link: "https://www.youtube.com/watch?v=Zebs7JZ2PW0&t",
    alt_names: "",
  },
  {
    id: "heelflip",
    name: "Heelflip",
    description:
      "Similar to a Kickflip, but the board rotates in the opposite direction. Start like an Ollie with your front foot slightly over the front side of the bolts, as you slide your front foot up, kick it off the side of the board with your heel. The board should flip beneath you. Jump and catch the board, then land.",
    common_mistakes:
      "[Not flicking hard enough] Make sure to give a strong flick off the side of the board. [Not jumping high enough] Focus on getting a good pop to allow the board to rotate fully.",
    difficulty: "6",
    video_link: "https://www.youtube.com/watch?v=kTKySohOatw",
    alt_names: "",
  },
  {
    id: "fsflip",
    name: "Frontside Flip",
    description:
      "A Kickflip with a frontside rotation. Start with your front foot like a kickflip and your back foot like a frontside 180. As you pop, flick the board like a kickflip and turn your body frontside. Catch the board and land.",
    common_mistakes:
      "[Not getting the full frontside rotation] Make sure to turn your body fully frontside to complete the trick. [Not flicking hard enough] Focus on a strong flick off the side of the board.",
    difficulty: "8",
    video_link: "https://www.youtube.com/watch?v=95tiKcv2Ov0",
    alt_names: "FS Kickflip",
  },
  {
    id: "bsflip",
    name: "Backside Flip",
    description:
      "A Kickflip with a backside rotation. Start with your front foot like a kickflip and your back foot like a backside 180. As you pop, flick the board like a kickflip and turn your body backside. Catch the board and land.",
    common_mistakes:
      "[Not getting the full backside rotation] Make sure to turn your body fully backside to complete the trick. [Not flicking hard enough] Focus on a strong flick off the side of the board.",
    difficulty: "8",
    video_link: "https://www.youtube.com/watch?v=SEmHCs3COWI",
    alt_names: "BS Kickflip",
  },
  {
    id: "fakieflip",
    name: "Fakie Kickflip",
    description:
      "A Kickflip performed while riding fakie. Set up like a regular Kickflip, but while rolling fakie. Slide your front foot up the board and flick off the side to flip the board. Jump and catch the board, then land.",
    common_mistakes:
      "[Not flicking hard enough] Make sure to give a strong flick off the side of the board. [Not jumping high enough] Focus on getting a good pop to allow the board to rotate fully.",
    difficulty: "7",
    video_link: "https://www.youtube.com/watch?v=6KZWfsJgRvs",
    alt_names: "Fakie Kick, Fakie Flip",
  },
  {
    id: "fakiefsflip",
    name: "Fakie Frontside Flip",
    description:
      "A Frontside Flip performed while riding fakie. Set up like a regular Frontside Flip, but while rolling fakie. Pop, flick, and turn your body frontside. Catch the board and land.",
    common_mistakes:
      "[Not getting the full frontside rotation] Make sure to turn your body fully frontside to complete the trick. [Not flicking hard enough] Focus on a strong flick off the side of the board.",
    difficulty: "8",
    video_link: "https://www.youtube.com/watch?v=hRbG6iPLMP0",
    alt_names: "Fakie FS Flip, Front Half Cab Flip",
  },
  {
    id: "fakiebsflip",
    name: "Fakie Backside Flip",
    description:
      "A Backside Flip performed while riding fakie. Set up like a regular Backside Flip, but while rolling fakie. Pop, flick, and turn your body backside. Catch the board and land.",
    common_mistakes:
      "[Not getting the full backside rotation] Make sure to turn your body fully backside to complete the trick. [Not flicking hard enough] Focus on a strong flick off the side of the board.",
    difficulty: "8",
    video_link: "https://www.youtube.com/watch?v=eN77LuROEVY",
    alt_names: "Fakie BS Flip, Half Cab Flip",
  },
  {
    id: "nollieflip",
    name: "Nollie Kickflip",
    description:
      "A Kickflip performed from a nollie position. Start with your front foot like a nollie and your backfoot in kickflip position. As you pop, flick the board like a kickflip behind you and jump. Catch the board and land.",
    common_mistakes:
      "[Not flicking hard enough] Make sure to give a strong flick off the side of the board. [Not jumping high enough] Focus on getting a good pop to allow the board to rotate fully.",
    difficulty: "8",
    video_link: "https://www.youtube.com/watch?v=eEjl1spaNcg",
    alt_names: "Nollie Kick, Nollie Flip",
  },
  {
    id: "nolliefsflip",
    name: "Nollie Frontside Flip",
    description:
      "A Frontside Flip performed from a nollie position. Start with your front foot like a nollie and your back foot in kickflip position. As you pop, flick the board like a kickflip and turn your body frontside. Catch the board and land.",
    common_mistakes:
      "[Not getting the full frontside rotation] Make sure to turn your body fully frontside to complete the trick. [Not flicking hard enough] Focus on a strong flick off the side of the board.",
    difficulty: "9",
    video_link: "https://www.youtube.com/watch?v=tRg__iW-l7k",
    alt_names: "Nollie FS Flip",
  },
  {
    id: "nolliebsflip",
    name: "Nollie Backside Flip",
    description:
      "A Backside Flip performed from a nollie position. Start with your front foot like a nollie and your back foot in kickflip position. As you pop, flick the board like a kickflip and turn your body backside. Catch the board and land.",
    common_mistakes:
      "[Not getting the full backside rotation] Make sure to turn your body fully backside to complete the trick. [Not flicking hard enough] Focus on a strong flick off the side of the board.",
    difficulty: "9",
    video_link: "https://www.youtube.com/watch?v=RSXt_nQ4_us",
    alt_names: "Nollie BS Flip",
  },
  {
    id: "switchflip",
    name: "Switch Kickflip",
    description:
      "A Kickflip performed while riding switch. Set up like a regular Kickflip, but while rolling switch. Slide your front foot up the board and flick off the side to flip the board. Jump and catch the board, then land.",
    common_mistakes:
      "[Not flicking hard enough] Make sure to give a strong flick off the side of the board. [Not jumping high enough] Focus on getting a good pop to allow the board to rotate fully.",
    difficulty: "8",
    video_link: "https://www.youtube.com/watch?v=KyZRTYneBW0&t",
    alt_names: "Switch Kick, Switch Flip",
  },
  {
    id: "switchfsflip",
    name: "Switch Frontside Flip",
    description:
      "A Frontside Flip performed while riding switch. Set up like a regular Frontside Flip, but while rolling switch. Pop, flick, and turn your body frontside. Catch the board and land.",
    common_mistakes:
      "[Not getting the full frontside rotation] Make sure to turn your body fully frontside to complete the trick. [Not flicking hard enough] Focus on a strong flick off the side of the board.",
    difficulty: "9",
    video_link: "https://www.youtube.com/watch?v=TmGKeQxEYks",
    alt_names: "Switch FS Flip",
  },
  {
    id: "switchbsflip",
    name: "Switch Backside Flip",
    description:
      "A Backside Flip performed while riding switch. Set up like a regular Backside Flip, but while rolling switch. Pop, flick, and turn your body backside. Catch the board and land.",
    common_mistakes:
      "[Not getting the full backside rotation] Make sure to turn your body fully backside to complete the trick. [Not flicking hard enough] Focus on a strong flick off the side of the board.",
    difficulty: "9",
    video_link: "https://www.youtube.com/watch?v=d9O6v4gv2PM",
    alt_names: "Switch BS Flip",
  },
  {
    id: "fsheelflip",
    name: "Frontside Heelflip",
    description:
      "A Heelflip combined with a frontside 180. Start with your front foot positioned for a heelflip and back foot ready for frontside rotation. As you pop, flick the heel off the toe-side of the board while rotating your body frontside. Catch the board mid-rotation and land.",
    common_mistakes:
      "[Front foot position too far back] Keep your front foot closer to the front bolts for better control. [Rotating before the flick] Make sure to initiate the heelflip before starting the rotation.",
    difficulty: "8",
    video_link: "https://www.youtube.com/watch?v=XILp8ZI19NU",
    alt_names: "FS Heelflip",
  },
  {
    id: "bsheelflip",
    name: "Backside Heelflip",
    description:
      "A Heelflip with a backside 180. Position your front foot for a heelflip with your toes slightly hanging off the toe-side. Pop while simultaneously flicking your heel and rotating backside. The key is to keep the board under you throughout the rotation.",
    common_mistakes:
      "[Board shooting out front] Keep your shoulders centered over the board. [Incomplete rotation] Focus on following through with your shoulders to complete the full 180.",
    difficulty: "8",
    video_link: "https://www.youtube.com/watch?v=v4VncuPiai0",
    alt_names: "BS Heelflip",
  },
  {
    id: "fakieheelflip",
    name: "Fakie Heelflip",
    description:
      "A Heelflip performed while riding fakie. Setup like a regular heelflip but while rolling backwards. The flick motion is similar but you'll need to adjust your weight distribution since you're riding fakie. Pop, flick with your heel, and level out the board.",
    common_mistakes:
      "[Leaning too far forward] Keep your weight centered to maintain control. [Flicking down instead of out] Focus on flicking outward to get a clean flip.",
    difficulty: "7",
    video_link: "https://www.youtube.com/watch?v=kfxtwq0iPvw",
    alt_names: "Fakie Heel",
  },
  {
    id: "fakiefsheelflip",
    name: "Fakie Frontside Heelflip",
    description:
      "A Frontside Heelflip performed while riding fakie. Start in fakie stance with your front foot positioned for a heelflip. Pop while simultaneously flicking the heel and rotating frontside. The board should flip and rotate 180° as you turn with it.",
    common_mistakes:
      "[Rushing the rotation] Let the flip initiate before starting the turn. [Poor foot positioning] Keep your front foot closer to the bolts than you would in a regular heelflip.",
    difficulty: "8",
    video_link: "https://www.youtube.com/watch?v=3cwVnwS5OL8",
    alt_names: "Fakie FS Heel, Front Half Cab Heel",
  },
  {
    id: "fakiebsheelflip",
    name: "Fakie Backside Heelflip",
    description:
      "A Backside Heelflip performed in fakie stance. Position your feet for a fakie heelflip, then combine the heel flick with a backside rotation. The trick requires good board control as you'll need to keep the board under you throughout the rotation.",
    common_mistakes:
      "[Board rocketing] Focus on keeping the board level during the flip. [Opening shoulders too early] Maintain a closed shoulder position until you pop.",
    difficulty: "8",
    video_link: "https://www.youtube.com/watch?v=01vinQCaOnM",
    alt_names: "Fakie BS Heel, Half Cab Heel",
  },
  {
    id: "nollieheelflip",
    name: "Nollie Heelflip",
    description:
      "A Heelflip performed from a nollie position. Start with your front foot on the nose and back foot positioned for the heel flick. Pop off the nose while flicking your back foot's heel outward to initiate the flip. Catch and land with both feet.",
    common_mistakes:
      "[Incorrect back foot position] Keep your back foot centered over the board. [Poor weight distribution] Maintain even pressure between both feet when setting up.",
    difficulty: "8",
    video_link: "https://www.youtube.com/watch?v=dW70B72l_DY",
    alt_names: "Nollie Heel",
  },
  {
    id: "nolliefsheelflip",
    name: "Nollie Frontside Heelflip",
    description:
      "A Frontside Heelflip performed from nollie position. Begin with your front foot on the nose and back foot set for a heelflip. Pop off the nose while flicking and rotating frontside. The combination of flip and rotation should be smooth and controlled.",
    common_mistakes:
      "[Over-rotating] Focus on keeping the rotation controlled and smooth. [Poor timing] Coordinate the pop, flick, and rotation to work together.",
    difficulty: "9",
    video_link: "https://www.youtube.com/watch?v=mLHKN-NjjuY",
    alt_names: "Nollie FS Heel",
  },
  {
    id: "nolliebsheelflip",
    name: "Nollie Backside Heelflip",
    description:
      "A Backside Heelflip performed from nollie stance. Position your front foot on the nose and back foot for a heelflip. Pop from the nose while simultaneously flicking and rotating backside. The trick requires precise timing between the flip and rotation.",
    common_mistakes:
      "[Flicking too early] Wait for the pop before initiating the flick. [Loss of control] Keep your eyes on the board throughout the rotation.",
    difficulty: "9",
    video_link: "https://www.youtube.com/watch?v=at3ujagETBA",
    alt_names: "Nollie BS Heel",
  },
  {
    id: "switchheelflip",
    name: "Switch Heelflip",
    description:
      "A Heelflip performed while riding switch. Setup like a regular heelflip but in switch stance. The motion is similar to a regular heelflip, but you'll need to adjust to popping and flicking with your opposite feet.",
    common_mistakes:
      "[Improper foot placement] Focus on maintaining proper foot position despite being switch. [Flicking with toes] Remember to use your heel even in switch stance.",
    difficulty: "8",
    video_link: "https://www.youtube.com/watch?v=zojSYSk3ALQ",
    alt_names: "Switch Heel",
  },
  {
    id: "switchfsheelflip",
    name: "Switch Frontside Heelflip",
    description:
      "A Frontside Heelflip performed in switch stance. Position your feet for a switch heelflip, then combine with a frontside rotation. The trick requires coordination between the heel flick and body rotation while riding switch.",
    common_mistakes:
      "[Poor balance] Keep your weight centered throughout the trick. [Inconsistent flick] Practice the heel flick motion in switch until it becomes natural.",
    difficulty: "9",
    video_link: "https://www.youtube.com/watch?v=FwXg52WM1Sk",
    alt_names: "Switch FS Heel",
  },
  {
    id: "switchbsheelflip",
    name: "Switch Backside Heelflip",
    description:
      "A Backside Heelflip performed while riding switch. Set up in switch stance with your front foot positioned for a heelflip. Combine the heel flick with a backside rotation. The trick demands good board control and comfort riding switch.",
    common_mistakes:
      "[Rushing the rotation] Let the board flip before initiating the rotation. [Looking down] Keep your head up and spot your landing through the rotation.",
    difficulty: "9",
    video_link: "https://www.youtube.com/watch?v=11c6-TupsnM",
    alt_names: "Switch BS Heel",
  },
  {
    id: "biggerspin",
    name: "Biggerspin",
    description:
      "A trick combining a 540° backside board rotation with a 180° body rotation. Start like a Bigspin but with more wind-up. Scoop aggressively with your back foot for the 540° while simultaneously rotating your body 180°. The board will rotate one and a half rotations as your body does a half spin.",
    common_mistakes:
      "[Not scooping hard enough] The 540° board rotation requires a much stronger scoop than a regular Bigspin. [Poor timing] The body rotation must match the board's rotation speed.",
    difficulty: "9",
    video_link: "https://www.youtube.com/watch?v=ODkAkQEjvqM",
    alt_names: "BS Biggerspin, 540 Shuv 180",
  },
  //! FS BIGGERSPIN WANTED
  {
    id: "fsbiggerspin",
    name: "Frontside Biggerspin",
    description:
      "A frontside variation where the board rotates 540° frontside while your body does a 180° frontside rotation. Begin with a strong wind-up in the frontside direction. As you pop, scoop the board frontside while initiating your body rotation. Keep your eyes on the landing throughout.",
    common_mistakes:
      "[Under-rotating the board] The frontside scoop needs to be powerful enough for the full 540°. [Poor spot landing] Keep your head turned to maintain visibility.",
    difficulty: "9",
    video_link: "",
    alt_names: "FS Biggerspin, Front Biggerspin",
  },
  {
    id: "fakiebiggerspin",
    name: "Fakie Biggerspin",
    description:
      "A Biggerspin performed while riding fakie. The board rotates 540° backside while your body spins 180°. Start with your weight centered and wind up opposite to the spin direction. The fakie stance helps with the scoop but requires precise balance.",
    common_mistakes:
      "[Weight too far back] Stay centered over the board despite the fakie stance. [Rushed rotation] Let the scoop initiate before the body rotation.",
    difficulty: "8",
    video_link: "https://www.youtube.com/watch?v=r10w2X4rpaU&t=0s",
    alt_names: "Fakie BS Biggerspin, Fakie 540 Shuv 180",
  },
  {
    id: "fakiefsbiggerspin",
    name: "Fakie Frontside Biggerspin",
    description:
      "A frontside Biggerspin performed in fakie stance. Combine a 540° frontside board rotation with a 180° frontside body rotation. The fakie stance helps with the scoop, but maintaining control through the full rotation requires precise timing.",
    common_mistakes:
      "[Over-rotation] The fakie stance can make it easy to over-rotate - control your spin. [Board shooting out] Keep your shoulders aligned with the board.",
    difficulty: "8",
    video_link: "https://www.youtube.com/watch?v=atywqntZMYc",
    alt_names: "Fakie FS Biggerspin, Fakie Front Biggerspin",
  },
  {
    id: "nolliebiggerspin",
    name: "Nollie Biggerspin",
    description:
      "A Biggerspin performed from nollie stance. Pop from the nose while initiating a 540° backside board rotation and 180° body rotation. The nollie stance requires excellent control as you'll be managing complex rotations from the nose.",
    common_mistakes:
      "[Poor nose pop] Ensure a strong pop from the nose to get enough height. [Forward lean] Resist the tendency to lean forward during the nollie pop.",
    difficulty: "9",
    video_link: "https://www.youtube.com/watch?v=ecRx4osrSoU",
    alt_names: "Nollie BS Biggerspin, Nollie 540 Shuv 180",
  },
  //! NOLLIE FS BIGGERSPIN WANTED
  {
    id: "nolliefsbiggerspin",
    name: "Nollie Frontside Biggerspin",
    description:
      "A frontside Biggerspin from nollie stance. Pop from the nose while initiating a 540° frontside board rotation and 180° frontside body rotation. The trick combines the complexity of nollie pop with multiple rotation axes.",
    common_mistakes:
      "[Weak pop] The nollie pop must be strong enough for the full rotation. [Loss of control] Maintain centered weight throughout.",
    difficulty: "9",
    video_link: "",
    alt_names: "Nollie FS Biggerspin, Nollie Front Biggerspin",
  },
  //! SWITCH BS BIGGERSPIN WANTED
  {
    id: "switchbiggerspin",
    name: "Switch Biggerspin",
    description:
      "A Biggerspin performed in switch stance. Execute a 540° backside board rotation combined with a 180° body rotation while riding switch. This requires exceptional control as you'll be popping and scooping with your non-dominant foot.",
    common_mistakes:
      "[Inconsistent pop] Focus on getting a clean switch pop before initiating rotation. [Poor scoop control] Practice the switch scoop separately.",
    difficulty: "11",
    video_link: "",
    alt_names: "Switch BS Biggerspin, Switch 540 Shuv 180",
  },
  {
    id: "switchfsbiggerspin",
    name: "Switch Frontside Biggerspin",
    description:
      "A frontside Biggerspin performed in switch stance. Combine a 540° frontside board rotation with a 180° frontside body rotation while riding switch. This is one of the most technically demanding variations.",
    common_mistakes:
      "[Rotation hesitation] Commit fully to both rotations. [Switch stance instability] Maintain proper switch form throughout.",
    difficulty: "11",
    video_link: "https://www.youtube.com/watch?v=dIwDjl3AGkU",
    alt_names: "Switch FS Biggerspin, Switch Front Biggerspin",
  },
  {
    id: "varialkickflip",
    name: "Varial Flip",
    description:
      "A combination of a Kickflip and a backside 180° board rotation (BS Shuvit). Position your front foot like a kickflip and your back foot in the scooping position. Pop while simultaneously scooping backside and flicking the kickflip. The board should flip and rotate 180° beneath you.",
    common_mistakes:
      "[Flicking down instead of out] Focus on flicking outward to get the flip while allowing the board to rotate. [Poor scoop timing] The scoop and flick need to happen together.",
    difficulty: "8",
    video_link: "https://www.youtube.com/watch?v=BbYjz4hPCAY",
    alt_names: "Varial Flip, BS 180 Flip",
  },
  {
    id: "varialheelflip",
    name: "Varial Heelflip",
    description:
      "A combination of a Heelflip and a frontside 180° board rotation (FS Shuvit). Set up with your front foot positioned for a heelflip and back foot ready to scoop frontside. Pop while simultaneously scooping frontside and flicking the heelflip. The board should flip and rotate 180° beneath you.",
    common_mistakes:
      "[Poor foot position] Keep your front foot more centered for better flip control. [Rushing the scoop] Let the heelflip initiate as you scoop.",
    difficulty: "8",
    video_link: "https://www.youtube.com/watch?v=Y5eoY6EuwTc",
    alt_names: "Varial Heel, FS 180 Heel",
  },
  {
    id: "fakievarialkickflip",
    name: "Fakie Varial Kickflip",
    description:
      "A Varial Kickflip performed while riding fakie. Start with your feet positioned like a fakie kickflip, but with your back foot ready to scoop. Pop and simultaneously scoop backside while flicking the kickflip. The fakie stance makes the rotation more natural but requires good balance.",
    common_mistakes:
      "[Board rocketing] Keep the board level during the flip and rotation. [Weight too far back] Stay centered over the board throughout the trick.",
    difficulty: "9",
    video_link: "https://www.youtube.com/watch?v=pKBcWR-5Ilw",
    alt_names: "Fakie Varial Flip",
  },
  {
    id: "fakievarialheelflip",
    name: "Fakie Varial Heelflip",
    description:
      "A Varial Heelflip performed in fakie stance. Set up like a fakie heelflip with your back foot positioned to scoop frontside. Pop while combining the heelflip motion with a frontside scoop. The fakie stance helps with the scoop but requires precise flip timing.",
    common_mistakes:
      "[Poor flick direction] Focus on flicking straight out rather than down. [Uneven rotation] Keep the board's flip and rotation synchronized.",
    difficulty: "9",
    video_link: "https://www.youtube.com/watch?v=dK0ycofeay8",
    alt_names: "Fakie Varial Heel",
  },
  {
    id: "nollievarialkickflip",
    name: "Nollie Varial Kickflip",
    description:
      "A Varial Kickflip from nollie stance. Pop from the nose while combining a backside 180° rotation with a kickflip. The nollie stance requires good control of both the flip and rotation while popping off the nose.",
    common_mistakes:
      "[Weak nollie pop] Ensure a strong pop from the nose for proper height. [Poor rotation control] Keep the flip and rotation balanced throughout.",
    difficulty: "9",
    video_link: "https://www.youtube.com/watch?v=Abw4yg7skTE",
    alt_names: "Nollie Varial Flip",
  },
  {
    id: "nollievarialheelflip",
    name: "Nollie Varial Heelflip",
    description:
      "A Varial Heelflip performed from nollie stance. Pop off the nose while combining a frontside 180° rotation with a heelflip. The trick requires precise control of both the heel flick and scoop while managing the nollie pop.",
    common_mistakes:
      "[Pushing the board forward] Keep the board under you throughout the rotation. [Poor foot positioning] Maintain proper nollie stance through the setup.",
    difficulty: "9",
    video_link: "https://www.youtube.com/watch?v=xj9dl1G21Ss",
    alt_names: "Nollie Varial Heel",
  },
  {
    id: "switchvarialkickflip",
    name: "Switch Varial Kickflip",
    description:
      "A Varial Kickflip performed in switch stance. Combine a switch kickflip with a backside 180° rotation. The trick demands excellent control of both the flip and rotation while riding switch, making it particularly challenging.",
    common_mistakes:
      "[Inconsistent flip-rotation] Focus on keeping the flip and rotation working together in switch. [Poor weight distribution] Stay centered over the board despite the switch stance.",
    difficulty: "10",
    video_link: "https://www.youtube.com/watch?v=JG1XndVGH40",
    alt_names: "Switch Varial Flip",
  },
  {
    id: "switchvarialheelflip",
    name: "Switch Varial Heelflip",
    description:
      "A Varial Heelflip performed in switch stance. Combine a switch heelflip with a frontside 180° rotation. This requires exceptional control to manage both the heel flick and scoop while riding switch.",
    common_mistakes:
      "[Rushed rotation] Let the heelflip initiate before starting the rotation. [Board separation] Keep the board underneath you throughout the trick.",
    difficulty: "10",
    video_link: "https://www.youtube.com/watch?v=IrT712Xkg5Y",
    alt_names: "Switch Varial Heel",
  },
  {
    id: "hardflip",
    name: "Hardflip",
    description:
      "A combination of a Frontside Shuvit and a Kickflip. Position your front foot like a kickflip but angled slightly more towards the heel edge. Pop while simultaneously scooping frontside and flicking for the kickflip. The board should flip vertically while rotating 180° frontside. The movement is like a vertical kickflip that rotates frontside.",
    common_mistakes:
      "[Poor foot angle] Front foot must be angled correctly to guide both the flip and rotation. [Separating the motions] The scoop and flip need to happen as one fluid motion.",
    difficulty: "9",
    video_link: "https://www.youtube.com/watch?v=HJLMWOciMVk",
    alt_names: "FS Varial Kickflip",
  },
  {
    id: "inwardheelflip",
    name: "Inward Heelflip",
    description:
      "A combination of a Backside Shuvit and a Heelflip. Set up with your front foot positioned for a heelflip and your back foot ready to scoop backside. Pop while simultaneously scooping backside and flicking for the heelflip. The board should flip vertically while rotating 180° backside. Think of it as a vertical heelflip that rotates backside.",
    common_mistakes:
      "[Board rocketing] Focus on keeping the board level during the flip-rotation. [Wrong scoop direction] Ensure the scoop is directly backside, not at an angle.",
    difficulty: "9",
    video_link: "https://www.youtube.com/watch?v=G-CzzGwaTns",
    alt_names: "BS Varial Heelflip, Inward Heel",
  },
  {
    id: "fakiehardflip",
    name: "Fakie Hardflip",
    description:
      "A Hardflip performed while riding fakie. Set up like a fakie kickflip but prepare to scoop frontside. The fakie stance makes the scoop more natural, but you'll need to manage both the vertical flip and frontside rotation while rolling backward. Keep your shoulders aligned with the board throughout the trick.",
    common_mistakes:
      "[Leaning back too far] Stay centered over the board despite riding fakie. [Poor flip timing] Make sure the flip initiates simultaneously with the rotation.",
    difficulty: "10",
    video_link: "https://www.youtube.com/watch?v=GagRpiLINag",
    alt_names: "Fakie FS Varial Kick",
  },
  {
    id: "fakieinwardheelflip",
    name: "Fakie Inward Heelflip",
    description:
      "An Inward Heelflip performed in fakie stance. Combine a fakie heelflip with a backside rotation while rolling backwards. The trick requires precise control of both the heel flick and backside scoop, with the added complexity of the fakie stance. Keep your weight centered throughout the trick.",
    common_mistakes:
      "[Inconsistent scoop] Focus on a clean backside scoop while maintaining the heelflip motion. [Board slipping out] Keep your shoulders parallel to the board.",
    difficulty: "10",
    video_link: "https://www.youtube.com/watch?v=GEKFSHBYEZE",
    alt_names: "Fakie BS Varial Heel",
  },
  {
    id: "nolliehardflip",
    name: "Nollie Hardflip",
    description:
      "A Hardflip performed from nollie stance. Pop from the nose while combining a frontside rotation with a vertical kickflip. The nollie stance adds complexity to the trick as you'll need to manage the flip-rotation while popping off the nose. Maintain good shoulder alignment throughout the trick.",
    common_mistakes:
      "[Poor nollie pop] Ensure a strong pop from the nose to get proper height and rotation. [Forward lean] Resist the tendency to lean forward during the nollie pop.",
    difficulty: "10",
    video_link: "https://www.youtube.com/watch?v=wFd9es9spno",
    alt_names: "Nollie FS Varial Kick",
  },
  {
    id: "nollieinwardheelflip",
    name: "Nollie Inward Heelflip",
    description:
      "An Inward Heelflip performed from nollie stance. Pop off the nose while combining a backside rotation with a heelflip. This requires exceptional control as you'll be managing both the heel flick and backside rotation while popping from the nose. Focus on keeping the board underneath you throughout the trick.",
    common_mistakes:
      "[Rotation before pop] Let the nollie pop initiate before starting the rotation. [Board shooting forward] Keep your weight centered over the board.",
    difficulty: "10",
    video_link: "https://www.youtube.com/watch?v=rg1RdldZdII",
    alt_names: "Nollie BS Varial Heel",
  },
  {
    id: "switchhardflip",
    name: "Switch Hardflip",
    description:
      "A Hardflip performed in switch stance. Combine a switch kickflip with a frontside rotation. This is one of the most technically demanding variations as you'll need to manage both the vertical flip and frontside rotation while riding switch. The key is maintaining proper form throughout the trick.",
    common_mistakes:
      "[Improper foot positioning] Maintain proper switch stance through the setup and execution. [Uncontrolled rotation] Keep both the flip and rotation synchronized.",
    difficulty: "10",
    video_link: "https://www.youtube.com/watch?v=xdyi1I5KzCE",
    alt_names: "Switch FS Varial Kick",
  },
  {
    id: "switchinwardheelflip",
    name: "Switch Inward Heelflip",
    description:
      "An Inward Heelflip performed in switch stance. Combine a switch heelflip with a backside rotation. This requires perfect control of both the heel flick and backside scoop while riding switch. Focus on keeping your weight centered and shoulders aligned throughout the trick.",
    common_mistakes:
      "[Poor scoop direction] Maintain a clean backside scoop despite the switch stance. [Losing board control] Keep the board directly under you through the rotation.",
    difficulty: "10",
    video_link: "https://www.youtube.com/watch?v=C0dse_D2nKE",
    alt_names: "Switch BS Varial Heel",
  },
  {
    id: "treflip",
    name: "Tre Flip",
    description:
      "A combination of a 360° Backside Shuvit and a Kickflip. Position your back foot in the scooping position with your toes slightly hanging off, and front foot angled for a kickflip. Pop while simultaneously scooping backside and flicking for the kickflip. The board should complete both a full 360° rotation and a kickflip. Timing is crucial as both motions need to stay synchronized.",
    common_mistakes:
      "[Over-flicking] Let the scoop create most of the rotation, with a light flick for the flip. [Poor scoop direction] Focus on a clean backside scoop to get the full 360°.",
    difficulty: "10",
    video_link: "https://www.youtube.com/watch?v=XGw3YkQmNig",
    alt_names: "360 Flip, 360 Kickflip, Three Flip",
  },
  {
    id: "fakietreflip",
    name: "Fakie 360 Flip",
    description:
      "A 360 Flip performed while riding fakie. Start with your feet positioned like a fakie kickflip, but with your back foot ready for a powerful scoop. The fakie stance can help with the scoop, but managing both the full rotation and flip while rolling backward requires excellent control. Focus on keeping the board under you throughout the rotation.",
    common_mistakes:
      "[Rushing the catch] Let the board complete both rotations before catching. [Weight too far back] Stay centered despite the fakie stance.",
    difficulty: "11",
    video_link: "https://www.youtube.com/watch?v=AyF2MAGREb0",
    alt_names: "Fakie Tre, Fakie Three Flip",
  },
  {
    id: "nollietreflip",
    name: "Nollie 360 Flip",
    description:
      "A 360 Flip performed from nollie stance. Pop from the nose while combining a 360° backside rotation with a kickflip. The nollie stance makes this particularly challenging as you'll need to manage both the full rotation and flip while popping off the nose. The key is maintaining proper balance throughout the trick.",
    common_mistakes:
      "[Poor nollie pop] Ensure a strong pop from the nose for proper height and rotation. [Board shooting forward] Keep your weight centered throughout the trick.",
    difficulty: "11",
    video_link: "https://www.youtube.com/watch?v=mZQQhu-VUCM",
    alt_names: "Nollie Tre, Nollie Three Flip",
  },
  {
    id: "switchtreflip",
    name: "Switch 360 Flip",
    description:
      "A 360 Flip performed in switch stance. Combine a switch 360° backside shuvit with a switch kickflip. This requires exceptional control as you'll need to manage both the full rotation and flip while riding switch. The trick demands perfect balance and precise foot placement, making it one of the most technically challenging variations.",
    common_mistakes:
      "[Inconsistent scoop] Focus on a clean backside scoop despite the switch stance. [Poor flip timing] Coordinate the flip and rotation to work together smoothly.",
    difficulty: "11",
    video_link: "https://www.youtube.com/watch?v=YwVNxoxlov8",
    alt_names: "Switch Tre, Switch Three Flip",
  },
  {
    id: "lasertreflip",
    name: "Laser 360 Flip",
    description:
      "A combination of a 360° Frontside Shuvit and a Heelflip. Set up with your back foot positioned for a frontside scoop and front foot angled for a heelflip. Pop while simultaneously scooping frontside and flicking for the heelflip. The board should complete both a full 360° frontside rotation and a heelflip. This is the frontside/heelflip equivalent of a tre flip.",
    common_mistakes:
      "[Flick timing] The heelflip needs to work in harmony with the frontside rotation. [Scoop direction] Maintain a clean frontside scoop throughout.",
    difficulty: "11",
    video_link: "https://www.youtube.com/watch?v=si_H18QjU58",
    alt_names: "Laser Flip, 360 Heelflip",
  },
  {
    id: "fakielasertreflip",
    name: "Fakie Laser 360 Flip",
    description:
      "A Laser Flip performed while riding fakie. Combine a fakie 360° frontside shuvit with a heelflip. The fakie stance helps with the scoop, but coordinating both the full rotation and heelflip while rolling backward requires precise control. Focus on keeping the board under you throughout both rotations.",
    common_mistakes:
      "[Poor catch timing] Wait for both rotations to complete before catching. [Weight distribution] Maintain centered weight throughout the trick.",
    difficulty: "11",
    video_link: "https://www.youtube.com/watch?v=LuZ4c-2BgZI",
    alt_names: "Fakie Laser, Fakie 360 Heel",
  },
  {
    id: "nollielasertreflip",
    name: "Nollie Laser 360 Flip",
    description:
      "A Laser Flip performed from nollie stance. Pop from the nose while combining a 360° frontside rotation with a heelflip. The nollie stance makes this exceptionally difficult as you'll need to manage both rotations while popping off the nose. Maintaining proper balance throughout the trick is crucial.",
    common_mistakes:
      "[Weak nollie pop] Get a strong pop from the nose for proper rotation. [Forward lean] Resist the tendency to lean forward during execution.",
    difficulty: "11",
    video_link: "https://www.youtube.com/watch?v=sSine81uJVE",
    alt_names: "Nollie Laser, Nollie 360 Heel",
  },
  {
    id: "switchlasertreflip",
    name: "Switch Laser 360 Flip",
    description:
      "A Laser Flip performed in switch stance. Combine a switch 360° frontside shuvit with a switch heelflip. This requires perfect control of both the full rotation and flip while riding switch. The trick demands exceptional balance and precise foot placement throughout its execution.",
    common_mistakes:
      "[Poor rotation control] Maintain a clean frontside scoop in switch stance. [Balance issues] Keep your weight centered despite the complex rotation.",
    difficulty: "11",
    video_link: "https://www.youtube.com/watch?v=b9L_-AKGs60",
    alt_names: "Switch Laser, Switch 360 Heel",
  },
  {
    id: "bigflip",
    name: "Big Flip",
    description:
      "A combination of a Kickflip and a Bigspin (360° backside board rotation with 180° body rotation). Start with your feet positioned for both a kickflip and bigspin. Pop while simultaneously scooping for the 360° board rotation, flicking for the kickflip, and rotating your body 180° backside. The board should complete both a kickflip and full rotation as your body turns 180°.",
    common_mistakes:
      "[Poor body rotation timing] Start the body rotation as the board begins to flip. [Uneven board rotation] Ensure a full 360° board spin while maintaining the flip.",
    difficulty: "11",
    video_link: "https://www.youtube.com/watch?v=i9V8FOJygtY",
    alt_names: "Kickflip Bigspin, BS Big Flip",
  },
  {
    id: "bigheel",
    name: "Big Heel",
    description:
      "A combination of a Heelflip and a Bigspin (360° frontside board rotation with 180° body rotation). Position your feet for both a heelflip and frontside bigspin. Pop while simultaneously scooping frontside for the 360° rotation, flicking for the heelflip, and rotating your body 180°. Coordinate the heelflip with the board's full rotation and your body turn.",
    common_mistakes:
      "[Separation of motions] Keep the heelflip and rotation working together. [Over-rotation] Control your body rotation to match the board's spin.",
    difficulty: "11",
    video_link: "https://www.youtube.com/watch?v=Au2K85aCLYk",
    alt_names: "Heelflip Bigspin, FS Big Heel",
  },
  {
    id: "fakiebigflip",
    name: "Fakie Big Flip",
    description:
      "A Big Flip performed while riding fakie. Set up like a fakie kickflip but prepare for the full bigspin rotation. The fakie stance can help with the scoop, but you'll need to manage the kickflip, 360° board rotation, and 180° body rotation while rolling backward. Focus on keeping everything synchronized.",
    common_mistakes:
      "[Rushing the catch] Let both rotations complete before catching. [Poor weight distribution] Stay centered despite the complex motion.",
    difficulty: "11",
    video_link: "https://www.youtube.com/watch?v=Dzxz1RD9HWQ",
    alt_names: "Fakie Kickflip Bigspin",
  },
  {
    id: "fakiebigheel",
    name: "Fakie Big Heel",
    description:
      "A Big Heel performed in fakie stance. Combine a fakie heelflip with a frontside bigspin while rolling backward. The trick requires precise control of the heelflip while managing both the 360° board rotation and 180° body rotation. Keep your shoulders aligned through the rotation.",
    common_mistakes:
      "[Board shooting out] Keep the board under you throughout the rotation. [Inconsistent flip] Maintain the heelflip motion during the spin.",
    difficulty: "11",
    video_link: "https://www.youtube.com/watch?v=ze5q8LwNArs",
    alt_names: "Fakie Heelflip Bigspin",
  },
  {
    id: "nolliebigflip",
    name: "Nollie Big Flip",
    description:
      "A Big Flip performed from nollie stance. Pop from the nose while combining a kickflip with a backside bigspin. The nollie stance adds complexity as you'll need to manage the flip, 360° board rotation, and 180° body rotation while popping off the nose. Maintain balance throughout the trick.",
    common_mistakes:
      "[Poor nollie pop] Ensure a strong pop from the nose for proper height. [Forward lean] Keep your weight centered through the rotation.",
    difficulty: "11",
    video_link: "https://www.youtube.com/watch?v=qdwf1um6k2E",
    alt_names: "Nollie Kickflip Bigspin",
  },
  {
    id: "nolliebigheel",
    name: "Nollie Big Heel",
    description:
      "A Big Heel performed from nollie stance. Pop off the nose while combining a heelflip with a frontside bigspin. This requires exceptional control as you'll be managing the heelflip and both rotations while popping from the nose. Focus on keeping the trick compact and controlled.",
    common_mistakes:
      "[Rotation before pop] Let the nollie pop initiate before the rotation. [Loss of control] Keep the board directly under you throughout.",
    difficulty: "11",
    video_link: "https://www.youtube.com/watch?v=hkLC5I4h3ZY",
    alt_names: "Nollie Heelflip Bigspin",
  },
  {
    id: "switchbigflip",
    name: "Switch Big Flip",
    description:
      "A Big Flip performed in switch stance. Combine a switch kickflip with a backside bigspin. This requires perfect control as you'll need to manage the flip and both rotations while riding switch. The key is maintaining proper form throughout all aspects of the trick.",
    common_mistakes:
      "[Improper foot position] Maintain proper switch stance through the setup. [Uncontrolled rotation] Keep all rotations working together smoothly.",
    difficulty: "11",
    video_link: "https://www.youtube.com/watch?v=CFxcaOOpoXg",
    alt_names: "Switch Kickflip Bigspin",
  },
  {
    id: "switchbigheel",
    name: "Switch Big Heel",
    description:
      "A Big Heel performed in switch stance. Combine a switch heelflip with a frontside bigspin. This requires exceptional balance to manage both the heelflip and bigspin rotations while riding switch. Focus on keeping your shoulders aligned and the board under control throughout.",
    common_mistakes:
      "[Poor scoop control] Maintain a clean frontside scoop in switch. [Board separation] Keep the board underneath you through the trick.",
    difficulty: "11",
    video_link: "https://www.youtube.com/watch?v=n5n53NNpRw0",
    alt_names: "Switch Heelflip Bigspin",
  },
  {
    id: "gazelleflip",
    name: "Gazelle Flip",
    description:
      "A complex trick combining a 540° backside board rotation, 360° body rotation, and a kickflip. Start with a strong wind-up, scoop aggressively for the 540° while simultaneously initiating your full body rotation and kickflip. All three elements must be perfectly timed.",
    common_mistakes:
      "[Poor rotation sync] Keep all three rotations coordinated. [Insufficient scoop] The 540° requires an aggressive scoop.",
    difficulty: "11",
    video_link: "https://www.youtube.com/watch?v=ZfrsoZBdoOQ",
    alt_names: "BS 540 Flip Body 360",
  },
  //! FRONT GAZELLE FLIP WANTED
  {
    id: "fsgazelleflip",
    name: "Frontside Gazelle Flip",
    description:
      "The frontside version of a Gazelle Flip, combining a 540° frontside board rotation with a 360° body rotation and kickflip. Wind up frontside, then coordinate the flip with both rotation elements. Requires excellent spatial awareness.",
    common_mistakes:
      "[Lost orientation] Maintain awareness through the rotations. [Flip timing] The kickflip must stay with the rotation.",
    difficulty: "11",
    video_link: "",
    alt_names: "FS Gazelle Flip, FS 540 Flip Body 360",
  },
  {
    id: "fakiegazelleflip",
    name: "Fakie Gazelle Flip",
    description:
      "A Gazelle Flip performed in fakie stance. Combines a fakie 540° backside board rotation with a 360° body rotation and kickflip. The fakie stance can help with the scoop, but coordinating all three elements requires exceptional skill.",
    common_mistakes:
      "[Rotation separation] Keep the flip coordinated with both rotations. [Poor balance] Maintain center of gravity throughout.",
    difficulty: "11",
    video_link: "https://www.youtube.com/watch?v=uUQKKHStR3c",
    alt_names: "Fakie BS Gazelle Flip",
  },
  //! FAKIE FRONT GAZELLE FLIP WANTED
  {
    id: "fakiefsgazelleflip",
    name: "Fakie Frontside Gazelle Flip",
    description:
      "A frontside Gazelle Flip performed in fakie stance. Combines a fakie 540° frontside rotation with a 360° body rotation and kickflip. The trick requires perfect coordination of all three elements while riding fakie.",
    common_mistakes:
      "[Over-rotation] Control the multiple rotation elements carefully. [Lost board control] Keep the board underneath throughout.",
    difficulty: "11",
    video_link: "",
    alt_names: "Fakie FS Gazelle Flip",
  },
  {
    id: "nolliegazelleflip",
    name: "Nollie Gazelle Flip",
    description:
      "A Gazelle Flip performed from nollie stance. Pop from the nose while combining a 540° backside rotation, 360° body rotation, and kickflip. The nollie stance adds complexity to an already technical trick.",
    common_mistakes:
      "[Weak nollie pop] Get sufficient pop for all rotations. [Forward lean] Stay centered despite the nollie position.",
    difficulty: "11",
    video_link: "https://www.youtube.com/watch?v=OyBAyt1sYik",
    alt_names: "Nollie BS Gazelle Flip",
  },
  {
    id: "nolliefsgazelleflip",
    name: "Nollie Frontside Gazelle Flip",
    description:
      "A frontside Gazelle Flip performed from nollie stance. Combines a nollie 540° frontside rotation with a 360° body rotation and kickflip. Requires exceptional control and coordination while popping from the nose.",
    common_mistakes:
      "[Poor rotation control] Maintain all rotations while popping nollie. [Incomplete flip] Keep the flip consistent through the rotation.",
    difficulty: "11",
    video_link: "https://www.youtube.com/watch?v=isXxpys24zA",
    alt_names: "Nollie FS Gazelle Flip",
  },
  //! SWITCH GAZELLE FLIP WANTED
  {
    id: "switchgazelleflip",
    name: "Switch Gazelle Flip",
    description:
      "A Gazelle Flip performed in switch stance. Combines a switch 540° backside rotation with a 360° body rotation and kickflip. One of the most technically demanding tricks, requiring perfect control in switch stance.",
    common_mistakes:
      "[Switch pop instability] Maintain control while popping switch. [Rotation sync] Keep all elements coordinated.",
    difficulty: "11",
    video_link: "",
    alt_names: "Switch BS Gazelle Flip",
  },
  //! SWITCH FRONT GAZELLE FLIP WANTED
  {
    id: "switchfsgazelleflip",
    name: "Switch Frontside Gazelle Flip",
    description:
      "A frontside Gazelle Flip performed in switch stance. Combines a switch 540° frontside rotation with a 360° body rotation and kickflip. Requires exceptional balance and control throughout all rotations.",
    common_mistakes:
      "[Poor switch control] Maintain switch form throughout. [Rotation timing] Keep all elements synchronized.",
    difficulty: "11",
    video_link: "",
    alt_names: "Switch FS Gazelle Flip",
  },
  {
    id: "gazellespin",
    name: "Gazelle Spin",
    description:
      "A combination of a 540° backside board rotation with a 360° body rotation. Similar to a Gazelle Flip but without the flip component. Start with a strong wind-up, scoop aggressively for the 540° while initiating a full body rotation. The board and body rotations must work in harmony.",
    common_mistakes:
      "[Rotation mismatch] Keep board and body rotations synchronized. [Poor scoop direction] Maintain a clean backside scoop.",
    difficulty: "11",
    video_link: "https://www.youtube.com/watch?v=ey2cQwIMhMM",
    alt_names: "BS 540 Shuv Body 360",
  },
  //! FRONT GAZELLE SPIN WANTED
  {
    id: "fsgazellespin",
    name: "Frontside Gazelle Spin",
    description:
      "A frontside variation combining a 540° frontside board rotation with a 360° body rotation. Wind up frontside, then coordinate your body rotation with the board's rotation. Requires excellent spatial awareness to track your landing.",
    common_mistakes:
      "[Lost orientation] Keep track of the landing throughout. [Uneven rotation] Maintain consistent rotation speed.",
    difficulty: "11",
    video_link: "",
    alt_names: "FS Gazelle Spin",
  },
  {
    id: "fakiegazellespin",
    name: "Fakie Gazelle Spin",
    description:
      "A Gazelle Spin performed in fakie stance. The board rotates 540° backside while your body completes a 360° rotation. The fakie stance helps with the scoop but requires excellent balance through both rotations.",
    common_mistakes:
      "[Weight distribution] Stay centered despite the fakie stance. [Rotation timing] Coordinate both rotations properly.",
    difficulty: "11",
    video_link: "https://www.youtube.com/watch?v=yYESiME8ZOc",
    alt_names: "Fakie BS Gazelle Spin",
  },
  {
    id: "fakiefsgazellespin",
    name: "Fakie Frontside Gazelle Spin",
    description:
      "A frontside Gazelle Spin performed in fakie stance. Combines a fakie 540° frontside rotation with a 360° body rotation. The trick requires precise timing and control while managing both rotations in fakie.",
    common_mistakes:
      "[Over-rotation] Control the speed of both rotations. [Board positioning] Keep the board under you throughout.",
    difficulty: "11",
    video_link: "https://www.youtube.com/watch?v=7lyaDgJTnjw",
    alt_names: "Fakie FS Gazelle Spin",
  },
  {
    id: "nolliegazellespin",
    name: "Nollie Gazelle Spin",
    description:
      "A Gazelle Spin performed from nollie stance. Pop from the nose while combining a 540° backside rotation with a 360° body rotation. Managing both rotations while popping from the nose requires exceptional control.",
    common_mistakes:
      "[Poor nollie pop] Get enough height for both rotations. [Forward lean] Maintain centered position.",
    difficulty: "11",
    video_link: "https://www.youtube.com/watch?v=AgiqyzW-LNU",
    alt_names: "Nollie BS Gazelle Spin",
  },
  //! NOLLIE FRONTSIDE GAZELLE SPIN WANTED
  {
    id: "nolliefsgazellespin",
    name: "Nollie Frontside Gazelle Spin",
    description:
      "A frontside Gazelle Spin from nollie stance. Combines a nollie 540° frontside rotation with a 360° body rotation. The trick demands perfect control while managing multiple rotation axes from the nose.",
    common_mistakes:
      "[Rotation control] Keep both rotations coordinated. [Balance] Stay centered throughout the trick.",
    difficulty: "11",
    video_link: "",
    alt_names: "Nollie FS Gazelle Spin",
  },
  //! SWITCH GAZELLE SPIN WANTED
  {
    id: "switchgazellespin",
    name: "Switch Gazelle Spin",
    description:
      "A Gazelle Spin performed in switch stance. Execute a switch 540° backside rotation while your body completes a 360° rotation. One of the most technically demanding variations, requiring perfect control in switch stance.",
    common_mistakes:
      "[Switch stance control] Maintain proper form throughout. [Rotation sync] Keep both rotations coordinated.",
    difficulty: "11",
    video_link: "",
    alt_names: "Switch BS Gazelle Spin",
  },
  //! SWITCH FRONT GAZELLE SPIN WANTED
  {
    id: "switchfsgazellespin",
    name: "Switch Frontside Gazelle Spin",
    description:
      "A frontside Gazelle Spin performed in switch stance. Combines a switch 540° frontside rotation with a 360° body rotation. Requires exceptional balance and control while managing multiple rotations in switch.",
    common_mistakes:
      "[Switch balance] Keep centered despite the complex rotation. [Spot landing] Track your landing throughout.",
    difficulty: "11",
    video_link: "",
    alt_names: "Switch FS Gazelle Spin",
  },
  {
    id: "blizzardflip",
    name: "Blizzard Flip",
    description:
      "A combination of a backside 360° kickflip with a 360° body rotation. Similar to a tre flip but with a full body rotation. Start with a strong wind-up, then coordinate the kickflip with both the board and body rotation for a synchronized trick.",
    common_mistakes:
      "[Poor sync] Keep the flip coordinated with both rotations. [Lost orientation] Maintain awareness throughout the spin.",
    difficulty: "11",
    video_link: "https://www.youtube.com/watch?v=VW3OB1D5Mew",
    alt_names: "BS 360 Flip Body Varial",
  },
  //! FAKIE BLIZZARD FLIP WANTED
  {
    id: "fakieblizzardflip",
    name: "Fakie Blizzard Flip",
    description:
      "A Blizzard Flip performed in fakie stance. Combines a fakie backside 360° rotation with a kickflip and 360° body rotation. The fakie stance can help with the rotation but requires excellent coordination of all elements.",
    common_mistakes:
      "[Rotation separation] Keep all elements working together. [Poor balance] Maintain center of gravity.",
    difficulty: "11",
    video_link: "",
    alt_names: "Fakie BS Blizzard",
  },
  //! NOLLIE BLIZZARD FLIP WANTED
  {
    id: "nollieblizzardflip",
    name: "Nollie Blizzard Flip",
    description:
      "A Blizzard Flip performed from nollie stance. Pop from the nose while combining a 360° rotation with a kickflip and 360° body rotation. The nollie stance adds significant complexity to an already technical trick.",
    common_mistakes:
      "[Weak nollie pop] Ensure sufficient pop for all rotations. [Forward lean] Stay centered despite nollie position.",
    difficulty: "11",
    video_link: "",
    alt_names: "Nollie BS Blizzard",
  },
  //! SWITCH BLIZZARD FLIP WANTED
  {
    id: "switchblizzardflip",
    name: "Switch Blizzard Flip",
    description:
      "A Blizzard Flip performed in switch stance. Combines a switch 360° rotation with a kickflip and 360° body rotation. One of the most technically demanding tricks, requiring perfect control of multiple elements in switch stance.",
    common_mistakes:
      "[Switch control] Maintain proper form throughout all rotations. [Element timing] Keep all components synchronized.",
    difficulty: "11",
    video_link: "",
    alt_names: "Switch BS Blizzard",
  },
  {
    id: "bs360ollie",
    name: "Backside 360 Ollie",
    description:
      "A full 360° backside rotation while performing an ollie. Wind up strongly in the backside direction, then pop while initiating the rotation. Keep your head turned to spot your landing through the full rotation. The key is maintaining height while rotating.",
    common_mistakes:
      "[Under-rotation] Commit to the full 360° spin. [Poor spot landing] Keep your eyes focused throughout.",
    difficulty: "8",
    video_link: "https://www.youtube.com/watch?v=rPjtZFMvhtA",
    alt_names: "BS 360",
  },
  {
    id: "fs360ollie",
    name: "Frontside 360 Ollie",
    description:
      "A full 360° frontside rotation while performing an ollie. Wind up in the frontside direction, pop and initiate the rotation. Maintaining visibility of your landing is crucial as you complete the full rotation. Requires good shoulder control.",
    common_mistakes:
      "[Lost sight of landing] Keep your head turned to track the landing. [Poor rotation speed] Maintain consistent spin.",
    difficulty: "8",
    video_link: "https://www.youtube.com/watch?v=uCOI352jvBQ",
    alt_names: "FS 360",
  },
  {
    id: "fakiebs360",
    name: "Fakie Backside 360",
    description:
      "A backside 360° rotation performed in fakie stance. The fakie stance helps with the rotation, but requires good balance throughout. Wind up opposite to the spin direction and maintain sight of your landing.",
    common_mistakes:
      "[Weight too far back] Stay centered despite fakie stance. [Rushed rotation] Keep the spin controlled.",
    difficulty: "7",
    video_link: "https://www.youtube.com/watch?v=QNE6EoQRyDk",
    alt_names: "Fakie BS 360",
  },
  {
    id: "fakiefs360",
    name: "Fakie Frontside 360",
    description:
      "A frontside 360° rotation performed in fakie stance. Start with frontside wind-up while riding fakie, then pop and rotate. The fakie stance makes the initial rotation more natural but requires good control to complete.",
    common_mistakes:
      "[Poor balance] Maintain center of gravity throughout. [Incomplete rotation] Commit to the full 360°.",
    difficulty: "7",
    video_link: "https://www.youtube.com/watch?v=EB6ndwQmGs4",
    alt_names: "Fakie FS 360",
  },
  {
    id: "nolliebs360",
    name: "Nollie Backside 360",
    description:
      "A backside 360° rotation performed from nollie stance. Pop from the nose while initiating the backside rotation. Requires excellent nollie control while managing the full rotation. Keep your shoulders aligned throughout.",
    common_mistakes:
      "[Weak nollie pop] Get proper height from the nose. [Forward lean] Stay centered through rotation.",
    difficulty: "7",
    video_link: "https://www.youtube.com/watch?v=lGVdOoL67pY",
    alt_names: "Nollie BS 360",
  },
  {
    id: "nolliefs360",
    name: "Nollie Frontside 360",
    description:
      "A frontside 360° rotation performed from nollie stance. Pop from the nose and rotate frontside while maintaining control. The trick combines the complexity of nollie with a full rotation, requiring good balance.",
    common_mistakes:
      "[Poor nollie control] Maintain proper form off the nose. [Rotation speed] Keep the spin consistent.",
    difficulty: "7",
    video_link: "https://www.youtube.com/watch?v=4_El6Ni3InE",
    alt_names: "Nollie FS 360",
  },
  {
    id: "switchbs360",
    name: "Switch Backside 360",
    description:
      "A backside 360° rotation performed in switch stance. Wind up backside while riding switch, then pop and rotate. Requires excellent switch control throughout the full rotation. One of the more challenging 360 variations.",
    common_mistakes:
      "[Switch stance stability] Maintain proper form throughout. [Poor rotation control] Keep the spin smooth.",
    difficulty: "9",
    video_link: "https://www.youtube.com/watch?v=j0oWozICVRI",
    alt_names: "Switch BS 360",
  },
  {
    id: "switchfs360",
    name: "Switch Frontside 360",
    description:
      "A frontside 360° rotation performed in switch stance. Combine switch riding with a full frontside rotation. This requires exceptional balance and control while managing the rotation in switch stance.",
    common_mistakes:
      "[Lost orientation] Keep track of the landing throughout. [Switch control] Maintain switch form during rotation.",
    difficulty: "9",
    video_link: "https://www.youtube.com/watch?v=xQYruI69fIs",
    alt_names: "Switch FS 360",
  },
  {
    id: "doubleflip",
    name: "Double Kickflip",
    description:
      "A kickflip that rotates twice before landing. Similar to a regular kickflip but requires a stronger flick and more hang time. Focus on a clean flick and give the board time to complete both rotations.",
    common_mistakes:
      "[Insufficient flick] Flick must be strong enough for two rotations. [Early catch] Let both flips complete.",
    difficulty: "8",
    video_link: "https://www.youtube.com/watch?v=kLgi2oaM3cw",
    alt_names: "Double Kick",
  },
  {
    id: "fakiedoubleflip",
    name: "Fakie Double Kickflip",
    description:
      "A Double Kickflip performed while riding fakie. The fakie stance can help with pop but requires precise flick control for both rotations. Keep your weight centered throughout the trick.",
    common_mistakes:
      "[Poor balance] Stay centered despite fakie stance. [Inconsistent flip] Maintain flip speed through both rotations.",
    difficulty: "9",
    video_link: "https://www.youtube.com/watch?v=h7TKL88dFFs",
    alt_names: "Fakie Double Kick",
  },
  {
    id: "nolliedoubleflip",
    name: "Nollie Double Kickflip",
    description:
      "A Double Kickflip performed from nollie stance. Pop from the nose while executing two full kickflip rotations. Requires strong nollie control and precise flick timing.",
    common_mistakes:
      "[Poor nollie pop] Get enough height for both flips. [Forward lean] Maintain centered position.",
    difficulty: "9",
    video_link: "https://www.youtube.com/watch?v=fJvZ3uUu_q4",
    alt_names: "Nollie Double Kick",
  },
  {
    id: "switchdoubleflip",
    name: "Switch Double Kickflip",
    description:
      "A Double Kickflip performed in switch stance. Requires exceptional control to manage both flip rotations while riding switch. Focus on maintaining proper form throughout the trick.",
    common_mistakes:
      "[Switch stance control] Keep proper form during both flips. [Flick timing] Maintain consistent flip speed.",
    difficulty: "10",
    video_link: "https://www.youtube.com/watch?v=HRL09rppPck",
    alt_names: "Switch Double Kick",
  },
  {
    id: "doubleheelflip",
    name: "Double Heelflip",
    description:
      "A heelflip that rotates twice before landing. Like a regular heelflip but with a stronger flick to achieve two full rotations. Focus on getting enough height and a clean flick to allow time for both rotations.",
    common_mistakes:
      "[Poor flick power] Need strong flick for both rotations. [Catching early] Let both flips complete.",
    difficulty: "8",
    video_link: "https://www.youtube.com/watch?v=0PknA3HvJRE",
    alt_names: "Double Heel",
  },
  {
    id: "fakiedoubleheelflip",
    name: "Fakie Double Heelflip",
    description:
      "A Double Heelflip performed while riding fakie. The fakie stance helps with pop but requires precise control for both heelflip rotations. Maintain good balance throughout both flips.",
    common_mistakes:
      "[Weight distribution] Stay centered through both flips. [Rotation control] Keep flips consistent.",
    difficulty: "9",
    video_link: "https://www.youtube.com/watch?v=Qv3n7JvGO4s",
    alt_names: "Fakie Double Heel",
  },
  {
    id: "nolliedoubleheelflip",
    name: "Nollie Double Heelflip",
    description:
      "A Double Heelflip performed from nollie stance. Pop from the nose while executing two full heelflip rotations. Requires strong nollie control and precise heel flick timing.",
    common_mistakes:
      "[Nollie pop control] Get proper height for both flips. [Forward lean] Stay centered.",
    difficulty: "9",
    video_link: "https://www.youtube.com/watch?v=jcOWLsf91vY",
    alt_names: "Nollie Double Heel",
  },
  {
    id: "switchdoubleheelflip",
    name: "Switch Double Heelflip",
    description:
      "A Double Heelflip performed in switch stance. Requires exceptional control to manage both heelflip rotations while riding switch. Maintain proper form throughout both rotations.",
    common_mistakes:
      "[Switch stance stability] Keep form during flips. [Flick consistency] Maintain even rotation.",
    difficulty: "10",
    video_link: "https://www.youtube.com/watch?v=G5PJEh4Q_hU",
    alt_names: "Switch Double Heel",
  },
  {
    id: "doubletreflip",
    name: "Double Tre Flip",
    description:
      "A combination of a 360° shuv-it and double kickflip. The board completes a full 360° rotation while performing two kickflips. Requires perfect timing between the scoop and flick to keep both motions synchronized.",
    common_mistakes:
      "[Motion separation] Keep scoop and flips coordinated. [Poor catch timing] Wait for full rotation.",
    difficulty: "11",
    video_link: "https://www.youtube.com/watch?v=JwhJjeXK2uI",
    alt_names: "Double 360 Flip",
  },
  {
    id: "fakiedoubletreflip",
    name: "Fakie Double Tre Flip",
    description:
      "A Double Tre Flip performed in fakie stance. Combine a fakie 360° shuv-it with two kickflips. The fakie stance helps with scoop but requires precise control of both flip rotations.",
    common_mistakes:
      "[Balance control] Stay centered through rotation. [Flip-scoop timing] Keep motions synchronized.",
    difficulty: "11",
    video_link: "https://www.youtube.com/watch?v=a2godYX0coU",
    alt_names: "Fakie Double 360 Flip",
  },
  {
    id: "nolliedoubletreflip",
    name: "Nollie Double Tre Flip",
    description:
      "A Double Tre Flip from nollie stance. Pop from the nose while combining a 360° rotation with two kickflips. Requires exceptional control to manage both the rotation and double flip from the nose.",
    common_mistakes:
      "[Nollie pop strength] Get enough height for full trick. [Forward lean] Maintain centered position.",
    difficulty: "11",
    video_link: "https://www.youtube.com/watch?v=CL-DLkbKZ_I",
    alt_names: "Nollie Double 360 Flip",
  },
  {
    id: "switchdoubletreflip",
    name: "Switch Double Tre Flip",
    description:
      "A Double Tre Flip performed in switch stance. Combines a switch 360° shuv-it with two kickflips. One of the most technically demanding tricks, requiring perfect control in switch stance.",
    common_mistakes:
      "[Switch control] Maintain form throughout trick. [Motion coordination] Keep all rotations synced.",
    difficulty: "11",
    video_link: "https://www.youtube.com/watch?v=tyA50mp9Q1A",
    alt_names: "Switch Double 360 Flip",
  },
  {
    id: "doublelaser",
    name: "Double Laser Flip",
    description:
      "A combination of a 360° frontside shuv-it and double heelflip. The board completes a full frontside 360° while performing two heelflips. Requires precise timing between the scoop and heel flicks.",
    common_mistakes:
      "[Rotation sync] Keep heelflips with board rotation. [Catch timing] Let full rotation complete.",
    difficulty: "11",
    video_link: "https://www.youtube.com/watch?v=RYkcXxmFHRY",
    alt_names: "Double 360 Heelflip",
  },
  //! FAKIE DOUBLE LASER FLIP WANTED
  {
    id: "fakiedoublelaser",
    name: "Fakie Double Laser Flip",
    description:
      "A Double Laser Flip performed in fakie stance. Combine a fakie frontside 360° shuv-it with two heelflips. The fakie stance assists the rotation but requires precise control of both flips.",
    common_mistakes:
      "[Weight distribution] Stay centered through trick. [Rotation control] Keep all motions coordinated.",
    difficulty: "11",
    video_link: "",
    alt_names: "Fakie Double 360 Heel",
  },
  //! NOLLIE DOUBLE LASER FLIP WANTED
  {
    id: "nolliedoublelaser",
    name: "Nollie Double Laser Flip",
    description:
      "A Double Laser Flip from nollie stance. Pop from the nose while combining a frontside 360° with two heelflips. Requires exceptional control to manage both the rotation and double flip from the nose.",
    common_mistakes:
      "[Nollie pop control] Get sufficient height. [Balance] Stay centered throughout.",
    difficulty: "11",
    video_link: "",
    alt_names: "Nollie Double 360 Heel",
  },
  //! SWITCH DOUBLE LASER FLIP WANTED
  {
    id: "switchdoublelaser",
    name: "Switch Double Laser Flip",
    description:
      "A Double Laser Flip performed in switch stance. Combines a switch frontside 360° shuv-it with two heelflips. One of the most technically demanding tricks, requiring perfect control of multiple rotations in switch.",
    common_mistakes:
      "[Switch stance stability] Maintain form throughout. [Motion timing] Keep rotations synchronized.",
    difficulty: "11",
    video_link: "",
    alt_names: "Switch Double 360 Heel",
  },
  {
    id: "hospitalflip",
    name: "Hospital Flip",
    description:
      "A unique flip trick where you initiate a kickflip but catch it with your back foot halfway through, then flip it back. Start like a kickflip, but as the board begins to flip, catch it with your back foot and guide it back to level with your front foot.",
    common_mistakes:
      "[Poor catch timing] Catch the half flip at the right moment. [Incomplete return] Guide the board back fully.",
    difficulty: "7",
    video_link: "https://www.youtube.com/watch?v=V6IbO1CnueM",
    alt_names: "Half Flip Back",
  },
  {
    id: "fakiehospitalflip",
    name: "Fakie Hospital Flip",
    description:
      "A Hospital Flip performed in fakie stance. The fakie stance can help with the initial pop but requires good timing on the catch and return. Maintain control through both phases of the trick.",
    common_mistakes:
      "[Balance control] Stay centered during catch. [Return control] Guide board back smoothly.",
    difficulty: "8",
    video_link: "https://www.youtube.com/watch?v=HqEkvYh44BM",
    alt_names: "Fakie Half Flip Back",
  },
  {
    id: "nolliehospitalflip",
    name: "Nollie Hospital Flip",
    description:
      "A Hospital Flip performed from nollie stance. Pop from the nose, catch the half flip with your back foot, and guide it back. Requires good nollie control and precise timing.",
    common_mistakes:
      "[Nollie pop control] Maintain proper pop from nose. [Timing] Coordinate catch and return.",
    difficulty: "8",
    video_link: "https://www.youtube.com/watch?v=49kGu0A20yg",
    alt_names: "Nollie Half Flip Back",
  },
  {
    id: "switchhospitalflip",
    name: "Switch Hospital Flip",
    description:
      "A Hospital Flip performed in switch stance. Requires good switch control for the initial flip and catch, plus precise timing for the return. Maintain switch form throughout both phases.",
    common_mistakes:
      "[Switch stance control] Keep proper form throughout. [Catch stability] Stay balanced during catch.",
    difficulty: "9",
    video_link: "https://www.youtube.com/watch?v=ij6uHUfsCt8",
    alt_names: "Switch Half Flip Back",
  },
  {
    id: "impossible",
    name: "Impossible",
    description:
      "A vertical 360° rotation where the board wraps around your back foot. Scoop straight down and back with your back foot while jumping, guiding the board in a vertical loop around your back foot. The board should complete a full wrap before leveling out.",
    common_mistakes:
      "[Poor scoop direction] Scoop straight down and back. [Lost wrap] Keep board close to back foot.",
    difficulty: "8",
    video_link: "https://www.youtube.com/watch?v=Fi7gPPN9zC8",
    alt_names: "360 Wrap",
  },
  {
    id: "fakieimpossible",
    name: "Fakie Impossible",
    description:
      "An Impossible performed in fakie stance. The fakie stance can help with the scoop motion but requires good balance through the wrap. Keep the board tight to your back foot throughout the rotation.",
    common_mistakes:
      "[Weight distribution] Stay centered during wrap. [Scoop control] Maintain vertical rotation.",
    difficulty: "9",
    video_link: "https://www.youtube.com/watch?v=ZNyBT31wecc",
    alt_names: "Fakie 360 Wrap",
  },
  {
    id: "nollieimpossible",
    name: "Nollie Impossible",
    description:
      "An Impossible performed from nollie stance. Pop from the nose while wrapping the board around your front foot. Requires excellent nollie control and precise guidance through the vertical rotation.",
    common_mistakes:
      "[Nollie pop stability] Maintain control from nose. [Wrap direction] Keep vertical rotation clean.",
    difficulty: "10",
    video_link: "https://www.youtube.com/watch?v=eYrWu3XsE5s",
    alt_names: "Nollie 360 Wrap",
  },
  {
    id: "switchimpossible",
    name: "Switch Impossible",
    description:
      "An Impossible performed in switch stance. Guide the board through a vertical wrap while riding switch. Requires exceptional control to maintain the proper scoop and wrap motion in switch stance.",
    common_mistakes:
      "[Switch stance balance] Keep proper form during wrap. [Rotation control] Maintain vertical rotation.",
    difficulty: "10",
    video_link: "https://www.youtube.com/watch?v=GrIgW3El5Sw",
    alt_names: "Switch 360 Wrap",
  },
  {
    id: "ghettobird",
    name: "Ghetto Bird",
    description:
      "A Hardflip followed by an immediate backside 180°. Perform the hardflip, then as soon as the board levels out, guide it through a backside 180°. Timing between the flip and rotation is crucial.",
    common_mistakes:
      "[Trick separation] Keep hardflip and 180 fluid. [Rotation timing] Start 180 as hardflip completes.",
    difficulty: "9",
    video_link: "https://www.youtube.com/watch?v=NJxHoTNF0OE",
    alt_names: "Hardflip Late BS 180",
  },
  {
    id: "fakieghettobird",
    name: "Fakie Ghetto Bird",
    description:
      "A Ghetto Bird performed in fakie stance. Combine a fakie hardflip with a quick backside 180°. The fakie stance adds complexity to both the flip and rotation portions.",
    common_mistakes:
      "[Balance control] Stay centered through both parts. [Rotation fluidity] Keep motions connected.",
    difficulty: "11",
    video_link: "https://www.youtube.com/watch?v=NJxHoTNF0OE",
    alt_names: "Fakie Hardflip Late BS 180",
  },
  {
    id: "nollieghettobird",
    name: "Nollie Ghetto Bird",
    description:
      "A Ghetto Bird performed from nollie stance. Execute a nollie hardflip followed by a backside 180°. Requires exceptional control to manage both tricks while popping from the nose.",
    common_mistakes:
      "[Nollie pop stability] Maintain control through both parts. [Timing] Keep transitions smooth.",
    difficulty: "11",
    video_link: "https://www.youtube.com/watch?v=uapeDcJV7Yc",
    alt_names: "Nollie Hardflip Late BS 180",
  },
  {
    id: "switchghettobird",
    name: "Switch Ghetto Bird",
    description:
      "A Ghetto Bird performed in switch stance. Combine a switch hardflip with a backside 180°. One of the most technically demanding variations, requiring perfect control in switch stance.",
    common_mistakes:
      "[Switch stance control] Maintain form throughout. [Trick flow] Keep both parts connected.",
    difficulty: "11",
    video_link: "https://www.youtube.com/watch?v=kJJxi8HeSDc",
    alt_names: "Switch Hardflip Late BS 180",
  },
  {
    id: "dolphinflip",
    name: "Dolphin Flip",
    description:
      "A forward-flipping variation where the board rotates forward vertically. Position your front foot in the pocket and back foot on the tail. Scoop forward while flicking up with your front foot to create a forward flip rotation.",
    common_mistakes:
      "[Poor scoop direction] Scoop forward not down. [Front foot control] Guide the flip forward.",
    difficulty: "9",
    video_link: "https://www.youtube.com/watch?v=uDeMN26XEOE",
    alt_names: "Forward Flip",
  },
  {
    id: "fakiedolphinflip",
    name: "Fakie Dolphin Flip",
    description:
      "A Dolphin Flip performed in fakie stance. The fakie stance changes the mechanics of the forward rotation but maintains the vertical flip. Requires precise control of both feet for proper rotation.",
    common_mistakes:
      "[Balance point] Stay centered during flip. [Rotation control] Keep flip vertical.",
    difficulty: "11",
    video_link: "https://www.youtube.com/watch?v=sJPJRtNKl54",
    alt_names: "Fakie Forward Flip",
  },
  {
    id: "nolliedolphinflip",
    name: "Nollie Dolphin Flip",
    description:
      "A Dolphin Flip performed from nollie stance. Pop from the nose while initiating a forward vertical rotation. The nollie stance significantly changes the flip mechanics but maintains the forward rotation.",
    common_mistakes:
      "[Nollie pop direction] Guide board forward correctly. [Forward lean] Stay balanced through flip.",
    difficulty: "11",
    video_link: "https://www.youtube.com/watch?v=zoHdmnlpktY",
    alt_names: "Nollie Forward Flip",
  },
  {
    id: "switchdolphinflip",
    name: "Switch Dolphin Flip",
    description:
      "A Dolphin Flip performed in switch stance. Execute the forward vertical rotation while riding switch. Requires exceptional control to maintain proper form and rotation in switch stance.",
    common_mistakes:
      "[Switch stance stability] Keep proper form through flip. [Flip control] Maintain vertical rotation.",
    difficulty: "11",
    video_link: "https://www.youtube.com/watch?v=G61pDp5r438",
    alt_names: "Switch Forward Flip",
  },
  {
    id: "lateflip",
    name: "Late Flip",
    description:
      "A regular ollie followed by a kickflip initiated at the peak of the ollie. Pop normally, then at the highest point, use your front foot to initiate a flip. Timing and foot placement are crucial.",
    common_mistakes:
      "[Poor timing] Flip at peak of ollie. [Foot position] Keep feet ready for flip.",
    difficulty: "10",
    video_link: "https://www.youtube.com/watch?v=POkzA67KubQ",
    alt_names: "Late Kickflip",
  },
  {
    id: "lateheel",
    name: "Late Heelflip",
    description:
      "An ollie followed by a heelflip initiated at the peak. Pop the ollie normally, then use your heel to flick the board at the highest point. Requires precise timing and foot control.",
    common_mistakes:
      "[Timing] Wait for peak of ollie. [Flick control] Keep heelflip controlled.",
    difficulty: "10",
    video_link: "https://www.youtube.com/watch?v=76CwunxL1xI",
    alt_names: "Late Heel",
  },
  {
    id: "latebsshuv",
    name: "Late Backside Shuvit",
    description:
      "An ollie followed by a backside shuvit at the peak. Pop normally, then at the highest point, use your back foot to initiate a backside rotation. Focus on keeping the board level during the late rotation.",
    common_mistakes:
      "[Rotation control] Keep shuv level. [Timing] Execute at ollie peak.",
    difficulty: "8",
    video_link: "https://www.youtube.com/watch?v=J3AWEoYXTKw",
    alt_names: "Late BS Shuv",
  },
  {
    id: "latefsshuv",
    name: "Late Frontside Shuvit",
    description:
      "An ollie followed by a frontside shuvit at the peak. Pop the ollie, then use your back foot to scoop frontside at the highest point. Maintain board control through the late rotation.",
    common_mistakes:
      "[Scoop direction] Guide frontside properly. [Board control] Keep board under you.",
    difficulty: "8",
    video_link: "https://www.youtube.com/watch?v=mo-H3awspaw",
    alt_names: "Late FS Shuv",
  },
  {
    id: "nightmareflip",
    name: "Nightmare Flip",
    description:
      "A Varial Kickflip that flips twice (Varial Double Flip). Combine the rotation of a varial with two kickflips. Position your front foot like a kickflip but angled for extra flip rotation, and your back foot in scooping position. Pop while simultaneously scooping backside and flicking hard enough for two full flips.",
    common_mistakes:
      "[Poor scoop timing] The scoop and double flip need to stay synchronized. [Insufficient flick] Make sure to flick hard enough for two full rotations. [Catching early] Let both flips complete before catching.",
    difficulty: "11",
    video_link: "https://www.youtube.com/watch?v=_GjYnVc_XHY",
    alt_names: "Varial Double Flip, BS 180 Double Flip",
  },
  {
    id: "fakienightmareflip",
    name: "Fakie Nightmare Flip",
    description:
      "A Nightmare Flip performed in fakie stance. Combine a fakie backside 180° rotation with two kickflips. The fakie stance helps with the scoop but requires precise control to maintain both flips during the rotation. Keep your weight centered throughout the trick.",
    common_mistakes:
      "[Weight distribution] Stay centered despite fakie stance. [Rotation control] Keep both flips consistent during rotation. [Poor timing] Let both flips complete before catching.",
    difficulty: "11",
    video_link: "https://www.youtube.com/watch?v=fahWL9YIaWU",
    alt_names: "Fakie Varial Double Flip, Fakie BS 180 Double Flip",
  },
  {
    id: "nollienightmareflip",
    name: "Nollie Nightmare Flip",
    description:
      "A Nightmare Flip performed from nollie stance. Pop from the nose while combining a backside 180° rotation with two kickflips. The nollie stance adds complexity as you'll need to maintain both flips while managing the rotation from the nose.",
    common_mistakes:
      "[Nollie pop control] Get sufficient height for both flips. [Forward lean] Stay centered throughout the trick. [Flip consistency] Keep both flips clean during rotation.",
    difficulty: "11",
    video_link: "https://www.youtube.com/watch?v=turKCHMeYZs",
    alt_names: "Nollie Varial Double Flip, Nollie BS 180 Double Flip",
  },
  {
    id: "switchnightmareflip",
    name: "Switch Nightmare Flip",
    description:
      "A Nightmare Flip performed in switch stance. Combines a switch backside 180° rotation with two kickflips. One of the most technically demanding variations, requiring perfect control of multiple rotations while riding switch.",
    common_mistakes:
      "[Switch stance stability] Maintain proper form throughout. [Rotation sync] Keep flips coordinated with the rotation. [Poor scoop] Maintain clean scoop despite switch stance.",
    difficulty: "11",
    video_link: "https://www.youtube.com/watch?v=gwCxPZsxXWg",
    alt_names: "Switch Varial Double Flip, Switch BS 180 Double Flip",
  },
  {
    id: "daydreamflip",
    name: "Daydream Flip",
    description:
      "A Varial Heelflip that flips twice (Varial Double Heelflip). Combine a frontside 180° rotation with two heelflips. Position your front foot for a strong heel flick and your back foot ready to scoop frontside. Pop while simultaneously scooping frontside and flicking for two full heelflips.",
    common_mistakes:
      "[Flick power] Ensure sufficient flick for both rotations. [Poor scoop direction] Maintain frontside scoop throughout. [Early catch] Wait for both flips to complete.",
    difficulty: "11",
    video_link: "https://www.youtube.com/watch?v=t6X9M6Ns2Yk",
    alt_names: "Varial Double Heelflip, FS 180 Double Heel",
  },
  //! FAKIE DAYDREAM FLIP WANTED
  {
    id: "fakiedaydreamflip",
    name: "Fakie Daydream Flip",
    description:
      "A Daydream Flip performed in fakie stance. Combine a fakie frontside 180° rotation with two heelflips. The fakie stance assists with the scoop but requires precise control to maintain both heelflips during the rotation.",
    common_mistakes:
      "[Balance control] Stay centered through both flips. [Rotation timing] Keep heelflips synchronized with rotation. [Poor catch] Let both flips complete before catching.",
    difficulty: "11",
    video_link: "",
    alt_names: "Fakie Varial Double Heelflip, Fakie FS 180 Double Heel",
  },
  //! NOLLIE DAYDREAM FLIP WANTED
  {
    id: "nolliedaydreamflip",
    name: "Nollie Daydream Flip",
    description:
      "A Daydream Flip performed from nollie stance. Pop from the nose while combining a frontside 180° rotation with two heelflips. The nollie stance significantly changes the mechanics, requiring exceptional control of both the rotation and double flip.",
    common_mistakes:
      "[Nollie pop strength] Get enough height for full rotation. [Forward lean] Maintain centered position throughout. [Flip control] Keep both heelflips consistent.",
    difficulty: "11",
    video_link: "",
    alt_names: "Nollie Varial Double Heelflip, Nollie FS 180 Double Heel",
  },
  //! SWITCH DAYDREAM FLIP WANTED
  {
    id: "switchdaydreamflip",
    name: "Switch Daydream Flip",
    description:
      "A Daydream Flip performed in switch stance. Combines a switch frontside 180° rotation with two heelflips. One of the most technically challenging variations, requiring perfect control of both the rotation and double flip while riding switch.",
    common_mistakes:
      "[Switch stance control] Maintain proper form throughout. [Motion coordination] Keep all rotations synchronized. [Poor flick] Ensure consistent heelflips despite switch stance.",
    difficulty: "11",
    video_link: "",
    alt_names: "Switch Varial Double Heelflip, Switch FS 180 Double Heel",
  },
  //! ALL MYSTIC SPINS WANTED
  {
    id: "bsmysticspin",
    name: "Backside Mystic Spin",
    description:
      "A backside shuvit combined with a frontside body varial. Start like a BS 180 shuvit, but as the board rotates backside, rotate your body frontside 180°. The opposing rotations create a unique motion where the board goes one way and your body the other. The key is keeping track of the board during the contrasting rotations.",
    common_mistakes:
      "[Body rotation timing] Start the frontside body rotation after initiating the backside shuvit. [Lost board control] Keep eyes on the board during opposite rotations. [Poor landing balance] Prepare for the reversed stance landing.",
    difficulty: "7",
    video_link: "",
    alt_names: "BS Shuvit FS Body Varial, Anti-Spin",
  },
  {
    id: "fsmysticspin",
    name: "Frontside Mystic Spin",
    description:
      "A frontside shuvit combined with a backside body varial. Initiate a FS 180 shuvit, but as the board rotates frontside, rotate your body backside 180°. The opposing rotations require good spatial awareness to track the board's position. Focus on keeping the rotations clean and separate.",
    common_mistakes:
      "[Rotation confusion] Keep the FS shuvit and BS body varial distinct. [Board tracking] Maintain visual contact with board throughout. [Landing preparation] Ready yourself for the reversed stance.",
    difficulty: "7",
    video_link: "",
    alt_names: "FS Shuvit BS Body Varial",
  },
  {
    id: "fakiebsmysticspin",
    name: "Fakie Backside Mystic Spin",
    description:
      "A fakie backside shuvit combined with a frontside body varial. While riding fakie, initiate a BS shuvit, then rotate your body frontside 180°. The fakie stance adds complexity to the opposing rotations, but can help with the scoop motion. Maintain awareness of your landing position.",
    common_mistakes:
      "[Balance point] Stay centered despite fakie stance. [Rotation separation] Keep shuvit and body varial distinct. [Landing stance] Prepare for the switch landing position.",
    difficulty: "8",
    video_link: "",
    alt_names: "Fakie BS Shuvit FS Body Varial",
  },
  {
    id: "fakiefsmysticspin",
    name: "Fakie Frontside Mystic Spin",
    description:
      "A fakie frontside shuvit with a backside body varial. While in fakie, perform a FS shuvit while rotating your body backside 180°. The fakie stance changes the feel of both rotations but maintains the opposing motion principle. Focus on clean rotation timing.",
    common_mistakes:
      "[Weight distribution] Maintain center of gravity during rotations. [Visual tracking] Keep eyes on board through opposite spins. [Landing control] Be ready for the switch stance landing.",
    difficulty: "8",
    video_link: "",
    alt_names: "Fakie FS Shuvit BS Body Varial",
  },
  {
    id: "nolliebsmysticspin",
    name: "Nollie Backside Mystic Spin",
    description:
      "A nollie backside shuvit combined with a frontside body varial. Pop from the nose while performing a BS shuvit, then rotate your body frontside 180°. The nollie stance significantly changes the mechanics of both rotations. Maintain good control of the nose pop throughout.",
    common_mistakes:
      "[Nollie pop control] Get proper height from nose. [Rotation timing] Start body rotation after solid shuvit. [Forward lean] Stay centered despite nollie position.",
    difficulty: "8",
    video_link: "",
    alt_names: "Nollie BS Shuvit FS Body Varial",
  },
  {
    id: "nolliefsmysticspin",
    name: "Nollie Frontside Mystic Spin",
    description:
      "A nollie frontside shuvit with a backside body varial. Pop from the nose while performing a FS shuvit, then rotate your body backside 180°. The nollie stance requires excellent control of both the pop and opposing rotations. Keep the movements fluid but distinct.",
    common_mistakes:
      "[Pop direction] Maintain proper nollie pop. [Rotation clarity] Keep shuvit and body varial separate. [Landing position] Prepare for the switch landing.",
    difficulty: "8",
    video_link: "",
    alt_names: "Nollie FS Shuvit BS Body Varial",
  },
  {
    id: "switchbsmysticspin",
    name: "Switch Backside Mystic Spin",
    description:
      "A switch backside shuvit combined with a frontside body varial. While riding switch, perform a BS shuvit while rotating your body frontside 180°. The switch stance adds significant complexity to both the shuvit and body varial. Focus on maintaining proper form throughout.",
    common_mistakes:
      "[Switch stance control] Maintain form during rotations. [Board awareness] Track board through opposite spins. [Landing preparation] Ready for regular stance landing.",
    difficulty: "9",
    video_link: "",
    alt_names: "Switch BS Shuvit FS Body Varial",
  },
  {
    id: "switchfsmysticspin",
    name: "Switch Frontside Mystic Spin",
    description:
      "A switch frontside shuvit with a backside body varial. While riding switch, execute a FS shuvit while rotating your body backside 180°. One of the more challenging variations, requiring excellent switch control and spatial awareness for the opposing rotations.",
    common_mistakes:
      "[Switch stability] Keep proper form throughout trick. [Rotation control] Maintain clean, opposite rotations. [Landing stance] Prepare for regular stance landing.",
    difficulty: "9",
    video_link: "",
    alt_names: "Switch FS Shuvit BS Body Varial",
  },
  {
    id: "switchfsbigspin",
    name: "Switch Frontside Bigspin",
    description:
      "A frontside Bigspin performed in switch stance. Combine a switch frontside 360° board rotation with a frontside 180° body rotation. Start with your feet in switch stance, wind up in the direction of spin, then scoop the tail frontside while initiating your body rotation.",
    common_mistakes:
      "[Poor scoop direction] Ensure a clean frontside scoop despite the switch stance. [Rotation timing] Keep your body rotation in sync with the board's rotation.",
    difficulty: "9",
    video_link: "https://www.youtube.com/watch?v=MGrgaYxsQ9Y&",
    alt_names: "Switch Front Bigspin, Switch FS Big Spin",
  },
  {
    id: "switchbigspin",
    name: "Switch Backside Bigspin",
    description:
      "A backside Bigspin performed in switch stance. Combine a switch backside 360° board rotation with a backside 180° body rotation. Set up in switch stance with your feet positioned for a backside scoop. Wind up opposite to the spin direction, then pop while scooping backside and rotating your body.",
    common_mistakes:
      "[Scoop power] Get enough rotation for the full 360° despite being switch. [Board tracking] Keep the board under you during both rotations.",
    difficulty: "9",
    video_link: "https://www.youtube.com/watch?v=R84dTWmZKFM",
    alt_names: "Switch Back Bigspin, Switch BS Big Spin",
  },
];
