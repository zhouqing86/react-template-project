import React from 'react';
import PropTypes from 'prop-types';
import { Button, makeStyles } from '@material-ui/core';
import { Book as BookIcon } from 'react-feather';
import clsx from 'clsx';
import config from 'src/config';

const useStyles = makeStyles(() => ({
  app: {
    textAlign: 'center',
  },
}));

const HomeView = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <div className={clsx(className, classes.app)} {...rest}>
      <Button variant="contained" color="primary" startIcon={<BookIcon />}>
        Learn React
      </Button>
      {config.API_BASE_URL}
    </div>
  );
};

HomeView.propTypes = {
  className: PropTypes.string,
};

export default HomeView;
