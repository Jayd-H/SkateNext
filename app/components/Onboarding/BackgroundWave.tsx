import React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

interface BackgroundWaveProps {
  variant?: "age" | "weight";
}

//* got a lot of help from chatgpt for this one i wont even lie

const BackgroundWave: React.FC<BackgroundWaveProps> = ({ variant = "age" }) => {
  if (variant === "age") {
    return (
      <View className="absolute top-0 right-0 w-full h-full overflow-hidden">
        <Svg
          width="100%"
          height="100%"
          viewBox="0 0 375 812"
          preserveAspectRatio="xMinYMin slice"
        >
          <Path
            d="M375,-50 
            C340,0 350,100 320,200
            C290,300 310,400 280,500
            C250,600 270,700 240,812
            L375,812 L375,-50 Z"
            fill="#1B2524"
            opacity="0.5"
          />
        </Svg>
      </View>
    );
  }

  return (
    <View className="absolute top-0 left-0 w-full h-full overflow-hidden">
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 375 812"
        preserveAspectRatio="xMinYMin slice"
      >
        <Path
          d="M0,-50 
          C100,0 50,100 150,200
          C250,300 200,400 300,500
          C400,600 350,700 450,812
          L0,812 L0,-50 Z"
          fill="#1B2524"
          opacity="0.5"
        />
        <Path
          d="M375,-50 
          C275,0 325,100 225,200
          C125,300 175,400 75,500
          C-25,600 25,700 -75,812
          L375,812 L375,-50 Z"
          fill="#1B2524"
          opacity="0.3"
        />
      </Svg>
    </View>
  );
};

export default BackgroundWave;
