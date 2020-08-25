import React, { useContext, useEffect } from 'react';
import RecipesContext from '../Context/';
import '../Styles/DetailsIngredient.css';

const checkIndex = (isChecked, ingredient, setIsChecked) => (
  isChecked.includes(ingredient)
    ? setIsChecked(
      [...isChecked].filter((bool) => (
        bool !== ingredient
      )),
    )
    : setIsChecked([...isChecked, ingredient])
);

const checkboxMark = (foodDetail, isChecked) => {
  const inProgress = JSON.parse(localStorage.getItem('in-progress')) || [];
  const includesFood = inProgress.includes(foodDetail);
  if (includesFood) localStorage.setItem(foodDetail, JSON.stringify(isChecked));
};

const isCheckboxMark = (foodDetail, setIsChecked) => {
  if (localStorage.getItem(foodDetail)) {
    setIsChecked([...JSON.parse(localStorage.getItem(foodDetail))]);
  }
};

const ingredientName = (index, ingredientToShow, boolCheck) => (
  <span
    className={boolCheck ? 'wordStriking' : 'false'}
    data-testid={`${index}-ingredient-name`}
  >
    {ingredientToShow}
  </span>
);

const measureText = (index, measureToShow, boolCheck) => (
  <span
    data-testid={`${index}-ingredient-measure`}
    className={boolCheck ? 'wordStriking' : 'false'}
  >
    {measureToShow}
  </span>
);

const ingredientsList = (isFood) => (
  Object.keys(isFood).filter((food) => (
    food.includes('Ingredient')
  ))
);

const measuresList = (isFood) => (
  Object.keys(isFood).filter((food) => (
    food.includes('Measure')
  ))
);

const toShow = (
  isIngredient, isFood, isMeasure,
  isChecked, setIsChecked, isRecipeStarted,
) => (
  <div>
    {isIngredient.map((ingredient, index) => {
      const ingredientToShow = isFood[ingredient];
      const measureToShow = isFood[isMeasure[index]];
      const ingAndMeasure = `${ingredientToShow} - ${measureToShow}`;
      const boolCheck = isChecked.includes(ingAndMeasure);
      return (
        ingredientToShow
        && <div key={`${ingredient} and ${isMeasure[index]} to Recipe`}>
          {<div>
            {isRecipeStarted &&
              <input
                type="checkbox"
                checked={boolCheck}
                onChange={() => checkIndex(isChecked, ingAndMeasure, setIsChecked)}
              />
            }
            {ingredientName(index, ingredientToShow, boolCheck && isRecipeStarted)}
            <span> - </span>
            {measureText(index, measureToShow, boolCheck && isRecipeStarted)}
          </div>}
        </div>
      );
    })}
  </div>
);

const DetailsIngredients = () => {
  const {
    foodObject, isChecked, setIsChecked, isRecipeStarted, foodDetail,
  } = useContext(RecipesContext);
  const receive = foodObject.meals || foodObject.drinks;
  const isFood = receive[0];
  const isIngredient = ingredientsList(isFood);
  const isMeasure = measuresList(isFood);

  useEffect(() => {
    isCheckboxMark(foodDetail, setIsChecked);
  }, []);

  useEffect(() => {
    checkboxMark(foodDetail, isChecked);
  }, [isChecked]);

  useEffect(() => () => setIsChecked([]), []);
  return (
    <div className="ingredientContainer">
      {isIngredient
        && <div className="ingredientInfo">
          <h4>Ingredients</h4>
          {toShow(
            isIngredient, isFood, isMeasure,
            isChecked, setIsChecked, isRecipeStarted,
          )}
        </div>
      }
    </div>
  );
};

export default DetailsIngredients;
