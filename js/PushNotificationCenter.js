/**
 * Created by smartrabbit on 16/8/11.
 * @flow
 */
'use strict';
import React from 'react';
import {connect} from 'react-redux';
class PushNotificationCenter extends React.Component{
  props:{
    notification:{},
    dispatch: Dispatch,
  }
  /*
  notification:{
    title:string,
    badge:number,
    content:{},
  }
  */
  handlePushNotifacation(){
    console.log('处理新通知');
    console.log(JSON.stringify(this.props.notification));
  }
  render(){
    //收到通知
    this.handlePushNotifacation();
    return null;
  }
}
function select(store) {
  return {
    notification: store.pushReducer.notification,
  };
}
module.exports = connect(select)(PushNotificationCenter);
