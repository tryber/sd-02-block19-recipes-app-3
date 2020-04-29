export const cocktail = 'thecocktaildb';
export const meal = 'themealdb';
export const resultsRandom = '/random.php';

export const apiRequest = (requisition) => {
  const drinkOrMeal = window.location.href.includes('comidas') ? meal : cocktail;
  return (
    global.fetch(`https://www.${drinkOrMeal}.com/api/json/v1/1${requisition}`)
      .then((response) => response.json()
        .then(response.ok ? Promise.resolve(JSON) : Promise.reject(JSON)))
  );
};
