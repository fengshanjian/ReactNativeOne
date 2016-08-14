/**
 * Created by smartrabbit on 16/8/11.
 * @flow
 */
 import {SWITCH_TAB} from '../Actions/tabsViewAction'

 const initialState ={
      tab:'picture'
  };
export default function tabsViewReducer(state=initialState,action={}){
  console.log('action:'+action.type);
  switch (action.type) {
    case SWITCH_TAB:

        return  {
            ...state,
            tab:action.tab,
        }
    default:
        return state;
  }


}
