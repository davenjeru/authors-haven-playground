import renderer from 'react-test-renderer';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import RedirectCountdownAlert from '../../components/SignUp/RedirectCountdownAlert';

describe('The SignUpFormCard', () => {
  it('should not regress', () => {
    const tree = renderer.create(
      <MemoryRouter>
        <RedirectCountdownAlert secondsToRedirect={10} />
      </MemoryRouter>);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
