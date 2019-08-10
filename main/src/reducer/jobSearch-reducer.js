export default (state = [], {type, payload}) => {

  switch(type) {
    case 'JOB_SEARCH':
      return [...state, payload];
    case 'REMOVE_SEARCH':
      return state =[];
    default:
      return state;
  }
}
