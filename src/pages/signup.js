import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import MuiAlert from '@material-ui/lab/Alert';
import { isLoggedIn } from '../appState';
import Avatar from '@material-ui/core/Avatar';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { SIGN_UP } from '../gql/mutation';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
  const classes = useStyles();
  const [values, setValues] = useState();
  const onChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  // mutation signUp
  const [signUp, { loading, error, data }] = useMutation(SIGN_UP, {
    onCompleted: data => {
      // store the token
      localStorage.setItem('token', data.signUp);
      // set isLoggedIn to true
      isLoggedIn(true);
      // redirect the user to the homepage
      props.history.push('/');
      // reload page
      // props.history.go(0);
    },
  });

  const onSubmit = e => {
    e.preventDefault();
    signUp({
      variables: { ...values },
    });
  };
  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h2" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="username"
                variant="outlined"
                required
                fullWidth
                label="Username"
                onChange={onChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Email Address"
                name="email"
                onChange={onChange}
                type="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                onChange={onChange}
                autoComplete="current-password"
              />
              {error && <Alert severity="error">{error.message}</Alert>}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/signin" variant="body2">
                Sudah pernah mendaftar? Sign IN!
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
