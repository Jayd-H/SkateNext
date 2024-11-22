import React from "react";
import { Pressable, Text, View } from "react-native";

interface ActHeaderButtonProps {
  topText: string;
  bottomText: string;
  onPress?: () => void;
}

export const ActHeaderButton: React.FC<ActHeaderButtonProps> = ({
  topText,
  bottomText,
  onPress,
}) => {
  return (
    <View className="relative flex items-center">
      {/* bottom */}
      <View
        className={`
          absolute 
          top-1
          w-[90%] h-[60px] 
          rounded-2xl
          bg-accent-dark
        `}
      />

      {/* top */}
      <Pressable
        onPress={onPress}
        className={`
          absolute 
          top-0
          w-[90%] h-[60px] 
          rounded-2xl
          border-2
          border-accent-muted
          bg-accent-surface
          active:translate-y-1
          px-6
          py-4
        `}
      >
        <View className="flex-col justify-between h-full">
          <Text className="text-text-dim font-montserrat-alt-bold text-xs tracking-[4px] -mt-2 uppercase">
            {topText}
          </Text>
          <Text className="text-text-muted font-montserrat-alt-semibold tracking-wide text-sm">
            {bottomText}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};
