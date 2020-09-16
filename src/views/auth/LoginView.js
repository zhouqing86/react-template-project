import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Box, Button, Container, TextField, Typography, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import config from 'src/config';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.white,
    marginTop: theme.spacing(10),
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Page className={classes.root} title="Login">
      <Box display="flex" flexDirection="column" height="70%" justifyContent="center">
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              username: 'admin',
              password: 'admin',
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string().max(255).required('User name is required'),
              password: Yup.string().max(255).required('Password is required'),
            })}
            onSubmit={() => {
              navigate(`${config.ADMIN_CONTEXT_PATH}/users`, { replace: true });
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Sign in
                  </Typography>
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
