import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

export class JobsSaved extends Component {

  render() {
    return (
      <div><h1> SAVED JOBS </h1>
        <Typography>
        <li>
          <Link component={RouterLink} to="/user"> Search Page </Link>
        </li>
        </Typography>
      </div>

    )
  }
}


const mapStateToProps = state => {
  return {
    profile: state.profile,
  }
};

export default connect(mapStateToProps)(JobsSaved);
