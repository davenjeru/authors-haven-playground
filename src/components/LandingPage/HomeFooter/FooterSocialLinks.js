import React from 'react';
import IconLink from '../../commons/IconLink';

const FooterSocialLinks = () => (
  <div className="text-center">
    <h5>Follow</h5>
    <IconLink
      href="https://www.instagram.com"
      iconClasses="fa fa-3x fa-instagram text-muted p-2"
    />
    <IconLink
      href="https://www.facebook.com"
      iconClasses="fa fa-facebook-square text-muted fa-3x p-2"
    />
    <IconLink
      href="https://twitter.com"
      iconClasses="fa fa-3x fa-twitter text-muted p-2"
    />
    <IconLink
      href="https://plus.google.com"
      iconClasses="fa fa-3x fa-google-plus-official text-muted p-2"
    />
  </div>
);

export default FooterSocialLinks;
