import React from 'react';
import Box from 'grommet/components/Box';
import Section from 'grommet/components/Section';
import Paragraph from 'grommet/components/Paragraph';
import Button from 'grommet/components/Button';
import Anchor from 'grommet/components/Anchor';
import Split from 'grommet/components/Split';

export default function AstroHomeSignedIn() {
  return (
    <Box className="home__section" align="center" colorIndex="accent-3" direction="row" size="full" pad="large" justify="center">
      <Button href="#" type="button" label="Google Drive" />
      <Paragraph align="start">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
      </Paragraph>
    </Box>
  );
}
