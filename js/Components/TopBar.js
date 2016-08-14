/**
 * Created by smartrabbit on 16/8/12.
 * @flow
 */
 'use strict'
 import React from 'react';
 import {
   View,
   Image,
   StyleSheet,
   TouchableOpacity,
   Text,
 } from 'react-native';
 class TopBar extends React.Component{
   props:{
     title:string,
     showBack:false,
   }
   goback(){
     const {navigator} = this.props;

     if(navigator){
       
       navigator.pop();
     }
   }
   render(){
     if(this.props.showBack){
       return(
         <View style={styles.topBar}>
           <View style={styles.topBar1}>
             <Text style={styles.title1}>
               ONE
             </Text>
             <Text style={styles.title2}>
               |{this.props.title}
             </Text>
           </View>
           <TouchableOpacity
             style={styles.back}
             onPress={()=>this.goback()}>
             <Image style={styles.back}
               resizeMode={'contain'}
               source={require('../img/back.png')}
             />
           </TouchableOpacity>

         </View>
       );
     }
     else{
       return(
         <View style={styles.topBar}>
           <View style={styles.topBar1}>
             <Text style={styles.title1}>
               ONE
             </Text>
             <Text style={styles.title2}>
               |{this.props.title}
             </Text>
           </View>
         </View>
       );
     }
   }
 }
 var styles = StyleSheet.create({
     topBar: {
         height:50,
         backgroundColor:'#ffffff',
         flexDirection: 'row',
         justifyContent:'center'
     },
     topBar1: {
         height:50,
         position:'absolute',
         top:0,
         left:0,
         right:0,
         flexDirection: 'row',
         justifyContent:'center'
     },
     back: {
         height:50,
         width:60,
         position:'absolute',
         top:2,
         left:0,
     },
     title1:{
       marginTop:5,
       fontSize: 20,
       color: '#8e8e8e',
       textAlign: 'center',
       alignSelf:'center',
       justifyContent: 'center',
       fontWeight: 'bold',
     },
     title2:{
       fontSize: 18,
       color: '#0080FF',
       textAlign: 'center',
       alignSelf:'center',
       justifyContent: 'center',
     }
});

module.exports = TopBar;
