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
    <Grid container={true} direction='row' alignItems='center'>
      <div className='authForm'>
        <Grid item style={{width: '60%'}}>
          <Card>
            <CardContent>
              <Grid container={true} direction='column' justify='space-evenly' alignItems='center' alignContent='center'>
                <h1 className='loginh1'>Login</h1>
                <Grid item>
                  <AuthForm type='signin' onComplete={this.handleSignIn}/>
                </Grid>
                <Link className='toggle' to='/signup'>Create an Account</Link>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </div>
      <img className='handShake' src={require('../../styles/background.jpg')} alt='People Shaking Hands'/>
    </Grid>
  ;

  const signUp =
    <Grid container={true} direction='row' alignItems='center'>
      <div className='authForm'>
        <Grid item style={{width: '60%'}}>
          <Card>
            <CardContent>
              <Grid container={true} direction='column' justify='space-evenly' alignItems='center' alignContent='center'>
                <h1 className='loginh1'>Sign Up</h1>
                <Grid>
                  <AuthForm type='signup' onComplete={this.handleSignUp}/>
                </Grid>
                <Link className='toggle' to='/signin'>Existing Account</Link>
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
    <div id='loginContainer'>
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
