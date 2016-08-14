/**
 * Created by smartrabbit on 16/8/11.
 * @flow
 */
 'use strict';
 export const PUSH_Notification = 'PUSH_Notification'
 export function increment(notification:{}){
     return {
         type: PUSH_Notification,
         notification: notification,
     }
 }
