/**
 * Created by smartrabbit on 16/8/8.
 * @flow
 */
 import {PUSH_Notification} from '../Actions/PushNotificationAction'
 const initialState ={
    notification:{}
 };
 export default function PushNotificationReducer(state = initialState, action={}) {
     switch (action.type) {
         case PUSH_Notification:
             return {
               ...state,
               hidden:action.notification
             }
         default:
             return state
     }
 }
