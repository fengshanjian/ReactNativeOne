/**
 * Created by smartrabbit on 16/8/13.
 * @flow
 */
'use strict';
import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  ListView,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import {getCarouselDetail} from '../httpRequest/api'
class CarouselDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      result:{}
    }
    getCarouselDetail(this.props.itemId,(result)=>{
        this.setState({result:result});
    });
  }
  goback(){
    const {navigator} = this.props;
    if(navigator){
      navigator.pop();
    }
  }

  render(){
    return(
      <View style={{flex:1,backgroundColor:'#15A9C0'}}>



        <ScrollView style={{position:'absolute',top:0,bottom:0,left:0,right:0,}}>
          <Text style={styles.title}>
            {this.state.result.title}
          </Text>
          <Text style={styles.content}>
            {this.state.result.excerpt}
          </Text>

          <Text style={styles.content}>
            {this.state.result.content}
          </Text>
        </ScrollView>
        <TouchableOpacity
          style={{position:'absolute',top:0,height:44,left:3,width:44}}
          onPress={()=>this.goback()}>
          <Image style={{position:'absolute',top:0,height:44,left:0,width:44}}
            resizeMode={'contain'}
            source={require('../img/back.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
var styles = StyleSheet.create({

  title:{
    marginLeft:50,
    marginRight:35,
    marginTop:10,
    color:'#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    alignSelf:'flex-start',
    justifyContent: 'center',
  },


  excerpt:{
    marginTop:3,
    marginLeft:15,
    marginRight:15,
    color:'#fff',
    fontSize: 16,
    textAlign: 'left',
    alignSelf:'flex-start',
    justifyContent: 'center',
  },
  content:{
    marginTop:20,
    marginLeft:15,
    marginRight:15,
    color:'#fff',
    fontSize: 16,
    textAlign: 'left',
    alignSelf:'flex-start',
    justifyContent: 'center',
  },
});
module.exports=CarouselDetail;
