import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Plus as PlusIcon, Minus as MinusIcon } from 'react-feather';
import clsx from 'clsx';
import Page from 'src/components/Page';
import { selectCount, increment, decrement } from './countReducer';

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
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <Page className={classes.root} title="Home">
      <div className={clsx(className, classes.app)} {...rest}>
        <IconButton aria-label="Increment" onClick={() => dispatch(increment())}>
          <PlusIcon />
        </IconButton>
        <IconButton aria-label="Decrement" onClick={() => dispatch(decrement())}>
          <MinusIcon />
        </IconButton>
        {count}
      </div>
    </Page>
  );
};

HomeView.propTypes = {
  className: PropTypes.string,
};

export default HomeView;
