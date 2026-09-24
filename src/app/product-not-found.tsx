import * as Clipboard from "expo-clipboard";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { NutraColors, Typography } from "@/constants/theme";

export default function ProductNotFoundScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ barcode?: string | string[] }>();

  const barcode = (() => {
    const raw = params.barcode;
    if (Array.isArray(raw)) return raw[0] ?? "079357318942";
    return raw ?? "079357318942";
  })();

  const handleCopyBarcode = async () => {
    await Clipboard.setStringAsync(barcode);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.illustrationWrap}>
          <View style={styles.illustrationCircle}>
            <View style={styles.barcodeGraphic}>
              {new Array(9).fill(0).map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.bar,
                    {
                      width: [3, 3.6, 2.4, 2.8, 4.2, 2.6, 3.4, 2.1, 2.7][
                        index % 9
                      ],
                    },
                  ]}
                />
              ))}
            </View>

            <View style={styles.lensWrap}>
              <View style={styles.lensRing} />
              <Text style={styles.questionMark}>?</Text>
            </View>
          </View>

          <View style={styles.seedBadge}>
            <SymbolView
              name={{ ios: "leaf.fill", android: "eco", web: "eco" }}
              size={16}
              tintColor={NutraColors.primary}
            />
          </View>
        </View>

        <Text style={styles.title}>Product not found</Text>
        <Text style={styles.subtitle}>
          We couldn&apos;t find this product code in the open community
          database.
        </Text>

        <View style={styles.codeCard}>
          <View style={styles.codeRow}>
            <View style={styles.codeLabelWrap}>
              <SymbolView
                name={{
                  ios: "barcode.viewfinder",
                  android: "barcode_scanner",
                  web: "barcode_scanner",
                }}
                size={18}
                tintColor={NutraColors.primary}
              />
              <Text style={styles.codeLabel}>Captured Code</Text>
            </View>

            <Pressable
              onPress={handleCopyBarcode}
              style={styles.copyButton}
              accessibilityRole="button"
              accessibilityLabel="Copy barcode"
            >
              <Text style={styles.codeValue}>{barcode}</Text>
              <SymbolView
                name={{
                  ios: "doc.on.doc",
                  android: "content_copy",
                  web: "content_copy",
                }}
                size={18}
                tintColor={NutraColors.primary}
              />
            </Pressable>
          </View>
        </View>

        <View style={styles.actions}>
          <Pressable
            onPress={() => router.replace("/scanner")}
            style={styles.primaryAction}
            accessibilityRole="button"
            accessibilityLabel="Scan again"
          >
            <SymbolView
              name={{
                ios: "camera.fill",
                android: "photo_camera",
                web: "photo_camera",
              }}
              size={20}
              tintColor="#FFFFFF"
            />
            <Text style={styles.primaryActionText}>Scan Again</Text>
          </Pressable>

          <Pressable
            onPress={() => router.replace("/")}
            style={styles.secondaryAction}
            accessibilityRole="button"
            accessibilityLabel="Go back home"
          >
            <SymbolView
              name={{
                ios: "arrow.left",
                android: "arrow_back",
                web: "arrow_back",
              }}
              size={18}
              tintColor={NutraColors.primary}
            />
            <Text style={styles.secondaryActionText}>Go Back</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#EAF5EE",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  illustrationWrap: {
    position: "relative",
    marginTop: 12,
    marginBottom: 18,
  },
  illustrationCircle: {
    width: 170,
    height: 170,
    borderRadius: 86,
    backgroundColor: "rgba(236, 200, 201, 0.68)",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  barcodeGraphic: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    position: "absolute",
    left: 54,
    top: 54,
    transform: [{ rotate: "0deg" }],
  },
  bar: {
    height: 56,
    borderRadius: 3,
    backgroundColor: "#C9484B",
    opacity: 0.9,
  },
  lensWrap: {
    position: "absolute",
    right: 28,
    top: 95,
    width: 40,
    height: 40,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  lensRing: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2.6,
    borderColor: "#C9484B",
    position: "absolute",
  },
  questionMark: {
    color: "#C9484B",
    fontSize: 18,
    lineHeight: 18,
    fontWeight: "700",
    position: "absolute",
  },
  seedBadge: {
    position: "absolute",
    right: 16,
    top: 2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.8)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  title: {
    ...Typography.headlineLg,
    color: NutraColors.primaryDark,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    ...Typography.headlineSm,
    color: NutraColors.textSecondary,
    textAlign: "center",
    maxWidth: 320,
    lineHeight: 30,
  },
  codeCard: {
    width: "100%",
    maxWidth: 430,
    backgroundColor: "rgba(255,255,255,0.26)",
    borderRadius: 18,
    padding: 14,
    marginTop: 22,
    borderWidth: 1,
    borderColor: "rgba(18, 69, 51, 0.08)",
  },
  codeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  codeLabelWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexShrink: 1,
  },
  codeLabel: {
    ...Typography.labelLg,
    color: NutraColors.primary,
    textTransform: "uppercase",
    letterSpacing: 1.0,
    fontWeight: "700",
  },
  copyButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.22)",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 8,
    flexShrink: 1,
    justifyContent: "flex-end",
  },
  codeValue: {
    ...Typography.titleMd,
    color: NutraColors.textPrimary,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  actions: {
    width: "100%",
    maxWidth: 430,
    marginTop: 22,
    gap: 14,
  },
  primaryAction: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: NutraColors.primary,
    borderRadius: 18,
    height: 62,
    width: "100%",
    shadowColor: "#0D3C2E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
  },
  primaryActionText: {
    ...Typography.headlineSm,
    color: "#FFFFFF",
    fontWeight: "700",
  },
  secondaryAction: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "rgba(255,255,255,0.22)",
    borderRadius: 18,
    height: 54,
    width: "100%",
  },
  secondaryActionText: {
    ...Typography.titleMd,
    color: NutraColors.primaryDark,
    fontWeight: "700",
  },
});
