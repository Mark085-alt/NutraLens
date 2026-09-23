import { OpenFoodFactsV3Response, ProductFetchResult } from '@/types/product';
import { isValidBarcode, normalizeBarcode } from '@/utils/barcode';
import { mapOpenFoodFactsProduct } from '@/utils/productMapper';

const OPEN_FOOD_FACTS_BASE_URL = 'https://world.openfoodfacts.org';
const USER_AGENT = 'Nutralens/1.0 (https://github.com/nutralens/nutralens)';
const REQUEST_TIMEOUT_MS = 10000;

// Optimal fields query to keep network payload lightweight
const REQUESTED_FIELDS = [
  'code',
  'product_name',
  'product_name_en',
  'brands',
  'quantity',
  'serving_size',
  'image_front_url',
  'image_front_small_url',
  'ingredients_text',
  'ingredients_text_en',
  'nutriments',
  'allergens_tags',
  'traces_tags',
  'additives_tags',
  'categories',
  'packaging',
  'origins',
].join(',');

/**
 * Fetches product information by barcode from Open Food Facts API v3.
 *
 * Handles:
 * - Barcode string preservation and validation
 * - Open Food Facts v3 schema resolution ('success' vs 'failure')
 * - Backwards-compatible v2 checks ('status === 1' vs 'status === 0')
 * - Distinction between 'not_found' and actual network/server errors
 */
export async function fetchProductByBarcode(
  rawBarcode: unknown
): Promise<ProductFetchResult> {
  const barcode = normalizeBarcode(rawBarcode);

  if (!isValidBarcode(barcode)) {
    return {
      status: 'error',
      barcode,
      errorType: 'parse',
      message: 'Invalid barcode format. Expected numeric barcode.',
    };
  }

  const endpoint = `${OPEN_FOOD_FACTS_BASE_URL}/api/v3/product/${barcode}?fields=${REQUESTED_FIELDS}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'User-Agent': USER_AGENT,
        Accept: 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // 404 HTTP status indicates product not found in database
    if (response.status === 404) {
      return {
        status: 'not_found',
        barcode,
        message: 'Product not found in Open Food Facts database.',
      };
    }

    if (!response.ok) {
      return {
        status: 'error',
        barcode,
        errorType: 'server',
        message: `Open Food Facts server error (HTTP ${response.status})`,
      };
    }

    const data = (await response.json()) as OpenFoodFactsV3Response;

    // Check v3 status or v2 status for backward compatibility
    const isV3Found =
      data.status === 'success' && data.result?.id === 'product_found';
    const isV2Found = (data as any).status === 1;

    const isFound = isV3Found || isV2Found;

    if (isFound && data.product) {
      const normalizedProduct = mapOpenFoodFactsProduct(barcode, data.product);
      return {
        status: 'found',
        product: normalizedProduct,
      };
    }

    // Check explicit product not found
    const isV3NotFound =
      data.status === 'failure' && data.result?.id === 'product_not_found';
    const isV2NotFound = (data as any).status === 0;

    if (isV3NotFound || isV2NotFound || !data.product) {
      return {
        status: 'not_found',
        barcode,
        message: 'Product was not found in Open Food Facts.',
      };
    }

    return {
      status: 'error',
      barcode,
      errorType: 'parse',
      message: 'Unexpected response structure from Open Food Facts.',
    };
  } catch (error: any) {
    clearTimeout(timeoutId);

    if (error.name === 'AbortError') {
      return {
        status: 'error',
        barcode,
        errorType: 'timeout',
        message: 'Request timed out while connecting to Open Food Facts.',
      };
    }

    return {
      status: 'error',
      barcode,
      errorType: 'network',
      message: error.message || 'Network error while contacting Open Food Facts.',
    };
  }
}
