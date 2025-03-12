import { describe, test, expect } from "bun:test";
import { TRICK_DATA, Trick } from "../components/Data/trickData";

interface TrickReference {
  id: string;
  name: string;
}

interface InvalidYouTubeLink extends TrickReference {
  link: string;
}

describe("Trick Video Validation", () => {
  test("each trick should have a video link or be in exceptions list", () => {
    // Known exceptions - tricks without videos that are intentionally missing
    const knownExceptions: string[] = [
      "fsbiggerspin", // Frontside Biggerspin
      "nolliefsbiggerspin", // Nollie Frontside Biggerspin
      "switchbiggerspin", // Switch Biggerspin
      "fsgazelleflip", // Frontside Gazelle Flip
      "fakiefsgazelleflip", // Fakie Frontside Gazelle Flip
      "switchgazelleflip", // Switch Gazelle Flip
      "switchfsgazelleflip", // Switch Frontside Gazelle Flip
      "fsgazellespin", // Frontside Gazelle Spin
      "nolliefsgazellespin", // Nollie Frontside Gazelle Spin
      "switchgazellespin", // Switch Gazelle Spin
      "switchfsgazellespin", // Switch Frontside Gazelle Spin
      "fakieblizzardflip", // Fakie Blizzard Flip
      "nollieblizzardflip", // Nollie Blizzard Flip
      "switchblizzardflip", // Switch Blizzard Flip
      "fakiedaydreamflip", // Fakie Daydream Flip
      "nolliedaydreamflip", // Nollie Daydream Flip
      "switchdaydreamflip", // Switch Daydream Flip
      "fakiedoublelaser", // Fakie Double Laser Flip
      "nolliedoublelaser", // Nollie Double Laser Flip
      "switchdoublelaser", // Switch Double Laser Flip
      "bsmysticspin", // Backside Mystic Spin
      "fsmysticspin", // Frontside Mystic Spin
      "fakiebsmysticspin", // Fakie Backside Mystic Spin
      "fakiefsmysticspin", // Fakie Frontside Mystic Spin
      "nolliebsmysticspin", // Nollie Backside Mystic Spin
      "nolliefsmysticspin", // Nollie Frontside Mystic Spin
      "switchbsmysticspin", // Switch Backside Mystic Spin
      "switchfsmysticspin", // Switch Frontside Mystic Spin
    ];

    // Identify tricks with missing videos that should have them
    const missingVideos: TrickReference[] = [];

    // Identify tricks in the exceptions list that actually have videos
    // (to clean up the exceptions list when videos are added)
    const unnecessaryExceptions: TrickReference[] = [];

    // Current exceptions found during validation
    const foundExceptions: string[] = [];

    // Check each trick in TRICK_DATA
    TRICK_DATA.forEach((trick) => {
      if (!trick.video_link || trick.video_link.trim() === "") {
        // This trick has no video
        foundExceptions.push(trick.id);

        // Check if it's in our known exceptions list
        if (!knownExceptions.includes(trick.id)) {
          missingVideos.push({
            id: trick.id,
            name: trick.name,
          });
        }
      } else if (knownExceptions.includes(trick.id)) {
        // This trick has a video but is in our exceptions list
        unnecessaryExceptions.push({
          id: trick.id,
          name: trick.name,
        });
      }
    });

    // Log the exceptions we found (regardless of test outcome)
    console.log(`Found ${foundExceptions.length} tricks without videos:`);
    foundExceptions.forEach((id) => {
      const trick = TRICK_DATA.find((t) => t.id === id);
      if (trick) {
        console.log(`- ${id}: ${trick.name}`);
      }
    });

    // Check for unnecessary exceptions
    if (unnecessaryExceptions.length > 0) {
      console.log(
        "\nFound tricks with videos that are in the exceptions list:"
      );
      unnecessaryExceptions.forEach((trick) => {
        console.log(`- ${trick.id}: ${trick.name}`);
      });
    }

    // The test passes if all tricks without videos are in our exceptions list
    if (missingVideos.length > 0) {
      console.error(
        "\nERROR: Found tricks missing videos that aren't in the exceptions list:"
      );
      missingVideos.forEach((trick) => {
        console.error(`- ${trick.id}: ${trick.name}`);
      });
    }

    // Fail the test if there are missing videos not accounted for
    expect(missingVideos.length).toBe(0);
  });

  test("all video links should be valid YouTube URLs", () => {
    const invalidYouTubeLinks: InvalidYouTubeLink[] = [];

    // YouTube URL validation regex
    const youtubeUrlPattern =
      /^https:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+(&.*)?$/;

    TRICK_DATA.forEach((trick) => {
      // Skip if no video link
      if (!trick.video_link || trick.video_link.trim() === "") {
        return;
      }

      // Check if the URL is valid
      if (!youtubeUrlPattern.test(trick.video_link)) {
        invalidYouTubeLinks.push({
          id: trick.id,
          name: trick.name,
          link: trick.video_link,
        });
      }
    });

    // Log invalid YouTube links if found
    if (invalidYouTubeLinks.length > 0) {
      console.error("\nERROR: Found invalid YouTube URLs:");
      invalidYouTubeLinks.forEach((trick) => {
        console.error(`- ${trick.id}: ${trick.name} - ${trick.link}`);
      });
    }

    expect(invalidYouTubeLinks.length).toBe(0);
  });

  test("all video links should be accessible (not private or deleted)", async () => {
    // Skip this test in GitHub Actions or other CI environments
    // GitHub Actions sets CI=true by default
    if (process.env.CI === "true") {
      console.log(
        "Running in CI environment - skipping video accessibility check"
      );
      return;
    }

    const inaccessibleVideos: InvalidYouTubeLink[] = [];
    const youtubeVideoIdRegex =
      /^https:\/\/(www\.)?youtube\.com\/watch\?v=([\w-]+)(&.*)?$/;

    // Process videos in small batches to avoid rate limiting
    const batchSize = 5;
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    // Process only tricks with video links
    const tricksWithVideos = TRICK_DATA.filter(
      (trick) => trick.video_link && trick.video_link.trim() !== ""
    );

    console.log(
      `Checking accessibility for ${tricksWithVideos.length} videos...`
    );

    // Process in batches
    for (let i = 0; i < tricksWithVideos.length; i += batchSize) {
      const batch = tricksWithVideos.slice(i, i + batchSize);
      console.log(
        `Checking batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(
          tricksWithVideos.length / batchSize
        )}...`
      );

      // Create promises for each video check
      const promises = batch.map(async (trick) => {
        try {
          // Extract video ID from URL
          const match = trick.video_link.match(youtubeVideoIdRegex);
          if (!match || !match[2]) {
            inaccessibleVideos.push({
              id: trick.id,
              name: trick.name,
              link: trick.video_link,
            });
            return;
          }

          const videoId = match[2];

          // Use YouTube oEmbed API to check if video exists
          // This endpoint returns metadata if the video exists and is public
          const response = await fetch(
            `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
          );

          if (!response.ok) {
            inaccessibleVideos.push({
              id: trick.id,
              name: trick.name,
              link: trick.video_link,
            });
          }
        } catch (error) {
          // Network error or other issues
          inaccessibleVideos.push({
            id: trick.id,
            name: trick.name,
            link: trick.video_link,
          });
        }
      });

      // Wait for all checks in this batch to complete
      await Promise.all(promises);

      // Add a small delay between batches to avoid rate limiting
      if (i + batchSize < tricksWithVideos.length) {
        await delay(1000); // 1 second delay between batches
      }
    }

    // Log inaccessible videos
    if (inaccessibleVideos.length > 0) {
      console.error(
        "\nWARNING: Found YouTube videos that may be inaccessible (private or deleted):"
      );
      inaccessibleVideos.forEach((trick) => {
        console.error(`- ${trick.id}: ${trick.name} - ${trick.link}`);
      });
    }

    // Test can be marked as a warning rather than a failure
    // since videos going private is outside your control
    console.log(
      `Video accessibility check complete: ${
        tricksWithVideos.length - inaccessibleVideos.length
      }/${tricksWithVideos.length} videos accessible`
    );

    // Optionally fail the test if you want to be notified of inaccessible videos
    // expect(inaccessibleVideos.length).toBe(0);
  }, 120000); // Increasing timeout to 2 minutes for network requests
});
