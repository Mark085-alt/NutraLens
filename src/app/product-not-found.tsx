import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { NutraColors, Spacing, Typography } from "@/constants/theme";

export default function ProductNotFoundScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.eyebrow}>No matching product</Text>
          <Text style={styles.title}>
            This barcode isn’t in the database yet.
          </Text>
          <Text style={styles.body}>
            Open Food Facts does not currently have a product for this code.
          </Text>

          <Pressable
            onPress={() => router.replace("/scanner")}
            style={styles.primaryAction}
            accessibilityRole="button"
            accessibilityLabel="Try scanning again"
          >
            <Text style={styles.primaryActionText}>Scan another product</Text>
          </Pressable>

          <Pressable
            onPress={() => router.replace("/")}
            style={styles.secondaryAction}
            accessibilityRole="button"
            accessibilityLabel="Return home"
          >
            <Text style={styles.secondaryActionText}>Back to home</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: NutraColors.background,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: Spacing.md,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: NutraColors.border,
    padding: Spacing.lg,
  },
  eyebrow: {
    ...Typography.labelLg,
    color: NutraColors.primary,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  title: {
    ...Typography.headlineMd,
    color: NutraColors.textPrimary,
    marginTop: Spacing.sm,
  },
  body: {
    ...Typography.bodyMd,
    color: NutraColors.textSecondary,
    marginTop: Spacing.sm,
    marginBottom: Spacing.md,
  },
  primaryAction: {
    backgroundColor: NutraColors.primary,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  primaryActionText: {
    ...Typography.titleSm,
    color: "#FFFFFF",
    fontWeight: "700",
  },
  secondaryAction: {
    marginTop: Spacing.md,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: NutraColors.surfaceContainer,
    alignItems: "center",
  },
  secondaryActionText: {
    ...Typography.titleSm,
    color: NutraColors.textPrimary,
    fontWeight: "700",
  },
});
