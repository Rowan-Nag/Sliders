import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import  reducer from './reduce';

const initialState = {

}





const reduced = (state = initialState, action) =>{
    switch(action.type){
       // case(actionTypes._ADD): return reducer._add(state, action);
        default: return state;
    }
}

export default reduced;