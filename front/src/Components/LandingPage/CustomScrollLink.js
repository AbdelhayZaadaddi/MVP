import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Button } from '@mui/material';

const CustomScrollLink = ({ to, children, ...props }) => {
  return (
    <ScrollLink to={to} spy={true} smooth={true} duration={500}>
      {({ scroll }) => (
        <Button
          {...props}
          onClick={(e) => {
            e.preventDefault();
            scroll();
          }}
        >
          {children}
        </Button>
      )}
    </ScrollLink>
  );
};

export default CustomScrollLink;
