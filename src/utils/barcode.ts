/**
 * Barcode utilities for NutraLens.
 *
 * IMPORTANT:
 * Barcodes must always be handled strictly as strings, never as numbers,
 * to prevent loss of leading zeros (e.g. "079357318942").
 */

/**
 * Normalizes a barcode by trimming whitespace and converting from string/number safely.
 */
export function normalizeBarcode(rawBarcode: unknown): string {
  if (typeof rawBarcode !== 'string') {
    if (typeof rawBarcode === 'number' && !isNaN(rawBarcode)) {
      return String(rawBarcode).trim();
    }
    return '';
  }
  return rawBarcode.trim();
}

/**
 * Validates whether a barcode string is usable for product lookup.
 * Valid retail barcodes typically contain 4 to 18 digits (EAN-8, EAN-13, UPC-A, UPC-E, ITF-14, etc.).
 */
export function isValidBarcode(barcode: string): boolean {
  if (!barcode || typeof barcode !== 'string') {
    return false;
  }
  const trimmed = barcode.trim();
  return /^\d{4,18}$/.test(trimmed);
}
