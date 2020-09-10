import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Box, makeStyles } from '@material-ui/core';
import Logo from 'src/components/Logo';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.background.dark}`,
  },
  logo: {
    width: '30px',
    marginLeft: theme.spacing(1),
  },
}));

const Header = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Box className={clsx(classes.root, className)} {...rest}>
      <Link to="/">
        <Logo className={classes.logo} />
      </Link>
    </Box>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
