import { useLocalSearchParams, useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { NutraColors, Spacing, Typography } from "@/constants/theme";
import { fetchProductByBarcode } from "@/services/openFoodFacts";
import { ProductFetchResult } from "@/types/product";

function formatValue(value: number | null, unit: string | null) {
  if (value == null) return "Not listed";
  if (!unit) return String(value);
  return `${value} ${unit}`;
}

export default function ProductDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ barcode?: string | string[] }>();
  const [result, setResult] = useState<ProductFetchResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const barcode = useMemo(() => {
    const raw = params.barcode;
    if (Array.isArray(raw)) return raw[0] ?? "";
    return raw ?? "";
  }, [params.barcode]);

  useEffect(() => {
    let cancelled = false;

    async function loadProduct() {
      if (!barcode) {
        if (!cancelled) {
          setResult({
            status: "error",
            barcode: "",
            errorType: "parse",
            message: "No barcode was provided.",
          });
          setIsLoading(false);
        }
        return;
      }

      const nextResult = await fetchProductByBarcode(barcode);

      if (!cancelled) {
        setResult(nextResult);
        setIsLoading(false);
      }
    }

    setIsLoading(true);
    loadProduct();

    return () => {
      cancelled = true;
    };
  }, [barcode]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centeredState}>
          <ActivityIndicator size="large" color={NutraColors.primary} />
          <Text style={styles.loadingText}>Loading product details…</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!result) {
    return null;
  }

  if (result.status === "not_found") {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Pressable
            onPress={() => router.replace("/")}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Go back home"
          >
            <Text style={styles.backButtonText}>Back</Text>
          </Pressable>

          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>Product not found</Text>
            <Text style={styles.emptyBody}>
              This barcode doesn&apos;t appear in Open Food Facts yet.
            </Text>
            <Pressable
              onPress={() => router.replace("/scanner")}
              style={styles.primaryAction}
              accessibilityRole="button"
              accessibilityLabel="Scan another product"
            >
              <Text style={styles.primaryActionText}>Scan another product</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (result.status === "error") {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Pressable
            onPress={() => router.replace("/")}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Go back home"
          >
            <Text style={styles.backButtonText}>Back</Text>
          </Pressable>

          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>Lookup failed</Text>
            <Text style={styles.emptyBody}>{result.message}</Text>
            <Pressable
              onPress={() => router.replace("/scanner")}
              style={styles.primaryAction}
              accessibilityRole="button"
              accessibilityLabel="Retry scanning"
            >
              <Text style={styles.primaryActionText}>Retry scan</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const { product } = result;

  const nutritionRows = [
    {
      label: "Energy",
      value: formatValue(
        product.nutrition.energyKcal.value,
        product.nutrition.energyKcal.unit,
      ),
      isEmphasis: true,
    },
    {
      label: "Fat",
      value: formatValue(
        product.nutrition.fat.value,
        product.nutrition.fat.unit,
      ),
      isEmphasis: true,
    },
    {
      label: "Saturated Fat",
      value: formatValue(
        product.nutrition.saturatedFat.value,
        product.nutrition.saturatedFat.unit,
      ),
      isIndented: true,
    },
    {
      label: "Carbohydrates",
      value: formatValue(
        product.nutrition.carbohydrates.value,
        product.nutrition.carbohydrates.unit,
      ),
      isEmphasis: true,
    },
    {
      label: "Sugars",
      value: formatValue(
        product.nutrition.sugars.value,
        product.nutrition.sugars.unit,
      ),
      isIndented: true,
    },
    {
      label: "Protein",
      value: formatValue(
        product.nutrition.protein.value,
        product.nutrition.protein.unit,
      ),
      isEmphasis: true,
    },
    {
      label: "Salt",
      value: formatValue(
        product.nutrition.salt.value,
        product.nutrition.salt.unit,
      ),
      isEmphasis: true,
    },
    {
      label: "Dietary Fiber",
      value:
        product.nutrition.fiber.value == null
          ? "NA"
          : formatValue(
              product.nutrition.fiber.value,
              product.nutrition.fiber.unit,
            ),
      isEmphasis: false,
      isPill: true,
    },
  ];

  const allergens = product.allergens.length
    ? product.allergens
    : ["No allergens listed"];
  const additivies = product.additives.length
    ? product.additives
    : ["No additives listed"];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerRow}>
        <Text style={styles.screenTitle}>Product Details</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <View style={styles.primaryCard}>
          <View style={styles.productRow}>
            <View style={styles.imageWrap}>
              {product.imageUrl ? (
                <Image
                  source={{ uri: product.imageUrl }}
                  style={styles.productImage}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Text style={styles.imagePlaceholderText}>No image</Text>
                </View>
              )}

              <View style={styles.verifiedBadge}>
                <SymbolView
                  name={{
                    ios: "checkmark.seal.fill",
                    android: "verified",
                    web: "verified",
                  }}
                  size={14}
                  tintColor={NutraColors.primary}
                />
              </View>
            </View>

            <View style={styles.productInfo}>
              <View style={styles.tagRow}>
                <Text style={styles.tag}>Packaged Snack</Text>
              </View>

              <Text style={styles.productName} numberOfLines={2}>
                {product.name}
              </Text>

              <View style={styles.metaRow}>
                <Text style={styles.metaText} numberOfLines={1}>
                  {product.brand ?? "Unknown brand"}
                </Text>
                <Text style={styles.metaDivider}>•</Text>
                <Text style={styles.metaText} numberOfLines={1}>
                  {product.quantity ?? "Unknown size"}
                </Text>
              </View>

              <View style={styles.barcodeBox}>
                <View style={styles.barcodeLabelWrap}>
                  <SymbolView
                    name={{
                      ios: "barcode.viewfinder",
                      android: "qr_code_2",
                      web: "qr_code_2",
                    }}
                    size={14}
                    tintColor={NutraColors.textSecondary}
                  />
                  <Text style={styles.barcodeText}>EAN: {product.barcode}</Text>
                </View>

                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Copy barcode"
                  style={styles.copyButton}
                >
                  <SymbolView
                    name={{
                      ios: "doc.on.doc",
                      android: "content_copy",
                      web: "content_copy",
                    }}
                    size={16}
                    tintColor={NutraColors.primary}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleWrap}>
              <SymbolView
                name={{
                  ios: "chart.pie.fill",
                  android: "pie_chart",
                  web: "pie_chart",
                }}
                size={20}
                tintColor={NutraColors.primary}
              />
              <Text style={styles.sectionTitle}>Nutrition</Text>
            </View>

            <View style={styles.pillBadge}>
              <SymbolView
                name={{ ios: "scalemass.fill", android: "scale", web: "scale" }}
                size={14}
                tintColor={NutraColors.secondary}
              />
              <Text style={styles.pillText}>Per 100 g</Text>
            </View>
          </View>

          <View style={styles.nutritionList}>
            {nutritionRows.map((row) => (
              <View
                key={row.label}
                style={[
                  styles.nutritionRow,
                  row.isIndented && styles.nutritionRowIndented,
                  row.isPill && styles.nutritionRowPill,
                  row.isEmphasis && styles.nutritionRowEmphasis,
                ]}
              >
                <Text
                  style={[
                    styles.nutritionLabel,
                    row.isIndented && styles.nutritionLabelIndented,
                  ]}
                >
                  {row.label}
                </Text>
                <Text
                  style={[
                    styles.nutritionValue,
                    row.isPill && styles.nutritionValuePill,
                  ]}
                >
                  {row.value}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionTitleWrap}>
            <SymbolView
              name={{
                ios: "doc.text.fill",
                android: "receipt_long",
                web: "receipt_long",
              }}
              size={20}
              tintColor={NutraColors.primary}
            />
            <Text style={styles.sectionTitle}>Ingredients</Text>
          </View>

          <View style={styles.inlineBlock}>
            <Text style={styles.bodyText}>
              {product.ingredients ?? "Ingredients information not available."}
            </Text>
          </View>

          <Text style={styles.metaFootnote}>
            <Text>
              Raw text provided by product packaging via Open Food Facts.
            </Text>
          </Text>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionTitleWrap}>
            <SymbolView
              name={{
                ios: "exclamationmark.triangle.fill",
                android: "warning_amber",
                web: "warning_amber",
              }}
              size={20}
              tintColor={NutraColors.primary}
            />
            <Text style={styles.sectionTitle}>Allergens</Text>
          </View>

          <Text style={styles.smallLabel}>Declared Present</Text>
          <View style={styles.pillWrap}>
            {allergens.map((allergen) => (
              <View key={allergen} style={styles.tagPill}>
                <Text style={styles.tagPillText}>{allergen}</Text>
              </View>
            ))}
          </View>

          <View style={styles.subtlePanel}>
            <Text style={styles.smallLabel}>Traces Reported</Text>
            <Text style={styles.subtleText}>
              May contain traces of{" "}
              {product.traces.join(", ") || "no trace data"}.
            </Text>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleWrap}>
              <SymbolView
                name={{ ios: "sparkles", android: "science", web: "science" }}
                size={20}
                tintColor={NutraColors.primary}
              />
              <Text style={styles.sectionTitle}>Additives</Text>
            </View>

            <View style={styles.metaPill}>
              <Text style={styles.metaPillText}>
                {additivies.length} reported in database
              </Text>
            </View>
          </View>

          <Text style={styles.mutedText}>
            Strictly neutral descriptive indexing without qualitative risk
            scoring.
          </Text>

          <View style={styles.additiveList}>
            {additivies.map((item) => (
              <View key={item} style={styles.additiveRow}>
                <Text style={styles.additiveCode}>{item}</Text>
                <Text style={styles.additiveText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionTitleWrap}>
            <SymbolView
              name={{
                ios: "list.bullet",
                android: "category",
                web: "category",
              }}
              size={20}
              tintColor={NutraColors.primary}
            />
            <Text style={styles.sectionTitle}>Additional Information</Text>
          </View>

          <View style={styles.infoStack}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Categories</Text>
              <Text style={styles.infoValue}>{product.categories ?? "NA"}</Text>
            </View>
            <View style={[styles.infoRow, styles.infoRowAlt]}>
              <Text style={styles.infoLabel}>Packaging</Text>
              <Text style={styles.infoValue}>{product.packaging ?? "NA"}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Origin of ingredients</Text>
              <Text style={styles.infoValue}>{product.origins ?? "NA"}</Text>
            </View>
          </View>
        </View>

        <View style={styles.footerMeta}>
          <View style={styles.footerIconWrap}>
            <SymbolView
              name={{ ios: "globe", android: "public", web: "public" }}
              size={18}
              tintColor={NutraColors.secondary}
            />
          </View>
          <Text style={styles.footerText}>
            Product information provided by Open Food Facts database. NutraLens
            presents unmodified public API data and does not evaluate or score
            nutritional quality.
          </Text>
          <Text style={styles.footerTag}>Open Database License (ODbL)</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <Pressable
          onPress={() => router.replace("/scanner")}
          style={styles.scanAgainButton}
          accessibilityRole="button"
          accessibilityLabel="Scan again"
        >
          <SymbolView
            name={{
              ios: "barcode.viewfinder",
              android: "barcode_scanner",
              web: "barcode_scanner",
            }}
            size={20}
            tintColor="#FFFFFF"
          />
          <Text style={styles.scanAgainText}>Scan Again</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles: any = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: NutraColors.background,
  },
  headerRow: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  screenTitle: {
    ...Typography.headlineSm,
    color: NutraColors.textPrimary,
    fontWeight: "700",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.md,
    paddingBottom: 120,
    gap: Spacing.md,
  },
  productRow: {
    flexDirection: "row",
    gap: Spacing.md,
    alignItems: "flex-start",
  },
  primaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: NutraColors.border,
    shadowColor: "#000000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  imageWrap: {
    width: 90,
    height: 90,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: NutraColors.surfaceContainer,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: NutraColors.surfaceContainer,
  },
  imagePlaceholderText: {
    ...Typography.labelMd,
    color: NutraColors.textSecondary,
  },
  verifiedBadge: {
    position: "absolute",
    right: 6,
    bottom: 6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.92)",
    alignItems: "center",
    justifyContent: "center",
  },
  productInfo: {
    flex: 1,
    minWidth: 0,
  },
  tagRow: {
    marginBottom: 6,
  },
  tag: {
    ...Typography.labelMd,
    color: NutraColors.textPrimary,
    backgroundColor: NutraColors.secondaryContainer,
    alignSelf: "flex-start",
    borderRadius: 999,
    overflow: "hidden",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  productName: {
    ...Typography.headlineSm,
    color: NutraColors.textPrimary,
    fontWeight: "700",
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaText: {
    ...Typography.bodySm,
    color: NutraColors.textSecondary,
  },
  metaDivider: {
    ...Typography.bodySm,
    color: NutraColors.textMuted,
  },
  barcodeBox: {
    marginTop: Spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: NutraColors.surfaceContainerLow,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  barcodeLabelWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexShrink: 1,
  },
  barcodeText: {
    ...Typography.labelMd,
    color: NutraColors.textSecondary,
    letterSpacing: 0.2,
    flexShrink: 1,
  },
  copyButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: NutraColors.border,
    padding: Spacing.md,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.sm,
  },
  sectionTitleWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sectionTitle: {
    ...Typography.titleMd,
    color: NutraColors.textPrimary,
    fontWeight: "700",
  },
  pillBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: NutraColors.secondaryContainer,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  pillText: {
    ...Typography.labelMd,
    color: NutraColors.onSecondaryFixedVariant,
    fontWeight: "600",
  },
  nutritionList: {
    gap: 2,
  },
  nutritionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  nutritionRowEmphasis: {
    backgroundColor: "rgba(236, 246, 239, 0.8)",
  },
  nutritionRowIndented: {
    paddingLeft: 20,
    backgroundColor: "rgba(238, 244, 240, 0.5)",
  },
  nutritionRowPill: {
    backgroundColor: "rgba(229, 240, 235, 0.8)",
  },
  nutritionLabel: {
    ...Typography.bodyMd,
    color: NutraColors.textPrimary,
  },
  nutritionLabelIndented: {
    color: NutraColors.textSecondary,
  },
  nutritionValue: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: NutraColors.textPrimary,
    fontFamily: "monospace",
  },
  nutritionValuePill: {
    backgroundColor: NutraColors.surfaceContainerHighest,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    overflow: "hidden",
  },
  inlineBlock: {
    backgroundColor: NutraColors.surfaceContainerLow,
    borderRadius: 10,
    padding: 12,
    marginTop: Spacing.sm,
  },
  bodyText: {
    ...Typography.bodyMd,
    color: NutraColors.textPrimary,
    lineHeight: 22,
  },
  metaFootnote: {
    ...Typography.bodySm,
    color: NutraColors.textSecondary,
    marginTop: Spacing.sm,
  },
  smallLabel: {
    ...Typography.labelMd,
    color: NutraColors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginTop: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  pillWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tagPill: {
    backgroundColor: NutraColors.surfaceContainer,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagPillText: {
    ...Typography.titleSm,
    color: NutraColors.textPrimary,
    fontWeight: "600",
  },
  subtlePanel: {
    backgroundColor: NutraColors.surfaceContainerLow,
    borderRadius: 10,
    padding: 10,
    marginTop: Spacing.md,
  },
  subtleText: {
    ...Typography.bodySm,
    color: NutraColors.textPrimary,
  },
  metaPill: {
    backgroundColor: NutraColors.secondaryContainer,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  metaPillText: {
    ...Typography.labelMd,
    color: NutraColors.onSecondaryFixedVariant,
    fontWeight: "600",
  },
  mutedText: {
    ...Typography.bodySm,
    color: NutraColors.textSecondary,
    marginTop: Spacing.sm,
  },
  additiveList: {
    gap: 8,
    marginTop: Spacing.sm,
  },
  additiveRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: NutraColors.surfaceContainerLow,
    borderRadius: 10,
    padding: 10,
  },
  additiveCode: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
    color: NutraColors.primary,
    fontFamily: "monospace",
  },
  additiveText: {
    ...Typography.bodyMd,
    color: NutraColors.textPrimary,
  },
  infoStack: {
    marginTop: Spacing.sm,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 10,
    gap: 12,
  },
  infoRowAlt: {
    backgroundColor: "rgba(236, 246, 239, 0.6)",
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  infoLabel: {
    ...Typography.bodySm,
    color: NutraColors.textSecondary,
    flex: 1,
  },
  infoValue: {
    ...Typography.bodySm,
    color: NutraColors.textPrimary,
    textAlign: "right",
    flexShrink: 1,
    fontWeight: "600",
  },
  footerMeta: {
    alignItems: "center",
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  footerIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: NutraColors.surfaceContainer,
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    ...Typography.bodySm,
    color: NutraColors.textSecondary,
    textAlign: "center",
  },
  footerTag: {
    ...Typography.labelMd,
    color: NutraColors.textMuted,
  },
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(242, 252, 245, 0.95)",
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: NutraColors.border,
  },
  scanAgainButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: NutraColors.primary,
    borderRadius: 14,
    height: 52,
    gap: 8,
  },
  scanAgainText: {
    ...Typography.titleMd,
    color: "#FFFFFF",
    fontWeight: "700",
  },
  centeredState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.md,
  },
  loadingText: {
    ...Typography.bodyMd,
    color: NutraColors.textPrimary,
    marginTop: Spacing.md,
  },
  container: {
    flex: 1,
    padding: Spacing.md,
    justifyContent: "center",
  },
  backButton: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: NutraColors.border,
    marginBottom: Spacing.md,
  },
  backButtonText: {
    ...Typography.labelLg,
    color: NutraColors.textPrimary,
  },
  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: NutraColors.border,
    padding: Spacing.lg,
  },
  emptyTitle: {
    ...Typography.headlineSm,
    color: NutraColors.textPrimary,
  },
  emptyBody: {
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
});
