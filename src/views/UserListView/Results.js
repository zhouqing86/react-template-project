import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Dialog,
  Button,
  DialogActions,
  DialogTitle,
  makeStyles,
} from '@material-ui/core';
import { Edit as EditIcon, Trash2 as Trash2Icon } from 'react-feather';
import config from 'src/config';
import { selectPageData, updatePageData, fetchUsers, removeUser } from './userListReducer';

const useStyles = makeStyles(() => ({
  root: {},
  icon: {
    color: '#000000',
  },
}));

const Results = ({ className, users, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { page, pageSize, totalCount } = useSelector(selectPageData);
  const [open, setOpen] = React.useState(false);
  const [userIdRemoved, setUserIdRemoved] = useState('');

  const handleLimitChange = (event) => {
    dispatch(
      updatePageData({
        pageSize: event.target.value,
        page: 0,
      })
    );
    dispatch(fetchUsers());
  };

  const handlePageChange = (event, newPage) => {
    dispatch(
      updatePageData({
        page: newPage,
      })
    );
    dispatch(fetchUsers());
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemove = () => {
    setOpen(false);
    if (userIdRemoved !== '') {
      dispatch(removeUser(userIdRemoved));

      setTimeout(() => dispatch(fetchUsers()), 500);
    }
  };

  const removeUserById = (userId) => {
    setOpen(true);
    setUserIdRemoved(String(userId));
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Alias Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Operation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow hover key={user.id}>
                  <TableCell>
                    <Box alignItems="center" display="flex">
                      <Typography color="textPrimary" variant="body1">
                        {user.username}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{user.alias}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <RouterLink to={`${config.ADMIN_CONTEXT_PATH}/user/${user.id}`}>
                      <EditIcon className={classes.icon} />
                    </RouterLink>
                    <RouterLink to="#" onClick={() => removeUserById(user.id)}>
                      <Trash2Icon className={classes.icon} />
                    </RouterLink>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={totalCount}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={pageSize}
        rowsPerPageOptions={[3, 5, 10, 25, 50]}
      />
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title">
        <DialogTitle id="alert-dialog-title">Are you sure to delete the form?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRemove} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired,
};

export default Results;
