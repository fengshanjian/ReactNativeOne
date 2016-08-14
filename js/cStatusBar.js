/**
 * Created by smartrabbit on 16/8/11.
 * @flow
 */
 import React from 'react';
 import {
   View,
   StatusBar
 } from 'react-native';
 import { connect } from 'react-redux';

 class cStatusBar extends React.Component{

   render (){
     return(
       <View style={{height:20,backgroundColor:this.props.barColor}}>
         <StatusBar
           translucent={true}
           barStyle={this.props.barStyle}
         />
       </View>
     );
  }
}
  module.exports= connect((state)=>{
    return{
      barStyle:state.demoReducer.barStyle,
      barColor:state.demoReducer.barColor
    }
  })(cStatusBar);
