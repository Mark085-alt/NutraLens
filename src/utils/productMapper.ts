import {
  NutritionValue,
  OpenFoodFactsNutriments,
  OpenFoodFactsProductV3,
  Product,
  ProductNutrition,
} from '@/types/product';

/**
 * Extracts a per-100g nutrient value safely.
 *
 * IMPORTANT NUTRITION DISPLAY RULES:
 * - If a nutrient is missing or undefined: returns { value: null, unit: null }
 * - If a nutrient has an actual numeric zero (e.g. 0g fat): returns { value: 0, unit: 'g' }
 * - Never converts null/undefined to 0.
 */
function extractNutritionValue(
  nutriments: OpenFoodFactsNutriments | undefined,
  primaryKey: string,
  defaultUnit: string
): NutritionValue {
  if (!nutriments || typeof nutriments !== 'object') {
    return { value: null, unit: null };
  }

  const per100gKey = `${primaryKey}_100g`;
  const unitKey = `${primaryKey}_unit`;

  // Prefer the explicitly normalized _100g value, fallback to base key
  let rawVal = nutriments[per100gKey];
  if (rawVal === undefined || rawVal === null) {
    rawVal = nutriments[primaryKey];
  }

  if (typeof rawVal === 'number' && !isNaN(rawVal)) {
    const rawUnit = nutriments[unitKey];
    const unit =
      typeof rawUnit === 'string' && rawUnit.trim() ? rawUnit.trim() : defaultUnit;
    return {
      value: rawVal,
      unit,
    };
  }

  return { value: null, unit: null };
}

/**
 * Strips language prefixes like "en:" from Open Food Facts taxonomy tags and formats them.
 * Example: "en:soybeans" -> "Soybeans", "en:e150d" -> "E150d"
 */
function cleanTag(tag: string): string {
  if (!tag || typeof tag !== 'string') return '';
  const withoutPrefix = tag.replace(/^[a-z]{2}:/i, '').trim();
  return withoutPrefix
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Normalizes an array of tags (allergens, traces, additives).
 */
function cleanTags(tags: unknown): string[] {
  if (!Array.isArray(tags)) return [];
  return tags
    .filter((t): t is string => typeof t === 'string' && t.trim().length > 0)
    .map(cleanTag)
    .filter((t) => t.length > 0);
}

/**
 * Maps a raw Open Food Facts API v3 product object into the normalized NutraLens Product model.
 */
export function mapOpenFoodFactsProduct(
  barcode: string,
  raw: OpenFoodFactsProductV3
): Product {
  const nutriments = raw.nutriments || {};

  const nutrition: ProductNutrition = {
    energyKcal: extractNutritionValue(nutriments, 'energy-kcal', 'kcal'),
    energyKj: extractNutritionValue(nutriments, 'energy-kj', 'kJ'),
    fat: extractNutritionValue(nutriments, 'fat', 'g'),
    saturatedFat: extractNutritionValue(nutriments, 'saturated-fat', 'g'),
    carbohydrates: extractNutritionValue(nutriments, 'carbohydrates', 'g'),
    sugars: extractNutritionValue(nutriments, 'sugars', 'g'),
    fiber: extractNutritionValue(nutriments, 'fiber', 'g'),
    protein: extractNutritionValue(nutriments, 'proteins', 'g'),
    salt: extractNutritionValue(nutriments, 'salt', 'g'),
    sodium: extractNutritionValue(nutriments, 'sodium', 'g'),
  };

  const name =
    (typeof raw.product_name === 'string' && raw.product_name.trim()) ||
    (typeof raw.product_name_en === 'string' && raw.product_name_en.trim()) ||
    'Unnamed Product';

  const brand = (typeof raw.brands === 'string' && raw.brands.trim()) || null;

  const quantity =
    (typeof raw.quantity === 'string' && raw.quantity.trim()) || null;

  const servingSize =
    (typeof raw.serving_size === 'string' && raw.serving_size.trim()) || null;

  // Prefer small image for mobile list/sheet display, fallback to standard front url
  const imageUrl =
    (typeof raw.image_front_small_url === 'string' &&
      raw.image_front_small_url.trim()) ||
    (typeof raw.image_front_url === 'string' && raw.image_front_url.trim()) ||
    null;

  const ingredients =
    (typeof raw.ingredients_text === 'string' && raw.ingredients_text.trim()) ||
    (typeof raw.ingredients_text_en === 'string' &&
      raw.ingredients_text_en.trim()) ||
    null;

  const allergens = cleanTags(raw.allergens_tags);
  const traces = cleanTags(raw.traces_tags);
  const additives = cleanTags(raw.additives_tags);

  const categories =
    (typeof raw.categories === 'string' && raw.categories.trim()) || null;

  const packaging =
    (typeof raw.packaging === 'string' && raw.packaging.trim()) || null;

  const origins =
    (typeof raw.origins === 'string' && raw.origins.trim()) || null;

  return {
    barcode,
    name,
    brand,
    quantity,
    servingSize,
    imageUrl,
    ingredients,
    allergens,
    traces,
    additives,
    categories,
    packaging,
    origins,
    nutrition,
  };
}
