
import { createStore, combineReducers } from 'redux';

const setFontReducer = (state = 18, action)=>{
    if(action.type == 'SET_FONT'){
        return action.fontSize;
    }
    return state;
}

const setBgColorReducer = (state = '#ffffff', action)=>{
    if(action.type == 'SET_BGCOLOR'){
        return action.bgColor;
    }
    return state;
}

const setColorReducer = (state = '#111111', action)=>{
    if(action.type == 'SET_COLOR'){
        return action.color;
    }
    return state;
}

const reducer = combineReducers({
    fontSize: setFontReducer,
    bgColor: setBgColorReducer,
    color: setColorReducer
});

const store = createStore(reducer);

export default store;