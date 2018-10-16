export function reducer(state, action) {

  switch (action.type) {

      case 'TOGGLE_SHOW_ONLINE_URL':
      {
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
