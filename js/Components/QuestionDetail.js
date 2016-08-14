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
import {getQuestion} from '../httpRequest/api'
class QuestionDetail extends React.Component {
  props:{
    itemId:string
  }
  constructor(props){
    super(props);
    this.state={
      result:{}
    }    
    getQuestion(this.props.itemId,(result)=>{
      this.setState({result:result})
    });
  }
  render(){
    return(
      <View style={{flex:1}}>
        <TopBar title={'阅读'} showBack={true} navigator={this.props.navigator}/>
        <ScrollView>
          <View style={{marginLeft:8,marginRight:8,height:0.5,backgroundColor:'#8e8e8e'}}/>
          <Text style={styles.title}>
            {this.state.result.title}
          </Text>
          <Text style={styles.secondTitle}>
            {this.state.result.guide_word}
          </Text>
          <View style={{marginTop:15,marginLeft:8,marginRight:8,height:0.5,backgroundColor:'#8e8e8e'}}/>
          <Text style={styles.author}>
            {this.state.result.author}
          </Text>
          <Text style={styles.content}>
            {this.state.result.content}
          </Text>

        </ScrollView>
      </View>
    );
  }
}
var styles = StyleSheet.create({
  title:{
    marginLeft:15,
    marginRight:15,
    marginTop:10,
    color:'#000',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    alignSelf:'flex-start',
    justifyContent: 'center',
  },
  secondTitle:{
    marginLeft:15,
    marginRight:15,
    marginTop:10,
    color:'#000',
    fontSize: 18,
    textAlign: 'left',
    alignSelf:'flex-start',
    justifyContent: 'center',
  },
  author:{
    marginLeft:15,
    marginRight:15,
    marginTop:18,
    color:'#000',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    alignSelf:'flex-start',
    justifyContent: 'center',
  },
  content:{
    marginLeft:15,
    marginRight:15,
    marginTop:10,
    color:'#000',
    fontSize: 16,
    textAlign: 'left',
    alignSelf:'flex-start',
    justifyContent: 'center',
  },
});
module.exports = QuestionDetail;
