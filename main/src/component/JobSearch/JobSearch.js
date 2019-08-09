import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import JobSearchForm from '../JobSearchForm/JobSearchForm';
import * as JobSearchActions from '../../action/jobSearch-actions';
import * as authAuctions from '../../action/auth-actions';
import * as profileActions from '../../action/profile-actions';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid'
import uuid from 'uuid';
import superagent from "superagent";
import { Card } from "@material-ui/core";
import CardContent from '@material-ui/core/CardContent';
import './jobSearch.scss';

// const API_URL = 'https://get-the-job-backend.herokuapp.com/';
const API_URL = 'http://localhost:8000/';
const SAVE_ROUTE = `save/`;

export class JobSearch extends Component {

  handleJobRender = (job) => {
    if(job.title && job.location) {
      return this.props.mappedJobCreates(job.title, job.location);
    }
    return false;
  };

  handleLogout = () => {
    return this.props.logOut();
  };

  handleAddJob = (profile) => {
    return superagent.post(`${API_URL}${SAVE_ROUTE}${this.props.authState.username}`)
      .send(profile)
      .catch(err => console.log(err));
  };

  handleRenderProfile = () => {
    return this.props.mappedProfile(this.props.authState.username)
  };

  render() {
    return (
      <div>
        <h1>
          SEARCH FOR JOBS
        </h1>
        <div className='navButtons'>
          <Button id='profileButton' variant='contained' color='default' onClick={this.handleRenderProfile}>
            <Link id='profile' component={RouterLink} to="/myjobs"> My Jobs </Link>
          </Button>
          <Button id='logOut' variant='contained' color='default' onClick={this.handleLogout}>
            Sign Out
          </Button>
        </div>
        <ul>
          <JobSearchForm onComplete={this.handleJobRender}/>
          <Grid style={{padding:24}}>
            { this.props.searchState.map(current => (
              <Grid style={{marginTop: 15}}>
                <Card>
                  <CardContent>
                    <li key={uuid()}>
                      <p>{current.title}</p><br/>
                      <p>Organization: {current.organization}</p><br/>
                      <p>Location: {current.location}</p><br/>
                      <p>Summary:</p><br />
                      <p>{current.summary}</p><br/>
                      <p>Posted: {current.created}</p><br/>
                      <br/><a href={current.url}>{current.url}</a><br/>
                      <Button variant='contained' color='default' onClick={this.handleAddJob.bind(null, current)}>
                        Add Job
                      </Button>
                    </li>
                  </CardContent>
                </Card>
              </Grid>
            ))
            }
          </Grid>
        </ul>
      </div>

    )
  }
}

const mapStateToProps = state => {
  return {
    searchState: state.jobSearch,
    authState: state.token,
    profileState: state.profile,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    mappedJobCreates: (language, location) => {
      dispatch(JobSearchActions.loadJobSearch(language, location));
      },
    logOut: () => {
      dispatch(authAuctions.remove());
      },
    mappedProfile: (username) => {
      dispatch(profileActions.loadProfile(username))
      },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(JobSearch);
