import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import Testimonials from '..';
import { testimonialsArray } from '../../__mocks__/mockData';

describe('The Testimonials', () => {
  it('should not regress', () => {
    const tree = renderer.create(
      <MemoryRouter>
        <Testimonials testimonialsArray={testimonialsArray} />
      </MemoryRouter>);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
