import React, { useState, useContext } from 'react';
import { DebounceInput } from 'react-debounce-input';
import RecipesContext from '../Context';
import HeaderInput from './HeaderInput';
import CategoryBar from './CategoryBar';
import DropdownOrigem from './DropdownOrigem';
import HeaderName from './HeaderName';
import HeaderPic from './HeaderPic';
import '../Styles/Header.css';

const toSearchAndProfile = (setSearchCriteria, setInput) => (
  <div className="Header_father">
    <HeaderPic />
    <HeaderName />
    {HeaderInput(setSearchCriteria, setInput)}
  </div>
);

const renderRadio = (radioChange) => {
  const arrayRadio = ['Ingrediente', 'Nome', 'Primeira letra'];
  const testIdRadio = ['ingredient', 'name', 'first-letter'];
  const arrayValueRadio = ['/filter.php?i=', '/search.php?s=', '/search.php?f='];
  return arrayRadio.map((ele, index) => (
    <div key={ele}>
      <input
        type="radio"
        name="recipeSearch"
        value={arrayValueRadio[index]}
        onClick={(e) => radioChange(e.target.value)}
        id={ele}
        data-testid={`${testIdRadio[index]}-search-radio`}
      />
      <label htmlFor={ele}>{ele}</label>
    </div>
  ));
};

const renderDebounce = (searchCriteria, inputChange, input) => (
  <div className="Debounce_father">
    <DebounceInput
      value={input}
      className="Debounce_input"
      disabled={!searchCriteria}
      debounceTimeout={600}
      placeholder="Buscar Receita"
      onChange={(e) => inputChange(e.target.value)}
      data-testid="search-input"
      maxLength={searchCriteria === '/search.php?f=' ? 1 : 30}
    />
  </div>
);
const arrayPName = ['/explorar', '/explorar/comidas', '/explorar/bebidas', '/explorar/bebidas/ingredientes', '/explorar/comidas/ingredientes'];
export default function Header() {
  const [searchCriteria, setSearchCriteria] = useState('');
  const [input, setInput] = useState('');
  const { defineSearch, visibleSearch, setRequestInitialPage, pageName,
  } = useContext(RecipesContext);
  const inputChange = (iValue) => {
    setInput(iValue);
    setRequestInitialPage([]);
    setInput(iValue);
    defineSearch(iValue, searchCriteria);
  };
  const radioChange = (rValue) => {
    setSearchCriteria(rValue);
    setInput('');
    if (input !== '') defineSearch(input, rValue);
  };
  return (
    <div className="Header_all">
      {toSearchAndProfile(setSearchCriteria, setInput)}
      <div className="Header_Search">
        {pageName === 'Explorar Origem' && window.location.href.includes('comidas')
          ? <DropdownOrigem />
          : !window.location.pathname.match(/explorar/) && <CategoryBar />
        }
        {(visibleSearch && !arrayPName.includes(window.location.pathname)) && (
          <div> {renderDebounce(searchCriteria, inputChange, input)}

            <div className="Recipes_radio">{renderRadio(radioChange)}</div>
          </div>)}
      </div>
    </div>
  );
}
