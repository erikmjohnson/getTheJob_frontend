import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

export class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }
  handleChange = event => {
    const {name, value} = event.target;
    this.setState({[name] : value});
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onComplete(this.state);
    this.setState({username: '', password: ''});
  };

  render() {

    let {type} = this.props;
      type = type === 'signin' ? 'signin' : 'signup';

    return(
      <Grid container={true} direction='column' justify='center' alignItems='center'>
        <Grid item>
          <form onSubmit={this.handleSubmit}>
            <Grid item>
              <TextField
                style={{width: '300px', height: '75px'}}
                inputProps={{style: {fontSize: '32px'}}}
                variant='filled'
                name='username'
                label='username'
                type='text'
                value={this.state.username}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid>
                <TextField
                  style={{width: '300px', height: '75px'}}
                  inputProps={{style: {fontSize: '32px'}}}
                  variant='filled'
                  name='password'
                  label='password'
                  type='password'
                  value={this.state.password}
                  onChange={this.handleChange}
              />
            </Grid>
            <Grid container={true} direction='column' justify='center' alignContent='center'>
              <Grid item>
                <Button style={{marginTop: '30%', width: '150px', fontSize: '15px'}} variant='contained' color='primary' type='submit'>{type}</Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    );
  }
}
