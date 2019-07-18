import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { removeProfile } from '../../action/profile-actions'
import {Card} from "@material-ui/core";
import uuid from "uuid";
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

export class JobsSaved extends Component {
  consoleState = () =>{
    console.log(this.props.profileState);
  };

  handleRemoveProfile = () => {
    this.props.removeProfile();
  };

  handleDelete = () => {

  };

  render() {
    return (
      <div><h1> SAVED JOBS </h1>
        <Typography>
          <button>
          <Link component={RouterLink} to="/user" onClick={this.handleRemoveProfile}> Search Page </Link>
          </button>
          <button onClick={this.consoleState}>State Profile</button>
        </Typography>
        <ul>
            { this.props.profileState.map(current => (
                <Card>
                  <CardContent>
                    <li style={{backgroundColor: '#f5f5f5'}} key={uuid()}>
                      <p style={{ fontWeight: 'bold', backgroundColor: 'yellow'}}>Organization: {current.organization}</p><br/>
                      <p>{current.title}</p><br/>
                      <p>{current.location}</p><br/>
                      <p>{current.summary}</p><br/>
                      <p>{current.created}</p><br/>
                      <br/><a href={current.url}>{current.url}</a><br/>
                      <Button variant='contained' color='default' onClick={this.handleAddJob.bind(null, current)}>Add Job</Button>
                    </li>
                  </CardContent>
                </Card>
            ))
            }
        </ul>
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

const mapDispatchToProps = dispatch => {
  return {
    removeProfile: () => {
      dispatch(removeProfile());
    },
    removeJob: () => {
      dispatch()
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(JobsSaved);
