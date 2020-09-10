import React from 'react';
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Header from './Header';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
  header: {
    width: '100%',
  },
  context: {
    width: '100%',
  },
}));

const MainLayout = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header className={classes.header} />
      <div className={classes.context}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
