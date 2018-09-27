import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import LandingPage from '..';

describe('The LandingPage', () => {
  it('should not regress', () => {
    const tree = renderer.create(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
