import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useCookies } from 'react-cookie';
import { get, isEmpty } from 'lodash';
import { Box, Button, Container, TextField, Typography, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import config from 'src/config';
import { login as loginApi } from 'src/api/loginApi';
import { appendErrorMessage } from 'src/utils/StringUtils';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.white,
    marginTop: theme.spacing(10),
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  alert: {
    color: 'red',
  },
}));

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState('');
  const [, setCookie, removeCookie] = useCookies('token');

  return (
    <Page className={classes.root} title="Login">
      <Box display="flex" flexDirection="column" height="70%" justifyContent="center">
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              username: 'admin',
              password: '123456',
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string().max(255).required('User name is required'),
              password: Yup.string().max(255).required('Password is required'),
            })}
            onSubmit={async (values) => {
              try {
                const response = await loginApi({
                  username: values.username,
                  password: values.password,
                });
                const token = get(response, 'data.token', '');

                if (isEmpty(token)) {
                  setErrMsg('Login failed, token is empty');
                  removeCookie('token');
                } else {
                  setCookie('token', token, { maxAge: 1 * 60 * 60 * 24, path: config.ADMIN_CONTEXT_PATH });
                  navigate(`${config.ADMIN_CONTEXT_PATH}/users`, { replace: true });
                }
              } catch (err) {
                const message = appendErrorMessage('Failed to login', err);
                console.log(message);
                if (/401$/.test(err.message)) {
                  setErrMsg('Your username or password is incorrect!');
                } else {
                  setErrMsg(message);
                }
                removeCookie('token');
              }
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Sign in
                  </Typography>
                  {errMsg && (
                    <Typography variant="subtitle2" className={classes.alert}>
                      {errMsg}
                    </Typography>
                  )}
                </Box>
                <TextField
                  error={Boolean(touched.username && errors.username)}
                  fullWidth
                  helperText={touched.username && errors.username}
                  label="User Name"
                  margin="normal"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="username"
                  value={values.username}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button color="primary" disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                    Sign in now
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  Don&apos;t have an account? Please ask super user to add a new account.
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
