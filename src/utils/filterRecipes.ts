import { RecipeMeta } from '../state/types/RecipeMeta';

export const filterRecipes = (recipeMeta: RecipeMeta, searchTerm: string): boolean => {
  const normalizedSearchTerm = searchTerm.toLowerCase();

  for (let i = 0; i < recipeMeta.recipe_tags.length; i++) {
    if (recipeMeta.recipe_tags[i].tag.title.toLowerCase().includes(normalizedSearchTerm)) {
      return true;
    }
  }
  return recipeMeta.name.toLowerCase().includes(normalizedSearchTerm);
};
