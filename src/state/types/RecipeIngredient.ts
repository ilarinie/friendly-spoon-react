export interface RecipeIngredient {
    id: number;
    ingredient: {
        id: number;
        name: string;
        created_at: string;
        updated_at: string;
    },
    ramount: IngredientAmount;
    amount: number | null;
    double: IngredientAmount;
    half: IngredientAmount;
    unit: {
        id: number;
        name: string;
        created_at: string;
        updated_at: string;
    } | null;
    unit_id: number | null; 
    instruction: string | null;
    index: number;
    rounded_amount: number;
}

interface IngredientAmount {
  integer: number | null;
  denominator: number | null;
  nominator: number | null; 
}