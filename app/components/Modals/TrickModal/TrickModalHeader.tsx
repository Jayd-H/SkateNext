import { View, TouchableOpacity } from "react-native";
import { SharedValue } from "react-native-reanimated";
import ChevronRight from "../../../../assets/icons/chevron-right.svg";
import VHS from "../../../../assets/icons/vhs.svg";
import { HeaderProps } from "./types";
import { ModalTheme } from "./useModalTheme";

interface ExtendedHeaderProps extends HeaderProps {
  theme: ModalTheme;
  waveValues: SharedValue<number>[];
}

const TrickModalHeader: React.FC<ExtendedHeaderProps> = ({
  onClose,
  onVHSPress,
  isConnected,
  videoLink,
  theme,
  waveValues,
}) => {
  return (
    <View className="flex-row justify-between items-center mb-6">
      <TouchableOpacity
        onPress={onClose}
        className="bg-bg-elevated p-3 rounded-2xl z-10"
      >
        <ChevronRight
          width={24}
          height={24}
          style={{ transform: [{ rotate: "180deg" }] }}
          fill={theme.accentColor}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onVHSPress}
        disabled={!isConnected || videoLink === ""}
        className={`bg-bg-elevated border-2 ${
          isConnected && videoLink !== ""
            ? "border-accent-bright"
            : "border-text-dim"
        } rounded-2xl p-3 z-10`}
      >
        <VHS
          width={24}
          height={24}
          fill={isConnected && videoLink !== "" ? theme.accentColor : "#7A9E9B"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TrickModalHeader;
