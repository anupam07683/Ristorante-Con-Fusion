import * as ActionTypes from './ActionTypes';

export const Leaders = (state = { isLoading:true,errMess: null, leaders:[]}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_LEADERS:
      return {...state,isLoading:false, errMess: null, leaders: action.payload};

    case ActionTypes.LEADERS_LOADING:
      return {...state,isLoading:true, errMess: action.payload,leader:[]};

    case ActionTypes.ADD_LEADER:
        var leader = action.payload;
        return { ...state,isLoading:false, leaders: state.leaders.concat(leader)};

    case ActionTypes.LEADERS_FAILED:
        return {...state,isLoading:false,errMess:action.payload}
    default:
      return state;
  }
};