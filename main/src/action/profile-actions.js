import superagent from 'superagent';

export const createProfile = (id, organization, title, location, summary, created, url) => {
  return {
    type: 'PROFILE',
    payload: {
      id,
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
      let request = results.body;

      return request.forEach(current =>
        store.dispatch(
          createProfile(
            current._id,
            current.organization,
            current.title,
            current.location,
            current.summary,
            current.date,
            current.url
          )
        )
      )
    })
    .catch(err => console.log(err));
};



