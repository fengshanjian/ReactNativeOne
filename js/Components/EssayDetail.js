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
  ScrollView,
  Text,
} from 'react-native';
import TopBar from './TopBar';
import {getEssay} from '../httpRequest/api'
class EassyDetail extends React.Component {
  props:{
    itemId:string
  }
  constructor(props){
    super(props);
    this.state={
      result:{}
    };
    console.log(this.props.itemId);
    getEssay(this.props.itemId,(result)=>{
      
        this.setState({result:result});
    });
  }
  render(){

    return(
      <View style={{flex:1}}>
        <TopBar title={'阅读'} showBack={true} navigator={this.props.navigator}/>
        <View style={{height:0.3,backgroundColor:'#8e8e8e',marginLeft:8,marginRight:8}}></View>
        {this.renderContent()}
      </View>
    );
  }
  renderContent(){

    if(this.state.result){

      return(
        <ScrollView style={{flex:1}}>
          <Text style={styles.preTitle}>
            {this.state.result.guide_word}
          </Text>
          <Text style={styles.title}>
            {this.state.result.title}
          </Text>

          <View style={{flexDirection:'row',marginTop:10,height:65}}>
            <Image style={styles.headImg}
              resizeMode={'cover'}
              source={{uri:this.state.result.imgurl}}
            />
            <View style={{flexDirection:'column',height:65}}>
              <Text style={styles.date}>
                {this.state.result.month}.{this.state.result.year}
              </Text>
              <Text style={styles.author}>
                作者 / {this.state.result.author}
              </Text>
            </View>
          </View>
          <Text style={styles.content}>
            {this.state.result.content}
          </Text>
        </ScrollView>
      );
    }
    return (
      <View/>
    );
  }
}
var styles = StyleSheet.create({
  preTitle:{
    marginLeft:10,
    marginTop:10,
    color:'#8e8e8e',
    fontSize: 16,
    textAlign: 'left',
    alignSelf:'flex-start',
    justifyContent: 'center',
  },
  headImg:{
    marginLeft:10,
    height:50,
    width:50,
  },
  title:{
    marginLeft:10,
    marginTop:8,
    color:'#000',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    alignSelf:'flex-start',
    justifyContent: 'center',
  },
  date:{
    marginLeft:10,
    color:'#000',
    fontSize: 16,
    textAlign: 'left',
    alignSelf:'flex-start',
    justifyContent: 'center',
  },
  author:{
    marginTop:10,
    marginLeft:10,
    color:'#000',
    fontSize: 16,
    textAlign: 'left',
    alignSelf:'flex-start',
    justifyContent: 'center',
  },
  content:{
    marginLeft:10,
    marginTop:15,
    color:'#000',
    fontSize: 16,
    textAlign: 'left',
    alignSelf:'flex-start',
    justifyContent: 'center',
  },
});
module.exports=EassyDetail;
