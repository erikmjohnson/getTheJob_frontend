import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link as RouterLink} from 'react-router-dom';
import JobSearchForm from '../JobSearchForm/JobSearchForm';
import * as JobSearchActions from '../../action/jobSearch-actions';
import * as authAuctions from '../../action/auth-actions';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import uuid from 'uuid';
import superagent from "superagent";
import {Card} from "@material-ui/core";
import CardContent from '@material-ui/core/CardContent';

const API_URL = 'https://get-the-job-backend.herokuapp.com/';
const SAVE_ROUTE = `save/`;

export class JobSearch extends Component {

    handleJobRender = job => {
        if(job.title && job.location) {
            return this.props.mappedJobCreates(job.title, job.location);
        }
        return false;
    };

    handleLogout = () => {
        return this.props.logOut();
    };

    addJob = (profile) => {
        return superagent.post(`${API_URL}${SAVE_ROUTE}${this.props.authAction.username}`)
          .send(profile)
          .catch(console.log);
    };

    renderProfile = (username) => {
      return superagent.get(`http://localhost:8000/retrieve/${username}`)
        .then(result => {
            console.log(result.body);
        });
    };

    render() {
        return (
            <div style={{backgroundColor:'darkgray', minHeight: '100vh'}}>
                <Button id='logOut' variant='contained' color='default' onClick={this.handleLogout}> Sign Out </Button>
                <Typography>
                <li>
                    <Link component={RouterLink} to="/myjobs" onClick={this.renderProfile.bind(null, 'test')}> My Jobs </Link>
                </li>
                </Typography>
                <ul>
                    <JobSearchForm onComplete={this.handleJobRender}/>
                    <Grid container spacing={24} style={{padding:24}}>
                    { this.props.jobSearch.map(current => ( <Grid item xs={6} sm={6} lg={4} xl={3}>
                        <Card>
                            <CardContent>
                       <li style={{backgroundColor: '#f5f5f5'}} key={uuid()}>
                           <p style={{ fontWeight: 'bold', backgroundColor: 'yellow'}}>Organization: {current.organization}</p><br/>
                           <p>{current.title}</p><br/>
                           <p>{current.location}</p><br/>
                           <p>{current.summary}</p><br/>
                           <p>{current.created}</p><br/>
                       <br/><a href={current.url}>{current.url}</a><br/>
                       <Button variant='contained' color='default' onClick={this.addJob.bind(null, current)}>Add Job</Button>
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
        jobSearch: state.jobSearch,
        authAction: state.token,
        profile: state.profile,
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
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(JobSearch);
