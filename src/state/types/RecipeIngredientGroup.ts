import { RecipeIngredient } from './RecipeIngredient';

export interface RecipeIngredientGroup {
  id: number;
  name: string;
  index: number;
  recipe_ingredients: RecipeIngredient[];
}