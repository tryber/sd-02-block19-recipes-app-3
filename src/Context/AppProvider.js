import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { apiRequest, resRdm } from '../Services/APIs';
import RecipesContext from './index';

const conditionToToggle = (
  buttonName,
  usedButton,
  paramRequest,
  toggleOn,
  toggleOff,
) => (
  buttonName === usedButton
    ? toggleOn()
    : toggleOff(paramRequest, buttonName)
);

const verifyRequest = (
  stopFetching, requestInitialPage, setIsFetching,
  setCopy, setDrinkOrMeal,
) => {
  if (stopFetching) return;
  if (requestInitialPage.length >= 12) {
    setIsFetching(false);
    setCopy([...requestInitialPage]);
  }
  if (requestInitialPage.length < 12 && requestInitialPage.length > 0) { setDrinkOrMeal(resRdm); }
};

const categorySearch = (
  input, searchCriteria, copy, setRequestInitialPage, setNoResults, searchResults,
) => {
  if (input !== '' && searchCriteria !== '') {
    searchResults(`${searchCriteria}${input.split(' ').join('_')}`, 'request');
    return;
  }
  setRequestInitialPage([...copy]);
  setNoResults(false);
};

export default function AppProvider({ children }) {
  const local = window.location.pathname.split('/')[3];
  const [requestInitialPage, setRequestInitialPage] = useState([]);
  const [copy, setCopy] = useState([]);
  const [visibleSearch, setVisibleSearch] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [arrayCategory, setArrayCategory] = useState([]);
  const [stopFetching, setStopFetching] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [foodDetail, setFoodDetail] = useState(local);
  const [idDetail, setIdDetail] = useState('');
  const [foodObject, setFoodObject] = useState({});
  const [isRecipeStarted, setIsRecipeStarted] = useState(false);
  const [isChecked, setIsChecked] = useState([]);
  const [pageName, setPageName] = useState('Comidas');
  const [origin, setOrigin] = useState([]);
  const [ingredient, setIngredient] = useState([]);
  const [usedButton, setUsedButton] = useState('');

  const successDrinkOrMeal = (results) => {
    const condition = results.meals || results.drinks;
    setRequestInitialPage([...condition, ...requestInitialPage]);
    setStopFetching(false);
  };

  const failDrinkOrMeal = ({ message }) => {
    setIsFetching(false);
    setFetchError(message);
  };

  const setDrinkOrMeal = (paramRequest) => {
    setNoResults(false);
    apiRequest(paramRequest).then(successDrinkOrMeal, failDrinkOrMeal);
  };

  const successSearch = ({ drinks, meals }) => {
    if (!drinks && !meals) return setNoResults(true);
    setStopFetching(true);
    setIsFetching(false);
    return setRequestInitialPage([...drinks || meals]);
  };

  const toggleOn = () => {
    setUsedButton('');
    setNoResults(false);
    setRequestInitialPage([...copy]);
  };

  const toggleOff = (paramRequest, buttonName) => {
    setUsedButton(buttonName);
    setNoResults(false);
    apiRequest(paramRequest).then(successSearch, failDrinkOrMeal);
  };

  const searchResults = (paramRequest, buttonName) => (
    conditionToToggle(
      buttonName,
      usedButton,
      paramRequest,
      toggleOn,
      toggleOff,
    )
  );

  const successFoodRequest = (apiReturnFood) => {
    setFoodObject(apiReturnFood);
  };

  const idSearch = (searchParam) => {
    apiRequest(searchParam)
      .then(successFoodRequest, failDrinkOrMeal);
  };

  useEffect(() => {
    if (local !== undefined) {
      setFoodDetail(local);
    }
  }, [window.location.href]);

  useEffect(() => {
    verifyRequest(
      stopFetching, requestInitialPage, setIsFetching,
      setCopy, setDrinkOrMeal,
    );
  }, [requestInitialPage]);


  const requestCategory = (requestParam) => (
    apiRequest(requestParam)
      .then((results) => {
        const { categories, drinks } = results;
        setArrayCategory(categories || drinks);
      }, failDrinkOrMeal)
  );

  const requestIngredient = (requestParam) => (
    apiRequest(requestParam)
      .then(({ drinks, meals }) => setIngredient(drinks || meals), failDrinkOrMeal)
  );

  const searchForIngredient = (requestParam) => (
    apiRequest(requestParam)
      .then(successSearch, failDrinkOrMeal)
  );

  const requestOrigin = (requestParam) => (
    apiRequest(requestParam)
      .then(({ meals }) => { setOrigin([...meals]); setStopFetching(false); }, failDrinkOrMeal)
  );

  const requestRandom = () => (
    apiRequest('/random.php')
      .then(({ drinks = [{}], meals = [{}] }) => {
        const { idDrink } = drinks[0];
        const { idMeal } = meals[0];
        setIdDetail(idDrink || idMeal);
        setFoodDetail(idDrink || idMeal);
      }, failDrinkOrMeal)
  );

  const searchCountry = (paramRequest) => {
    setNoResults(false);
    apiRequest(paramRequest).then(successSearch, failDrinkOrMeal);
  };

  const defineSearch = (input, searchCriteria) => {
    categorySearch(
      input, searchCriteria, copy, setRequestInitialPage, setNoResults, searchResults,
    );
  };

  const context = {
    setIsFetching,
    requestInitialPage,
    setRequestInitialPage,
    setDrinkOrMeal,
    fetchError,
    defineSearch,
    isFetching,
    visibleSearch,
    setVisibleSearch,
    requestCategory,
    arrayCategory,
    noResults,
    setFoodDetail,
    foodDetail,
    requestOrigin,
    origin,
    copy,
    pageName,
    setPageName,
    idSearch,
    foodObject,
    isRecipeStarted,
    setIsRecipeStarted,
    isChecked,
    setIsChecked,
    requestRandom,
    searchResults,
    requestIngredient,
    ingredient,
    idDetail,
    setIdDetail,
    searchForIngredient,
    setStopFetching,
    stopFetching,
    searchCountry,
  };

  return (
    <RecipesContext.Provider value={context}>
      {children}
    </RecipesContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
