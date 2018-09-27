import renderer from 'react-test-renderer';
import React from 'react';
import HomeFooter from '..';

describe('The HomeFooter', () => {
  it('should not regress', () => {
    const tree = renderer.create(<HomeFooter />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
