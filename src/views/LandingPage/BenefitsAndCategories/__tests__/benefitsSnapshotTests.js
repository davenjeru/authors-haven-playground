import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import BenefitsAndCategories from '../index';
import { benefitsArray, featuredCategories } from '../../__mocks__/mockData';

describe('BenefitsAndCategories', () => {
  it('should not regress', () => {
    const tree = renderer.create(
      <MemoryRouter>
        <BenefitsAndCategories
          benefitsArray={benefitsArray}
          featuredCategories={featuredCategories}
        />
      </MemoryRouter>);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
