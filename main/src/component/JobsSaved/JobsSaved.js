import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

export class JobsSaved extends Component {
  consoleState = () =>{
    console.log(this.props.profileState);
  };

  render() {
    return (
      <div><h1> SAVED JOBS </h1>
        <Typography>
        <li>
          <Link component={RouterLink} to="/user"> Search Page </Link>
          <button onClick={this.consoleState}>State Profile</button>
        </li>
        </Typography>

      </div>

    )
  }
}


const mapStateToProps = state => {
  return {
    profileState: state.profile,
    userState: state.token,
  }
};

export default connect(mapStateToProps)(JobsSaved);
