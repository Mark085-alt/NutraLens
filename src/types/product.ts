export interface NutritionValue {
  value: number | null;
  unit: string | null;
}

export interface ProductNutrition {
  energyKcal: NutritionValue;
  energyKj: NutritionValue;
  fat: NutritionValue;
  saturatedFat: NutritionValue;
  carbohydrates: NutritionValue;
  sugars: NutritionValue;
  fiber: NutritionValue;
  protein: NutritionValue;
  salt: NutritionValue;
  sodium: NutritionValue;
}

export interface Product {
  barcode: string;
  name: string;
  brand: string | null;
  quantity: string | null;
  servingSize: string | null;
  imageUrl: string | null;
  ingredients: string | null;
  allergens: string[];
  traces: string[];
  additives: string[];
  categories: string | null;
  packaging: string | null;
  origins: string | null;
  nutrition: ProductNutrition;
}

export type ProductFetchResult =
  | { status: 'found'; product: Product }
  | { status: 'not_found'; barcode: string; message?: string }
  | {
      status: 'error';
      barcode: string;
      errorType: 'network' | 'timeout' | 'server' | 'parse';
      message: string;
    };

// Open Food Facts API v3 schema types
export interface OpenFoodFactsNutriments {
  'energy-kcal'?: number;
  'energy-kcal_100g'?: number;
  'energy-kcal_unit'?: string;
  'energy-kj'?: number;
  'energy-kj_100g'?: number;
  'energy_100g'?: number;
  'energy_unit'?: string;
  fat?: number;
  fat_100g?: number;
  fat_unit?: string;
  'saturated-fat'?: number;
  'saturated-fat_100g'?: number;
  'saturated-fat_unit'?: string;
  carbohydrates?: number;
  carbohydrates_100g?: number;
  carbohydrates_unit?: string;
  sugars?: number;
  sugars_100g?: number;
  sugars_unit?: string;
  fiber?: number;
  fiber_100g?: number;
  fiber_unit?: string;
  proteins?: number;
  proteins_100g?: number;
  proteins_unit?: string;
  salt?: number;
  salt_100g?: number;
  salt_unit?: string;
  sodium?: number;
  sodium_100g?: number;
  sodium_unit?: string;
  [key: string]: unknown;
}

export interface OpenFoodFactsProductV3 {
  code?: string;
  _id?: string;
  product_name?: string;
  product_name_en?: string;
  brands?: string;
  quantity?: string;
  serving_size?: string;
  image_front_url?: string;
  image_front_small_url?: string;
  ingredients_text?: string;
  ingredients_text_en?: string;
  allergens_tags?: string[];
  traces_tags?: string[];
  additives_tags?: string[];
  categories?: string;
  packaging?: string;
  origins?: string;
  nutriments?: OpenFoodFactsNutriments;
  [key: string]: unknown;
}

export interface OpenFoodFactsV3Response {
  code?: string;
  status: 'success' | 'failure' | string;
  result?: {
    id: string;
    lc_name?: string;
    name?: string;
  };
  product?: OpenFoodFactsProductV3;
  errors?: Array<{ field?: unknown; message?: unknown }>;
  warnings?: Array<{ field?: unknown; message?: unknown }>;
  // Backward compatibility with legacy v2 payloads
  status_verbose?: string;
}
