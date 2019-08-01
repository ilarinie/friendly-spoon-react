import { DifficultyLevel } from './DifficultyLevel';
import { Duration } from './Duration';
import { Picture } from './Picture';
import { RecipeIngredient } from './RecipeIngredient';
import { RecipeTag } from './RecipeTag';
import { Note } from './Note';
import { RecipeIngredientGroup } from './RecipeIngredientGroup';

export interface RecipeFull {
  id: number;
  user_id: number;
  name: string;
  level: DifficultyLevel;
  duration: Duration;
  instruction: string;
  ratingaverage: number;
  public: boolean;
  keyword: string;
  introduction: string;
  cover_picture_id: number;
  coverpicture: Picture;
  ratingcount: number;
  recipe_ingredients: RecipeIngredient[];
  recipe_tags: RecipeTag;
  notes: Note[];
  recipe_pictures: Picture[];
  recipe_ingredient_groups: RecipeIngredientGroup[];
}