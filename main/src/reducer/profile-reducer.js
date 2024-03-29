export default (state = [], {type, payload}) => {

  switch(type) {
    case 'PROFILE':
      return [...state, payload];
    case 'REMOVE_PROFILE':
      return state = [];
    case 'REMOVE_JOB':
      return state.filter(job => job.id !== payload.id);
    default:
      return state;
  }
}
