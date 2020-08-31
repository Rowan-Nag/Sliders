import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    main: null,
    test: null
}



const _add = (state, action) =>{
   return state;
}


const _update = (state, action) =>{
    return state;
}


const _get = (state, action) =>{
    return updateObject(state, {
        main: action.data,
        test: "Tested and Working!",
    })
}

const reduced = (state = initialState, action) =>{
    switch(action.type){
        case(actionTypes._ADD): return _add(state, action);
        case(actionTypes._UPDATE): return _update(state, action);
        case(actionTypes._GET): return _get(state, action);
        default: return state;
    }
}

export default reduced;