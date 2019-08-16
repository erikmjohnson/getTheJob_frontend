import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeProfile, removeJob } from '../../action/profile-actions'
import {Card} from "@material-ui/core";
import uuid from "uuid";
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import superagent from 'superagent';
import { remove } from "../../action/auth-actions";
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

// const API_URL = 'http://localhost:8000/delete';
const API_URL = 'https://get-the-job-backend.herokuapp.com/delete';

export class JobsSaved extends Component {

  handleRemoveProfile = () => {
    this.props.mappedRemoveProfile();
  };

  handleDelete = (job) => {
    this.props.mappedRemoveJob(job);
    return superagent.delete(`${API_URL}/${this.props.userState.username}`)
      .send(job)
      .catch(err => console.log(err));
  };

  handleLogout = () => {
    return this.props.mappedLogOut();
  };

  render() {
    return (
      <div>
        <h3>
          SAVED JOBS
        </h3>
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
            <Card style={{marginTop: 15, marginLeft: 24, marginRight: 24}}>
              <CardContent>
                <li key={uuid()}>
                  <p className='title'>{current.title}</p><br/>
                  <p>Organization: {current.organization}</p><br/>
                  <p>{current.location}</p><br/>
                  <p>Summary:</p><br />
                  <p>{current.summary}</p><br/>
                  <p>Posted: {current.created}</p><br/>
                  <a className='jobUrl' href={current.url}>{current.url}</a><br/>
                  <Button className='button' variant='contained' color='default' onClick={this.handleDelete.bind(null, current)}>
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
    mappedRemoveProfile: () => {
      dispatch(removeProfile());
    },
    mappedLogOut: () => {
      dispatch(remove());
    },
    mappedRemoveJob: (job) => {
      dispatch(removeJob(job))
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(JobsSaved);
