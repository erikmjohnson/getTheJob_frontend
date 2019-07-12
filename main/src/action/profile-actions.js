import superagent from 'superagent';

export const createProfile = (organization, title, location, summary, created = new Date(), url) => {
  return {
    type: 'PROFILE',
    payload: {
      organization,
      title,
      location,
      summary,
      created,
      url
    }
  }
};

const API_URL = 'http://localhost:8000/retrieve/';

export const loadProfile = (username) => store => {
  return superagent.get(`${API_URL}${username}`)
    .then(results =>{
      console.log(results);
    })
    .catch(err => console.log(err));
};


//might be able to pull username from main page profile
// const mapStateToProps = state => {
//   return {
//     authAction: state.token
//   }
// };
//
// export default connect(mapStateToProps);
