import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, cleanup, fireEvent,wait, getAllByTestId } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';
import Provider from '../Context/AppProvider';

afterEach(cleanup);

describe('Test Receitas',  () => {
  it('Test Render', async ()=> {
    jest.spyOn(global, 'fetch')
    .mockImplementationOnce(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve({
        categories: [{strCategory:'test'}]
      }),
    }))
    .mockImplementationOnce(() => Promise.resolve({
      ok:true,
      json: () => Promise.resolve({
        meals: [{idMeal:"52901",strMeal:"Rock Cakes",strDrinkAlternate:null,strCategory:"Dessert",strArea:"British", strMealThumb:"https:www.themealdb.com/images/media/meals/tqrrsq1511723764.jpg"}],
      })
    }))
    const history = createMemoryHistory()
    const { getByTestId,findByText, getByText } = render(
      <Provider>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const loginButton = getByTestId('login-submit-btn');
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.click(loginButton);
    await findByText('test')
    expect(window.location.pathname).toBe('/receitas/comidas');
    console.log(getByTestId('0-card-name').innerHTML)
    expect(getByTestId('0-card-name')).toBeInTheDocument();
  });
});
