export default(state = [], {type, payload}) => {

  switch(type) {
    case 'PROFILE':
      return [...state, payload];

    default:
      return state;
  }
}
