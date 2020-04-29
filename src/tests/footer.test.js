import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Footer from '../Components/Footer';
import Provider from '../Context/AppProvider';

afterEach(cleanup);

describe('Test footer', ()=> {
  it('render footer', () => {
    const { getByTestId } = render(
      <Provider>
        <MemoryRouter>
          <Footer />
        </MemoryRouter>,
      </Provider>
    );
    expect(getByTestId('drinks-bottom-btn')).toBeInTheDocument();
    expect(getByTestId('explore-bottom-btn')).toBeInTheDocument();
    expect(getByTestId('food-bottom-btn')).toBeInTheDocument();
  });
  it('click buttons', () => {
    const { getByTestId } = render(
      <Provider>
        <MemoryRouter>
          <Footer />
        </MemoryRouter>,
      </Provider>
    );
    fireEvent.click(getByTestId('drinks-bottom-btn'));
    fireEvent.click(getByTestId('explore-bottom-btn'));
    fireEvent.click(getByTestId('food-bottom-btn'));
  });
});
