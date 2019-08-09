import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeProfile, removeJob } from '../../action/profile-actions'
import {Card} from "@material-ui/core";
import uuid from "uuid";
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import superagent from 'superagent';
import * as authAuctions from "../../action/auth-actions";
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const API_URL = 'http://localhost:8000/delete';

export class JobsSaved extends Component {

  handleRemoveProfile = () => {
    this.props.removeProfile();
  };

  handleDelete = (job) => {
    this.props.removeJob(job);
    return superagent.delete(`${API_URL}/${this.props.userState.username}`)
      .send(job)
      .catch(err => console.log(err));
  };

  handleLogout = () => {
    return this.props.logOut();
  };

  render() {
    return (
      <div>
        <h1>
          SAVED JOBS
        </h1>
        <div className='navButtons'>
          <Button id='profileButton' variant='contained' color='default' >
            <Link id='profile' component={RouterLink} to="/user" onClick={this.handleRemoveProfile}> Search Page </Link>
          </Button>
          <Button id='logOut' variant='contained' color='default' onClick={this.handleLogout}>
            Sign Out
          </Button>
        </div>
        <ul>
          { this.props.profileState.map(current => (
            <Card>
              <CardContent>
                <li style={{backgroundColor: '#f5f5f5'}} key={uuid()}>
                  <p style={{ fontWeight: 'bold'}}>Organization: {current.organization}</p><br/>
                  <p>{current.title}</p><br/>
                  <p>{current.location}</p><br/>
                  <p>{current.summary}</p><br/>
                  <p>{current.created}</p><br/>
                  <br/><a href={current.url}>{current.url}</a><br/>
                  <Button variant='contained' color='default' onClick={this.handleDelete.bind(null, current)}>
                    Delete Job
                  </Button>
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
    logOut: () => {
      dispatch(authAuctions.remove());
    },
    removeJob: (job) => {
      dispatch(removeJob(job))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(JobsSaved);
