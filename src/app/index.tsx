import { useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { NutraLogo } from "@/components/common/NutraLogo";
import {
  MaxContentWidth,
  NutraColors,
  Spacing,
  Typography,
} from "@/constants/theme";

export default function HomeScreen() {
  const router = useRouter();

  const handleStartScan = () => {
    router.push("/scanner");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Top Sub-Header */}
          <View style={styles.headerRow}>
            <View style={styles.brandLockup}>
              <NutraLogo size={32} />
              <Text style={styles.brandTitle}>NutraLens</Text>
            </View>

            <View style={styles.badge}>
              <View style={styles.statusDot} />
              <Text style={styles.badgeText}>v1.0 • Open Data</Text>
            </View>
          </View>

          {/* Hero Narrative */}
          <View style={styles.heroSection}>
            <Text style={styles.heroTitle}>Know what&apos;s in your food.</Text>
            <Text style={styles.heroSubtitle}>
              Scan a packaged food barcode to see the product information
              available to you.
            </Text>
          </View>

          {/* Central Visual Scanning Card */}
          <View style={styles.visualCard}>
            {/* Viewfinder Corner Accents */}
            <View style={[styles.cornerBracket, styles.cornerTopLeft]} />
            <View style={[styles.cornerBracket, styles.cornerTopRight]} />
            <View style={[styles.cornerBracket, styles.cornerBottomLeft]} />
            <View style={[styles.cornerBracket, styles.cornerBottomRight]} />

            {/* Stylized Barcode Graphic */}
            <View style={styles.packageGraphic}>
              <View style={styles.barcodeBarsContainer}>
                <View
                  style={[
                    styles.bar,
                    { width: 3, backgroundColor: NutraColors.primary },
                  ]}
                />
                <View style={[styles.bar, { width: 2 }]} />
                <View style={[styles.bar, { width: 6 }]} />
                <View
                  style={[
                    styles.bar,
                    { width: 2, backgroundColor: NutraColors.primaryDark },
                  ]}
                />
                <View style={[styles.bar, { width: 4 }]} />
                <View style={[styles.bar, { width: 1 }]} />
                <View
                  style={[
                    styles.bar,
                    { width: 5, backgroundColor: NutraColors.primary },
                  ]}
                />
                <View style={[styles.bar, { width: 3 }]} />
                <View
                  style={[
                    styles.bar,
                    { width: 2, backgroundColor: NutraColors.primaryDark },
                  ]}
                />
                <View style={[styles.bar, { width: 7 }]} />
                <View style={[styles.bar, { width: 2 }]} />
                <View
                  style={[
                    styles.bar,
                    { width: 4, backgroundColor: NutraColors.primary },
                  ]}
                />
                <View style={[styles.bar, { width: 2 }]} />
                <View style={[styles.bar, { width: 5 }]} />
                <View
                  style={[
                    styles.bar,
                    { width: 3, backgroundColor: NutraColors.primary },
                  ]}
                />
              </View>

              {/* Laser Scanline Beam */}
              <View style={styles.scanline} />
            </View>

            <Text style={styles.visualCardLabel}>
              Point at any product barcode
            </Text>
          </View>

          {/* Primary Interactive CTA */}
          <Pressable
            onPress={handleStartScan}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.primaryButtonPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Scan product barcode"
          >
            <SymbolView
              name={{
                ios: "barcode.viewfinder",
                android: "qr_code_scanner",
                web: "qr_code_scanner",
              }}
              size={22}
              tintColor="#FFFFFF"
            />
            <Text style={styles.primaryButtonText}>Scan Product</Text>
          </Pressable>

          {/* How It Works Architecture Card */}
          <View style={styles.processCard}>
            <View style={styles.processHeader}>
              <Text style={styles.processTitle}>HOW IT WORKS</Text>
              <SymbolView
                name={{
                  ios: "checkmark.shield",
                  android: "verified_user",
                  web: "verified_user",
                }}
                size={18}
                tintColor={NutraColors.secondary}
              />
            </View>

            <View style={styles.stepsRow}>
              {/* Step 1 */}
              <View style={styles.stepItem}>
                <View style={styles.stepNumberBadge}>
                  <Text style={styles.stepNumberText}>1</Text>
                </View>
                <Text style={styles.stepTitle}>Scan</Text>
                <Text style={styles.stepDescription}>
                  Point camera at barcode
                </Text>
              </View>

              {/* Step 2 */}
              <View style={styles.stepItem}>
                <View style={styles.stepNumberBadge}>
                  <Text style={styles.stepNumberText}>2</Text>
                </View>
                <Text style={styles.stepTitle}>Fetch</Text>
                <Text style={styles.stepDescription}>
                  Query Open Food Facts
                </Text>
              </View>

              {/* Step 3 */}
              <View style={styles.stepItem}>
                <View style={styles.stepNumberBadge}>
                  <Text style={styles.stepNumberText}>3</Text>
                </View>
                <Text style={styles.stepTitle}>Inspect</Text>
                <Text style={styles.stepDescription}>
                  Read unbiased metrics
                </Text>
              </View>
            </View>
          </View>

          {/* Transparency Pledge Footnote */}
          <View style={styles.footerSection}>
            <View style={styles.footerRow}>
              <SymbolView
                name={{ ios: "globe", android: "public", web: "public" }}
                size={16}
                tintColor={NutraColors.secondary}
              />
              <Text style={styles.footerTitle}>
                Data directly from Open Food Facts
              </Text>
            </View>
            <Text style={styles.footerSubtitle}>
              No algorithmic bias • No health scoring • Pure transparency
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: NutraColors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xl,
  },
  container: {
    width: "100%",
    maxWidth: MaxContentWidth,
    gap: Spacing.lg,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: Spacing.xs,
  },
  brandLockup: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  brandTitle: {
    ...Typography.headlineSm,
    color: NutraColors.primary,
    fontWeight: "700",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: NutraColors.secondaryContainer,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 9999,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: NutraColors.primary,
  },
  badgeText: {
    ...Typography.labelMd,
    color: NutraColors.onSecondaryFixedVariant,
    fontWeight: "600",
  },
  heroSection: {
    gap: Spacing.xs,
  },
  heroTitle: {
    ...Typography.headlineLg,
    color: NutraColors.primaryDark,
    fontWeight: "700",
  },
  heroSubtitle: {
    ...Typography.bodyMd,
    color: NutraColors.textSecondary,
    lineHeight: 22,
  },
  visualCard: {
    width: "100%",
    backgroundColor: NutraColors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: NutraColors.border,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.md,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    shadowColor: "#141D1A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
    minHeight: 180,
  },
  cornerBracket: {
    position: "absolute",
    width: 18,
    height: 18,
    borderColor: NutraColors.primary,
  },
  cornerTopLeft: {
    top: 14,
    left: 14,
    borderTopWidth: 2.5,
    borderLeftWidth: 2.5,
    borderTopLeftRadius: 4,
  },
  cornerTopRight: {
    top: 14,
    right: 14,
    borderTopWidth: 2.5,
    borderRightWidth: 2.5,
    borderTopRightRadius: 4,
  },
  cornerBottomLeft: {
    bottom: 14,
    left: 14,
    borderBottomWidth: 2.5,
    borderLeftWidth: 2.5,
    borderBottomLeftRadius: 4,
  },
  cornerBottomRight: {
    bottom: 14,
    right: 14,
    borderBottomWidth: 2.5,
    borderRightWidth: 2.5,
    borderBottomRightRadius: 4,
  },
  packageGraphic: {
    width: 160,
    height: 80,
    backgroundColor: NutraColors.surfaceContainerLow,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: NutraColors.border,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  barcodeBarsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    height: 48,
  },
  bar: {
    height: "100%",
    backgroundColor: NutraColors.textPrimary,
    borderRadius: 1,
  },
  scanline: {
    position: "absolute",
    left: 8,
    right: 8,
    height: 2,
    backgroundColor: NutraColors.primary,
    shadowColor: NutraColors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  visualCardLabel: {
    ...Typography.bodySm,
    color: NutraColors.textSecondary,
    marginTop: Spacing.sm,
  },
  primaryButton: {
    width: "100%",
    height: 56,
    backgroundColor: NutraColors.primary,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    shadowColor: NutraColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  primaryButtonPressed: {
    backgroundColor: NutraColors.primaryDark,
    transform: [{ scale: 0.985 }],
  },
  primaryButtonText: {
    ...Typography.titleMd,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  processCard: {
    width: "100%",
    backgroundColor: NutraColors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: NutraColors.border,
    padding: Spacing.md,
    gap: Spacing.sm,
    shadowColor: "#141D1A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  processHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  processTitle: {
    ...Typography.labelLg,
    color: NutraColors.textPrimary,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  stepsRow: {
    flexDirection: "row",
    gap: Spacing.xs,
    paddingTop: Spacing.xs,
  },
  stepItem: {
    flex: 1,
    alignItems: "center",
    backgroundColor: NutraColors.surfaceContainerLow,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  stepNumberBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: NutraColors.secondaryContainer,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  stepNumberText: {
    ...Typography.labelMd,
    color: NutraColors.primary,
    fontWeight: "700",
  },
  stepTitle: {
    ...Typography.titleSm,
    color: NutraColors.textPrimary,
    fontWeight: "600",
  },
  stepDescription: {
    ...Typography.bodySm,
    fontSize: 10,
    lineHeight: 13,
    color: NutraColors.textSecondary,
    textAlign: "center",
    marginTop: 2,
  },
  footerSection: {
    alignItems: "center",
    gap: 4,
    paddingTop: Spacing.xs,
    paddingBottom: Spacing.sm,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  footerTitle: {
    ...Typography.bodySm,
    color: NutraColors.textSecondary,
    fontWeight: "500",
  },
  footerSubtitle: {
    ...Typography.labelMd,
    color: NutraColors.textMuted,
    textAlign: "center",
  },
});
