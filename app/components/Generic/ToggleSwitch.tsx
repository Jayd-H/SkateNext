import React from "react";
import { Pressable, View, Text } from "react-native";

interface ToggleSwitchProps {
  isEnabled: boolean;
  onToggle: () => void;
  topText: string;
  bottomText: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  isEnabled,
  onToggle,
  topText,
  bottomText,
}) => {
  return (
    <View className="w-full mb-4">
      <View className="relative">
        <View
          className={`
            absolute 
            top-1
            left-0
            right-0
            h-full
            rounded-3xl
            ${isEnabled ? "bg-accent-dark" : "bg-accent-surface"}
          `}
        />
        <Pressable
          onPress={onToggle}
          className={`
            relative
            rounded-3xl
            w-full
            border-2
            ${isEnabled ? "border-accent" : "border-accent-dark"}
            ${isEnabled ? "bg-accent-surface" : "bg-bg-surface"}
            active:translate-y-1
            px-6
            py-4
          `}
        >
          <View className="flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-text font-montserrat-alt text-sm">
                {topText}
              </Text>
              <Text className="text-text-dim font-montserrat-light text-xs mt-1">
                {bottomText}
              </Text>
            </View>
            <View
              className={`
                w-12 
                h-12 
                rounded-2xl 
                border-2
                items-center 
                justify-center
                ${
                  isEnabled
                    ? "border-accent bg-accent-surface"
                    : "border-accent-dark bg-bg-surface"
                }
              `}
            >
              <View
                className={`
                  w-6 
                  h-6 
                  rounded-xl
                  border-2
                  ${
                    isEnabled
                      ? "border-accent bg-accent"
                      : "border-accent-dark bg-bg-elevated"
                  }
                `}
              />
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default ToggleSwitch;
