import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import NotFound from '../components/NotFound';
import LandingPage from '../components/LandingPage';
import App from '../App';
import enzymeConfig from '../testConfigurations/enzymeConfig';

enzymeConfig();

describe('The routing set up', () => {
  const wrapper = path => mount(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );

  it('should render landing page on the index route', () => {
    expect(wrapper('/').find(LandingPage)).toHaveLength(1);
  });

  it('should render landing page on an unknown route', () => {
    expect(wrapper('/random').find(NotFound)).toHaveLength(1);
  });
});
