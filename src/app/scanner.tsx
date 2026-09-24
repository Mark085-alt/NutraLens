import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { NutraColors, Spacing, Typography } from "@/constants/theme";
import { fetchProductByBarcode } from "@/services/openFoodFacts";

export default function ScannerScreen() {
  const router = useRouter();
  const [facing, setFacing] = useState<CameraType>("back");
  const [torchEnabled, setTorchEnabled] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [lastScannedCode, setLastScannedCode] = useState<string | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const lastScannedRef = useRef<string | null>(null);
  const requestInFlightRef = useRef(false);

  const handleScanAgain = () => {
    setLastScannedCode(null);
    setScanError(null);
    setIsLocked(false);
    setIsProcessing(false);
    lastScannedRef.current = null;
    requestInFlightRef.current = false;
  };

  const handleBarcodeScanned = useCallback(
    async ({ data }: { data: string }) => {
      const barcode = data.trim();

      if (
        !barcode ||
        requestInFlightRef.current ||
        isLocked ||
        lastScannedRef.current === barcode
      ) {
        return;
      }

      requestInFlightRef.current = true;
      lastScannedRef.current = barcode;
      setLastScannedCode(barcode);
      setScanError(null);
      setIsLocked(true);
      setIsProcessing(true);

      const result = await fetchProductByBarcode(barcode);

      if (result.status === "found") {
        requestInFlightRef.current = false;
        router.replace({
          pathname: "/product/[barcode]",
          params: { barcode: result.product.barcode },
        });
        return;
      }

      if (result.status === "not_found") {
        requestInFlightRef.current = false;
        router.replace({
          pathname: "/product-not-found",
          params: { barcode },
        });
        return;
      }

      requestInFlightRef.current = false;
      setScanError(result.message);
      setIsProcessing(false);
      setIsLocked(false);
      lastScannedRef.current = null;
    },
    [isLocked, router],
  );

  if (!permission) {
    return <View style={styles.loadingState} />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.permissionContainer}>
        <View style={styles.permissionCard}>
          <Text style={styles.permissionTitle}>Camera access required</Text>
          <Text style={styles.permissionText}>
            We need permission to scan product barcodes.
          </Text>
          <Pressable
            onPress={requestPermission}
            style={styles.primaryAction}
            accessibilityRole="button"
            accessibilityLabel="Grant camera permission"
          >
            <Text style={styles.primaryActionText}>Grant permission</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <CameraView
        style={styles.camera}
        facing={facing}
        mirror={false}
        enableTorch={torchEnabled}
        onBarcodeScanned={handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: [
            "ean13",
            "ean8",
            "upc_a",
            "upc_e",
            "code128",
            "code39",
            "code93",
            "itf14",
            "codabar",
          ],
        }}
      />

      <View style={styles.darkOverlay} pointerEvents="none" />

      <View style={styles.overlay} pointerEvents="box-none">
        <View style={styles.headerRow}>
          <Pressable
            onPress={() => router.back()}
            style={styles.iconButton}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Text style={styles.iconButtonText}>←</Text>
          </Pressable>

          <View style={styles.titleWrap}>
            <Text style={styles.titleText}>Scan Product</Text>
            <Text style={styles.subtitleText}>NutraLens Vision</Text>
          </View>

          <Pressable
            onPress={() => setTorchEnabled((current) => !current)}
            style={styles.iconButton}
            accessibilityRole="button"
            accessibilityLabel="Toggle flashlight"
          >
            <Text style={styles.iconButtonText}>
              {torchEnabled ? "☀" : "✦"}
            </Text>
          </Pressable>
        </View>

        <View style={styles.instructionRow}>
          <Text style={styles.instructionText}>
            Place the barcode inside the frame
          </Text>
        </View>

        <View style={styles.reticleWrapper}>
          <View style={styles.reticleFrame}>
            <View style={[styles.cornerBracket, styles.topLeft]} />
            <View style={[styles.cornerBracket, styles.topRight]} />
            <View style={[styles.cornerBracket, styles.bottomLeft]} />
            <View style={[styles.cornerBracket, styles.bottomRight]} />
            <View style={styles.scanLine} />
          </View>

          <View style={styles.helperTextWrap}>
            <Text style={styles.helperText}>Hold your phone steady</Text>
            <Text style={styles.helperSubtext}>
              Barcode must be clearly visible and well lit
            </Text>
          </View>

          <View style={styles.helperPillsRow}>
            <View style={styles.helperPill}>
              <Text style={styles.helperPillText}>EAN-13 / UPC</Text>
            </View>
            <View style={styles.helperPill}>
              <Text style={styles.helperPillText}>QR Code</Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomSection}>
          <Pressable
            onPress={() =>
              setFacing((current) => (current === "back" ? "front" : "back"))
            }
            style={styles.manualButton}
            accessibilityRole="button"
            accessibilityLabel="Toggle camera facing"
          >
            <Text style={styles.manualButtonText}>Flip Camera</Text>
          </Pressable>

          {lastScannedCode ? (
            <View style={styles.detectedCard}>
              <View style={styles.detectedHeader}>
                <Text style={styles.detectedLabel}>Barcode detected</Text>
              </View>
              <Text style={styles.detectedCode}>{lastScannedCode}</Text>

              {scanError ? (
                <Text style={styles.errorText}>{scanError}</Text>
              ) : null}

              {isProcessing ? (
                <View style={styles.loadingRow}>
                  <ActivityIndicator color={NutraColors.primaryFixed} />
                  <Text style={styles.loadingText}>
                    Preparing product lookup…
                  </Text>
                </View>
              ) : (
                <Pressable
                  onPress={handleScanAgain}
                  style={styles.secondaryAction}
                  accessibilityRole="button"
                  accessibilityLabel="Scan another barcode"
                >
                  <Text style={styles.secondaryActionText}>Scan Again</Text>
                </Pressable>
              )}
            </View>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000000",
  },
  camera: {
    flex: 1,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(15, 69, 51, 0.45)",
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: "space-between",
    paddingHorizontal: Spacing.md,
    paddingTop: 25,
    paddingBottom: Spacing.xl,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 15,
    zIndex: 2,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  iconButtonText: {
    ...Typography.headlineSm,
    color: "#FFFFFF",
    fontWeight: "700",
    lineHeight: 20,
  },
  titleWrap: {
    alignItems: "center",
  },
  titleText: {
    ...Typography.headlineSm,
    color: "#FFFFFF",
    fontWeight: "700",
  },
  subtitleText: {
    ...Typography.labelMd,
    color: "rgba(255,255,255,0.65)",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  instructionRow: {
    alignSelf: "center",
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.38)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    zIndex: 2,
  },
  instructionText: {
    ...Typography.bodyMd,
    color: "rgba(255,255,255,0.85)",
  },
  reticleWrapper: {
    alignItems: "center",
    marginTop: 12,
    zIndex: 1,
  },
  reticleFrame: {
    width: 280,
    height: 190,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.14)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    position: "relative",
    overflow: "hidden",
  },
  cornerBracket: {
    position: "absolute",
    width: 28,
    height: 28,
    borderColor: "#89D6B1",
    borderWidth: 4,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 12,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 12,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 12,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 12,
  },
  scanLine: {
    position: "absolute",
    left: 12,
    right: 12,
    top: "52%",
    height: 2,
    backgroundColor: "#A4F3CC",
    shadowColor: "#89D6B1",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 12,
  },
  helperTextWrap: {
    marginTop: 24,
    alignItems: "center",
  },
  helperText: {
    ...Typography.titleMd,
    color: "#FFFFFF",
    fontWeight: "700",
  },
  helperSubtext: {
    ...Typography.bodySm,
    color: "rgba(255,255,255,0.6)",
    marginTop: 4,
    textAlign: "center",
  },
  helperPillsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 16,
  },
  helperPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
  },
  helperPillText: {
    ...Typography.labelMd,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  bottomSection: {
    alignItems: "center",
    width: "100%",
    gap: Spacing.md,
  },
  manualButton: {
    alignSelf: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  manualButtonText: {
    ...Typography.titleSm,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  detectedCard: {
    width: "100%",
    backgroundColor: "rgba(9, 14, 12, 0.56)",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    padding: Spacing.md,
  },
  detectedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detectedLabel: {
    ...Typography.labelMd,
    color: "#A4F3CC",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  detectedCode: {
    ...Typography.titleMd,
    color: "#FFFFFF",
    marginTop: 6,
    fontWeight: "700",
  },
  loadingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Spacing.sm,
    gap: 8,
  },
  loadingText: {
    ...Typography.bodyMd,
    color: "#FFFFFF",
  },
  errorText: {
    ...Typography.bodyMd,
    color: "#F7A7A7",
    marginTop: Spacing.sm,
  },
  secondaryAction: {
    marginTop: Spacing.sm,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    alignSelf: "flex-start",
  },
  secondaryActionText: {
    ...Typography.labelMd,
    color: "#FFFFFF",
    fontWeight: "700",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: NutraColors.background,
    padding: Spacing.md,
  },
  permissionCard: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: NutraColors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: NutraColors.border,
    padding: Spacing.lg,
    alignItems: "center",
  },
  permissionTitle: {
    ...Typography.headlineSm,
    color: NutraColors.textPrimary,
    fontWeight: "700",
    textAlign: "center",
  },
  permissionText: {
    ...Typography.bodyMd,
    color: NutraColors.textSecondary,
    textAlign: "center",
    marginTop: Spacing.sm,
    marginBottom: Spacing.md,
  },
  primaryAction: {
    backgroundColor: NutraColors.primary,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  primaryActionText: {
    ...Typography.titleSm,
    color: "#FFFFFF",
    fontWeight: "700",
  },
  loadingState: {
    flex: 1,
    backgroundColor: NutraColors.background,
  },
});
