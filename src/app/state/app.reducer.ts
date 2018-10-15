export function reducer(state, action) {

  switch (action.type) {

      case 'TOGGLE_SHOW_ONLINE_URL':
      {
        console.log('existing state: ' + JSON.stringify(state));
        console.log('payload: ' + action.payload);
        return {
          ...state,
          showOnlineUrl: action.payload
        };
      }

      default: {
        return state;
      }
  }

}
