import { Picture } from './Picture';
import { RecipeTag } from './RecipeTag';
import { DifficultyLevel } from './DifficultyLevel';
import { Duration } from '@material-ui/core/styles';

export interface RecipeMeta {
    id: number;
    user_id: number;
    name: string;
    level: DifficultyLevel;
    duration: Duration;
    instruction: string;
    ratingaverage: number;
    introduction: string;
    cover_picture_id: number;
    coverpicture: Picture;
    ratingcount: number;
    created_at: string;
    recipe_tags: RecipeTag[];
    recipe_pictures: Picture[];
}