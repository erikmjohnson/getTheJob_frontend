export default(state = [], {type, payload}) => {

  switch(type) {
    case 'PROFILE':
      if(state.length === 0) {
      return [...state, payload];
      }
      break;
    default:
      return state;
  }
}
