const initialState = {
  isLoggedin: false,
  user:{
    accounttype: 'free'
  },
  accounttype:  'free',
  changeAccountType: false
};

export default (state = initialState, action) => {
  switch (action.type) {
      case 'LOGIN_WITH_GOOGLE':
      return extend(state,{ isLoggedin: action.payload.isLoggedin, user: action.payload.user });
      break;
      case 'CHANGE_ACCOUNT_TYPE':
      return extend(state,{ changeAccountType: action.payload.changeAccountType,credential: action.payload.credential,user:action.payload.user });
      break;
      case 'CHANGE_TO_ACCOUNT_PRO':
      return  extend(state,{ accounttype: action.payload.accountype,user:action.payload.user} );
      break;
      case 'SAVE_DATA':
      return  extend(state,{ user: {accounttype: action.payload.accountype} });
      break;
      case 'UPDATE_DATA':
      return  extend(state,{ user: {accounttype: action.payload.accountype} });
      break;
    default:
      return state;
  }

  function extend(obj, src) {
    debugger
    for (var key in src) {
        if (src.hasOwnProperty(key)) obj[key] = src[key];
    }
    return Object.assign({},obj);
}
};
