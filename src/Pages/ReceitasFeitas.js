import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import HeaderPerfil from '../Components/HeaderPerfil';
import CopyButton from '../Components/CopyButton';
import '../Styles/ReceitasFeitas.css';
import RecipesContext from '../Context';

export const renderButtons = (setDoneRecipes, copyDone) => (
  <div className="buttonFilter">
    <button
      data-testid="filter-by-all-btn"
      type="button"
      onClick={() => setDoneRecipes(copyDone)}
    >
      All
      </button>
    <button
      data-testid="filter-by-food-btn"
      type="button"
      onClick={() => setDoneRecipes(copyDone.filter(({ idMeal }) => idMeal))}
    >
      Food
      </button>
    <button
      data-testid="filter-by-drink-btn"
      type="button"
      onClick={() => setDoneRecipes(copyDone.filter(({ idDrink }) => idDrink))}
    >
      Drinks
      </button>
  </div>
);

const renderCopyButton = (index, food, type) => (<CopyButton
  className="copyButton"
  index={index}
  url={`${window.location.origin}/receitas/${food.idMeal ? 'comidas' : 'bebidas'}/${food[`id${type}`]}`}
/>);

export const renderCard = (index, food, type, dataFinal, inputLike, setFoodDetail) => (
  <div className="HorizontalCard" key={food[`str${type}`]}>
    <Link className="linkDone" to={`/receitas/${food.idMeal ? 'comidas' : 'bebidas'}/${food[`id${type}`]}`}>
      <img
        className="imageDone"
        data-testid={`${index}-horizontal-image`}
        alt={food[`str${type}`]}
        src={food[`str${type}Thumb`]}
      />
    </Link>
    <div className="containText">
      {inputLike && inputLike()}
      {renderCopyButton(index, food, type)}
      <p className="text" data-testid={`${index}-horizontal-top-text`}>
        {food.strAlcoholic ? `${food.strAlcoholic} Drink` : `${food.strArea} - ${food.strCategory}`}
      </p>
      <Link
        onClick={() => setFoodDetail(food.idMeal || food.idDrink)}
        to={`/receitas/${food.idMeal ? 'comidas' : 'bebidas'}/${food[`id${type}`]}`}
      >
        <p className="text" data-testid={`${index}-horizontal-name`}>{food[`str${type}`]}</p>
      </Link>
      {dataFinal && <p className="text" data-testid={`${index}-horizontal-done-date`}>{`Feita em ${dataFinal}`}</p>}
    </div>
  </div>
);

const ReceitasFeitas = () => {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [copyDone, setCopyDone] = useState([]);
  const { setFoodDetail } = useContext(RecipesContext);
  useEffect(() => {
    const done = JSON.parse(localStorage.getItem('done-recipes')) || [];
    setDoneRecipes(done);
    setCopyDone(done);
  }, []);
  return (
    <div >
      <div className="headerDone">
        <HeaderPerfil />
        {doneRecipes && renderButtons(setDoneRecipes, copyDone)}
      </div>
      <div className="containCards">
        {doneRecipes.map((food, index) => {
          const type = food.idMeal ? 'Meal' : 'Drink';
          const dataFormatada = food.doneDate.substring(0, food.doneDate.indexOf('T')).split('-');
          const dataFinal = `${dataFormatada[2]}-${dataFormatada[1]}-${dataFormatada[0]}`;
          return renderCard(index, food, type, dataFinal, null, setFoodDetail);
        })}
      </div>
    </div>);
};

export default ReceitasFeitas;
