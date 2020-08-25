import React, { useContext } from 'react';
import HeaderPic from './HeaderPic';
import HeaderName from './HeaderName';
import RecipesContext from '../Context';


const HeaderPerfil = () => {
  const { pageName } = useContext(RecipesContext);
  return (
    <div>
      <div className="ContainerHeaderP">
        <div className="headerPerfil">
          <HeaderPic />
          <HeaderName classHeader="HeaderName" />
        </div>
      </div>
      {pageName !== 'Receitas Feitas' && pageName !== 'Receitas Favoritas' ? <h2 className="HeaderNameh2" data-testid="profile-email">
        {JSON.parse(localStorage.getItem('user')).email}
      </h2> : null}
    </div>
  );
};

export default HeaderPerfil;
