import superagent from 'superagent';

export const createProfile = (organization, title, location, summary, created, url) => {
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
      let request = results.body;

      return request.forEach(current =>
        store.dispatch(
          createProfile(
            current.organization,
            current.title,
            current.location,
            current.summary,
            current.date,
            current.url,
          ))
        )
    })
    .catch(err => console.log(err));
};



