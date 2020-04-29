import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Drinks from '../Images/Drinks.svg';
import Explore from '../Images/Explore.svg';
import Meals from '../Images/Meals.svg';
import RecipesContext from '../Context';
import '../Styles/Footer.css';

const DrinksToFooter = (setRequestInitialPage) => (
  <Link
    to="/receitas/bebidas"
    >
    <input 
      type="image"
      onClick={() => setRequestInitialPage([])}
      data-testid="drinks-bottom-btn"
      className="Footer_icon"
      src={Drinks} alt="Drinks redirect" />
  </Link>
);

const ExploreToFooter = (setRequestInitialPage) => (
  <Link
  to="/explorar"
  >
    <input 
      type="image"
      onClick={() => setRequestInitialPage([])}
      data-testid="explore-bottom-btn"
      className="Footer_icon"
      src={Explore} alt="Explore redirect" />
  </Link>
);

const MealsToFooter = (setRequestInitialPage) => (
  <Link
  to="/receitas/comidas"
  >
    <input 
      onClick={() => setRequestInitialPage([])}
      type="image"
      data-testid="food-bottom-btn"
      className="Footer_icon"
      src={Meals} alt="Meals redirect"
    />
  </Link>
);

const Footer = () => {
  const { setRequestInitialPage } = useContext(RecipesContext);
  return (
    <div className="Footer_all">
      {DrinksToFooter(setRequestInitialPage)}
      {ExploreToFooter(setRequestInitialPage)}
      {MealsToFooter(setRequestInitialPage)}
    </div>
  );
};

export default Footer;
