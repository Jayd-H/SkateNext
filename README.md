# SkateNext

SkateNext is a React-Native mobile app designed to gamify the process of learning and progressing in skateboarding. Allowing users to easily log tricks, visualise their progress, and track burnt calories, the app aims to motivate skateboarders of all levels to push their limits and maintain consistent practice.

## Features

### Trick Progression Map
Interactive visualization of skateboarding tricks organized by difficulty and prerequisites. Users can track their progress, mark tricks as completed, and see clear pathways for progression.

### Smart Trick Recommendations
Advanced recommendation system that suggests new tricks based on multiple factors including safety, progression potential, and current skill level. The algorithm considers trick complexity, prerequisite mastery, stance familiarity, and risk factors to provide personalized learning paths.

### Session Tracking & Calorie Estimation
Track skating sessions with an integrated timer that estimates calories burned based on session duration and the complexity of tricks in your repertoire. View detailed statistics about your skating progress and physical activity.

### Comprehensive Trick Library
Each trick includes detailed descriptions, common mistakes to avoid, and tutorial videos to help users learn proper technique and understand the mechanics involved.

## Prerequisites
- Bun
- Expo CLI
- Expo Go app on your mobile device or an Android/IOS Emulator

**Note:** This project is primarily being developed for Android platforms. IOS **will** be unstable.

## Installation
1. Clone the repository:
```bash
git clone https://github.com/Jayd-H/SkateNext
```

2. Navigate to the project directory:
```bash
cd SkateNext
```

3. Install dependencies using Bun:
```bash
bun install
```

4. Start the Expo development server:
```bash
bun run expo start
```

5. Use the Expo Go app on your device to scan the QR code from the terminal, or run on an emulator using the appropriate command (e.g., 'a' for Android, 'i' for iOS) in the terminal.

## Known Issues
- **Calorie Estimation Accuracy**: Current calorie calculations are approximations based on session duration and trick difficulty. Individual results may vary based on actual intensity and execution.
- **Trick Recommendations**: The recommendation algorithm is being fine-tuned and may occasionally suggest tricks that aren't perfectly aligned with user skill level.
- **Tutorial Videos**: Some tricks in the database currently lack tutorial videos. These will be added in future updates.
- **iOS Compatibility**: The app is primarily tested on Android and may have stability issues on iOS devices.

## Acknowledgements
- This project was developed as part of an Honours Stage Project
- Icons from https://game-icons.net/
- Fonts (Montserrat & Montserrat Alternatives) from https://fonts.google.com/
- Tutorial videos from the YouTube skate scene (I need to update this with a list of each one individually for credits)
