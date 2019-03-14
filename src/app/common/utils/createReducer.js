export const createReducer = (initialState, fnMap) => {
  return (state = initialState, {type, payload}) => {
    const handler = fnMap[type];

    return handler ? handler(state, payload): state
  }
}

//Util func to creating boilerplates reducers. Some expirement