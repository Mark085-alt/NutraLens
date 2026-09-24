import { Image, StyleSheet, View } from "react-native";

interface NutraLogoProps {
  size?: number;
}

export function NutraLogo({ size = 36 }: NutraLogoProps) {
  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: Math.round(size * 0.26),
        },
      ]}
    >
      <Image
        source={require("@/design/stitch_nutralens_mobile_app_ui/nutralens_logo/screen.png")}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
