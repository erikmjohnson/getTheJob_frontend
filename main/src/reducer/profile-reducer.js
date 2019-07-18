export default (state = [], {type, payload}) => {

  switch(type) {
    case 'PROFILE':
      return [...state, payload];
    case 'REMOVE_PROFILE':
      return state = [];
    default:
      return state;
  }
}
