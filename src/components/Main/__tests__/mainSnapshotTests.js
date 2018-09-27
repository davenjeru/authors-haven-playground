import renderer from 'react-test-renderer';
import React from 'react';
import Main from '..';

describe('The Main element', () => {
  it('should not regress', () => {
    const tree = renderer.create(<Main />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
