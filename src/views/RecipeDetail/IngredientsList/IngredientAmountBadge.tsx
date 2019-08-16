import React from 'react';
import { RecipeIngredient } from '../../../state/types/RecipeIngredient';

export const IngredientAmountBadge: React.FC<{ ingredient: RecipeIngredient; className?: string; fractionAmountClassName?: string }> = ({
  ingredient,
  className = '',
  fractionAmountClassName = '',
}) => {
  if (ingredient.ramount.integer) {
    return <span className={className}>{ingredient.ramount.integer}</span>;
  }
  if (ingredient.ramount.denominator && ingredient.ramount.numerator) {
    return (
      <span className={className}>
        {ingredient.ramount.integer && ingredient.ramount.integer}
        <span className={fractionAmountClassName}>
          <sup>{ingredient.ramount.numerator}</sup>&frasl;<sub>{ingredient.ramount.denominator}</sub>&nbsp;
        </span>
      </span>
    );
  }
  return null;
};
