import React, { useContext } from 'react';
import RecipesContext from '../Context';

const DropdownOrigem = () => {
  const { origin,
    visibleSearch,
    searchCountry,
    copy,
    setRequestInitialPage,
  } = useContext(RecipesContext);
  const selectedOrigin = (e) => {
    if (e === '') setRequestInitialPage([...copy]);
    else searchCountry(e);
  };

  return !visibleSearch &&
    (
      <div>
        <select
          data-testid="explore-by-area-dropdown"
          onClick={(e) => selectedOrigin(e.target.value)}
        >
          <option data-testid="All-option" value="">All</option>
          {origin
            .map(({ strArea }) =>
              <option
                data-testid={`${strArea}-option`}
                key={strArea}
                value={`/filter.php?a=${strArea}`}
              >
                {strArea}
              </option>)}
        </select>
      </div>
    );
};

export default DropdownOrigem;
