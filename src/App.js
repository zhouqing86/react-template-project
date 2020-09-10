import React from 'react';
import PropTypes from 'prop-types';
import { Button, ThemeProvider, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import theme from './theme';

const useStyles = makeStyles(() => ({
  app: {
    textAlign: 'center',
  },
}));

const App = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={clsx(className, classes.app)} {...rest}>
        <Button variant="contained" color="primary">
          Learn React
        </Button>
      </div>
    </ThemeProvider>
  );
};

App.propTypes = {
  className: PropTypes.string,
};

export default App;
