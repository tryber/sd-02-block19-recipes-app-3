import React, { useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import RecipesContext from '../Context';

const inProgress = JSON.parse(localStorage.getItem('in-progress')) || [];
const doneLocalStorage = JSON.parse(localStorage.getItem('done-recipes')) || [];
const classSelect = (finish) => (
  finish ? 'red' : 'green'
);
const finish = (isRecipeStarted, foodDetail, isIngredient) => (
  isRecipeStarted && JSON.parse(localStorage.getItem(foodDetail)).length + 1
  !== isIngredient.length
);

const insertLocalStorage = (isRecipeStarted, setIsRecipeStarted, foodDetail, setIsFinish) => {
  if (!inProgress.includes(foodDetail)) {
    localStorage.setItem(foodDetail, JSON.stringify([]));
    localStorage.setItem('in-progress', inProgress ? JSON.stringify([...inProgress, foodDetail])
      : JSON.stringify([foodDetail]),
    );
  }
  setIsRecipeStarted(!isRecipeStarted);
  setIsFinish(true);
};

const redirectAndDone = (setIsRedirect, foodObject, foodDetail, setPageName) => {
  localStorage.removeItem(foodDetail);
  localStorage.setItem('in-progress', JSON.stringify(JSON.parse(localStorage.getItem('in-progress')).filter((item) => item !== foodDetail)));
  const doneRecipes = JSON.parse(localStorage.getItem('done-recipes'));
  const mealsOrDrinks = foodObject.meals || foodObject.drinks;
  const firstObjArray = mealsOrDrinks[0];
  const done = {
    ...firstObjArray,
    doneDate: new Date(),
  };
  localStorage.setItem('done-recipes', doneRecipes
  ? JSON.stringify([...doneRecipes, done])
  : JSON.stringify([done]),
  );
  setPageName('Receitas Feitas');
  return setIsRedirect(true);
};

const StartRecipe = () => {
  const {
    isRecipeStarted, setIsRecipeStarted, foodDetail, foodObject, setPageName,
  } = useContext(RecipesContext);
  const [isFinish, setIsFinish] = useState(false);
  const [isRedirect, setIsRedirect] = useState(false);
  const receive = foodObject.meals || foodObject.drinks;
  const isFood = receive[0];
  const isIngredient = Object.keys(isFood).filter((food) => (
    food.includes('Ingredient') && isFood[food]
  ));
  useEffect(() => { setIsFinish(false); }, [window.location.href]);
  useEffect(() => () => setIsRecipeStarted(false), []);
  const isDone = doneLocalStorage.some(({ idDrink, idMeal }) => (
    idDrink === foodDetail) || idMeal === foodDetail);
  const startOrEnd = inProgress.includes(foodDetail) ? 'Continuar Receita' : 'Iniciar Receita';
  return isRedirect ? <Redirect to="/receitas-feitas" /> : (
    <div className="containStart">
      {!isDone && <button
        className={`buttonGreen fixedButton ${classSelect(finish(isRecipeStarted, foodDetail, isIngredient))}`}
        disabled={finish(isRecipeStarted, foodDetail, isIngredient)}
        data-testid={`${!isRecipeStarted && 'start-recipe-btn'}`}
        type="button"
        onClick={() => (!isFinish
          ? insertLocalStorage(isRecipeStarted, setIsRecipeStarted, foodDetail, setIsFinish)
          : redirectAndDone(setIsRedirect, foodObject, foodDetail,setPageName))}
      >{!isFinish ? startOrEnd : 'Finalizar Receita'}</button>}
    </div >
  );
};

export default StartRecipe;
