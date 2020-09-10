import React from 'react';
import PropTypes from 'prop-types';
import { Button, makeStyles } from '@material-ui/core';
import { Book as BookIcon } from 'react-feather';
import clsx from 'clsx';
import config from 'src/config';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  app: {
    textAlign: 'center',
  },
}));

const HomeView = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Home">
      <div className={clsx(className, classes.app)} {...rest}>
        <Button variant="contained" color="primary" startIcon={<BookIcon />}>
          Learn React
        </Button>
        {config.API_BASE_URL}
      </div>
    </Page>
  );
};

HomeView.propTypes = {
  className: PropTypes.string,
};

export default HomeView;
