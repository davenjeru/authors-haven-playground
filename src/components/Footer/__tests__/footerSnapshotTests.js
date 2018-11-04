import renderer from 'react-test-renderer';
import React from 'react';
import Footer from '..';

describe('The Footer', () => {
  it('should not regress', () => {
    const tree = renderer.create(<Footer />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
