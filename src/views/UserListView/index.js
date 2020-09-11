import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Dialog, DialogContent, CircularProgress, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import { fetchUsers, selectUsers, selectIsPageLoading } from './userListReducer';
import Toolbar from './Toolbar';
import Results from './Results';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const UserListView = () => {
  const classes = useStyles();
  const users = useSelector(selectUsers);
  const isPagePending = useSelector(selectIsPageLoading);
  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);

  useEffect(() => {
    const fetchFormList = () => {
      stableDispatch(fetchUsers());
    };

    fetchFormList();
  }, [stableDispatch]);

  return (
    <Page className={classes.root} title="Form List">
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results users={users} />
        </Box>
        <Dialog open={isPagePending}>
          <DialogContent>
            <CircularProgress />
          </DialogContent>
        </Dialog>
      </Container>
    </Page>
  );
};

export default UserListView;
