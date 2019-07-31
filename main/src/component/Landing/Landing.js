import React from 'react';
import * as authActions from '../../action/auth-actions';
import { Link } from 'react-router-dom';
import { AuthForm } from '../AuthForm/AuthForm';
import { connect } from 'react-redux';
import { Grid } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from "@material-ui/core/CardContent";
import './_landing.scss';

class Landing extends React.Component {

  handleSignUp = user => {
    return this.props.pDoSignUp(user);
  };

  handleSignIn = (user) => {
    return this.props.pDoSignIn(user.username, user.password);
  };

render() {

  const signIn =
    <Grid style={{marginTop: '1%'}} container={true} direction='row' alignItems='center'>
      <div className='authForm'>
        <Grid item style={{width: '75%'}}>
          <Card>
            <CardContent>
              <Grid container={true} direction='column' justify='space-evenly' alignItems='center' alignContent='center'>
                <Grid item style={{marginBottom:'5%'}}>
                  <h1>Login</h1>
                </Grid>
                <Grid item>
                  <AuthForm type='signin' onComplete={this.handleSignIn}/>
                </Grid>
                <Grid item>
                  <Link to='/signup'>Create an Account</Link>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </div>
      <img className='handShake' src={require('../../styles/background.jpg')} alt='People Shaking Hands'/>
    </Grid>
  ;

  const signUp =
    <Grid style={{marginTop: '1%'}} container={true} direction='row' alignItems='center'>
      <div>
        <Grid item style={{width: '250px', margin: 'auto'}}>
          <Card>
            <CardContent>
              <Grid container={true} direction='column' justify='space-evenly' alignItems='center' alignContent='center'>
                <Grid item>
                  <h1>Sign Up</h1>
                </Grid>
                <Grid item>
                  <AuthForm type='signup' onComplete={this.handleSignUp}/>
                </Grid>
                <Grid item>
                  <Link to='/signin'>Existing Account</Link>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </div>
      <img className='handShake' src={require('../../styles/background.jpg')} alt='People Shaking Hands'/>
    </Grid>
  ;

  const {location} = this.props;
  return(
    <div>
      <nav>
        {location.pathname === '/' ? signIn : undefined}
        {location.pathname === '/signup' ? signUp : undefined}
      </nav>
    </div>
  );
}
}

const mapDispatchToProps = dispatch => ({
  pDoSignUp: user => {
  return dispatch(authActions.signupRequest(user));
},
pDoSignIn: (username, password) => {
  return dispatch(authActions.signinRequest(username, password))
}
});

export default connect(null, mapDispatchToProps)(Landing);
