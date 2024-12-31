import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { BlurView } from "expo-blur";
import WebView from "react-native-webview";
import { useHaptics } from "../../Utils/useHaptics";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
} from "react-native-reanimated";

interface VideoModalProps {
  isVisible: boolean;
  onClose: () => void;
  videoUrl: string;
}

const VideoModal: React.FC<VideoModalProps> = ({
  isVisible,
  onClose,
  videoUrl,
}) => {
  const [isError, setIsError] = useState(false);
  const [channelName, setChannelName] = useState<string | null>(null);
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const { triggerHaptic } = useHaptics();

  useEffect(() => {
    if (isVisible) {
      opacity.value = withTiming(1, {
        duration: 150,
        easing: Easing.bezier(0.2, 0, 0, 1),
      });
      scale.value = withSpring(1, {
        damping: 20,
        stiffness: 300,
        mass: 0.5,
      });

      fetchChannelInfo();
    } else {
      opacity.value = withTiming(0, {
        duration: 150,
      });
      scale.value = withTiming(0, {
        duration: 150,
      });
    }
  }, [isVisible]);

  const fetchChannelInfo = async () => {
    try {
      const videoId = getVideoId(videoUrl);
      if (videoId) {
        const response = await fetch(
          `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
        );
        const data = await response.json();
        setChannelName(data.author_name);
      }
    } catch (error) {
      console.warn("Could not fetch channel info:", error);
    }
  };

  const animatedModalStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: scale.value,
  }));

  const animatedBackdropStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  if (!isVisible) return null;

  const handleClose = async () => {
    triggerHaptic("light");
    onClose();
  };

  const getVideoId = (url: string) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&\n?\s]{11})/
    );
    return match?.[1] || null;
  };

  const getEmbedUrl = (url: string) => {
    const videoId = getVideoId(url);
    if (!videoId) return null;

    const muteParam = Platform.OS === "ios" ? "&mute=1" : "";
    return `https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1&playsinline=1&modestbranding=1&rel=0&showinfo=0${muteParam}`;
  };

  const getDimensions = () => {
    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;
    const maxHeight = screenHeight * 0.7;
    const heightBasedWidth = maxHeight * (16 / 9);
    const maxWidth = screenWidth * 0.95;
    const finalWidth = Math.min(maxWidth, heightBasedWidth);
    const finalHeight = finalWidth * 0.5625;

    return {
      width: finalWidth,
      height: finalHeight,
      top: (screenHeight - finalHeight) / 2,
      left: (screenWidth - finalWidth) / 2,
    };
  };

  const dimensions = getDimensions();

  const containerStyle = {
    position: "absolute" as const,
    width: dimensions.width,
    top: dimensions.top,
    left: dimensions.left,
  };

  const ErrorView = () => (
    <View
      style={{ height: dimensions.height }}
      className="bg-background items-center justify-center"
    >
      <Text className="text-text font-montserrat-alt text-base text-center">
        Video not available
      </Text>
    </View>
  );

  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      <Animated.View
        style={[
          {
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          },
          animatedBackdropStyle,
        ]}
      >
        <BlurView intensity={90} tint="dark" style={{ flex: 1 }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={handleClose}
            style={{ flex: 1 }}
          />
        </BlurView>
      </Animated.View>

      <Animated.View style={[containerStyle, animatedModalStyle]}>
        <View className="bg-bg-card rounded-3xl border border-accent-dark overflow-hidden">
          <View className="w-12 h-1 bg-accent-muted rounded-full self-center my-4" />

          <View className="bg-bg-elevated mx-3 rounded-2xl overflow-hidden">
            {!embedUrl || isError ? (
              <ErrorView />
            ) : (
              <WebView
                source={{
                  uri: embedUrl,
                  headers: {
                    Accept: "text/html",
                    "Content-Type": "text/html",
                  },
                }}
                allowsFullscreenVideo
                allowsInlineMediaPlayback
                mediaPlaybackRequiresUserAction={false}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                onError={() => setIsError(true)}
                onHttpError={() => setIsError(true)}
                style={{
                  height: dimensions.height + 4,
                  marginTop: -9,
                  marginBottom: -9,
                  width: "100%",
                  backgroundColor: "#000",
                }}
              />
            )}
          </View>

          {channelName && (
            <View className="px-3 my-4">
              <Text className="text-text-dim font-montserrat-medium text-sm text-center">
                credit: {channelName}
              </Text>
            </View>
          )}
        </View>
      </Animated.View>
    </View>
  );
};

export default VideoModal;
