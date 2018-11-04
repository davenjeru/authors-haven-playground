import renderer from 'react-test-renderer';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from '..';

describe('The NavBar', () => {
  it('should not regress', () => {
    const tree = renderer.create(<MemoryRouter><NavBar /></MemoryRouter>);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
