/**
 * Created by smartrabbit on 16/8/8.
 * @flow
 */
import {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
  NAVIGATIONBAR_HIDDEN,
  STATUSBAR_STYLE,
  STATUSBAR_COLOR} from '../Actions/DemoAction'

const initialState ={
    text:'',
    counter:0,
    hidden:false,
    barStyle:'light-content',
    barColor:'white'
};
//reducer其实也是个方法而已,参数是state和action,返回值是新的state
export default function demoReducer(state = initialState, action={}) {
    switch (action.type) {
        case INCREMENT_COUNTER:
            return {
                text:action.text,
                counter:counter+1,
            }
        case DECREMENT_COUNTER:
            return  {
                ...state,
                counter:counter-1,
            }
        case NAVIGATIONBAR_HIDDEN:
            console.log('hidden:'+action.hidden);
            return{
                ...state,
                hidden:action.hidden
            }
        case STATUSBAR_STYLE:
            return{
                ...state,
                barStyle:action.barStyle
            }
        case STATUSBAR_COLOR:
            return{
                ...state,
                barColor:action.barColor
            }
        default:
            return state
    }
}
