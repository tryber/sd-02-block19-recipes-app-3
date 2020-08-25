import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Drinks from '../Images/Drinks.svg';
import Explore from '../Images/Explore.svg';
import Meals from '../Images/Meals.svg';
import RecipesContext from '../Context';
import '../Styles/Footer.css';

const DrinksToFooter = (setRequestInitialPage, setPageName, setStopFetching) => (
  <Link
    to="/receitas/bebidas"
    onClick={
      !window.location.href.includes('bebidas')
        ? () => { setRequestInitialPage([]); setPageName('Bebidas'); setStopFetching(false); }
        : null
    }
  >
    <div
      data-testid="drinks-bottom-btn"
      className="Footer_icon"
    >
      <img src={Drinks} alt="Drinks redirect" />
    </div>
  </Link>
);

const ExploreToFooter = (setRequestInitialPage, setPageName, setStopFetching) => (
  <Link
    onClick={() => { setRequestInitialPage([]); setPageName('Explorar'); setStopFetching(false); }}
    to="/explorar"
  >
    <div
      data-testid="explore-bottom-btn"
      className="Footer_icon"
    >
      <img src={Explore} alt="Explore redirect" />
    </div>
  </Link>
);

const MealsToFooter = (setRequestInitialPage, setPageName, setStopFetching, pageName) => (
  <Link
    onClick={
      !window.location.href.includes('comidas') || pageName === 'Explorar Origem'
        ? () => { setRequestInitialPage([]); setPageName('Comidas'); setStopFetching(false); }
        : null
    }
    to="/receitas/comidas"
  >
    <div
      data-testid="food-bottom-btn"
      className="Footer_icon"
    >
      <img src={Meals} alt="Meals redirect" />
    </div>
  </Link>
);

const Footer = () => {
  const {
    setRequestInitialPage, setPageName, setStopFetching, pageName,
  } = useContext(RecipesContext);
  return (
    <div className="Footer_all">
      {DrinksToFooter(setRequestInitialPage, setPageName, setStopFetching)}
      {ExploreToFooter(setRequestInitialPage, setPageName, setStopFetching)}
      {MealsToFooter(setRequestInitialPage, setPageName, setStopFetching, pageName)}
    </div>
  );
};

export default Footer;
