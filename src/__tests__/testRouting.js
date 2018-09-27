import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import NotFound from '../views/NotFound';
import LandingPage from '../views/LandingPage/index';
import App from '../views/App';
import enzymeConfig from '../testConfigurations/enzymeConfig';
import * as routes from '../routes';

enzymeConfig();

describe('The routing set up', () => {
  const wrapper = path => mount(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );

  it('should render landing page on the index route', () => {
    expect(wrapper(routes.INDEX_ROUTE).find(LandingPage)).toHaveLength(1);
  });

  it('should render not found page on an unknown route', () => {
    expect(wrapper('/random').find(NotFound)).toHaveLength(1);
  });
});
