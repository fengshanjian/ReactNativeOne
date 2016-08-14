/**
 * Created by smartrabbit on 16/8/12.
 * @flow
 */
'use strict'
import React from 'react';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import {
  View,
  Image,
  StyleSheet,
  Text,
  ListView,
  TouchableOpacity,
  TouchableHighlight,
  AsyncStorage,
  Dimensions
} from 'react-native';
import TopBar from './TopBar';
import {getMovieList} from '../httpRequest/api';
var WINDOW_WIDTH = Dimensions.get('window').width;

import MovieDetail from './MovieDetail';

class MovieScreen extends React.Component{

  constructor(props){
      super(props);
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
         index:0,
         dataSource: ds
      };
  }

  componentDidMount(){
    this.getMovies();
  }
  getMovies(){

    getMovieList(this.state.index,(result)=>{
      this.setState({dataSource:this.state.dataSource.cloneWithRows(result),index:this.state.index+result.length});
    });
  }
  loadMore(){
    console.log('lenth:'+this.state.index);

  }
  renderMoviesList(){

    if(this.state.dataSource._cachedRowCount>0){
      return(
        <ListView style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          onEndReached={this.loadMore.bind(this)}
          onEndReachedThreshold={300}
        />
      );
    }
    return null;
  }
  clickRow(rowData){
    const{navigator} = this.props;
    if(navigator){
      navigator.push({
        component: MovieDetail,
        name:'MovieDetail',
        passProps: {
            movieId: rowData.id,
          },

        });
    }
  }

  renderRow(rowData){
    return(
        <TouchableHighlight
          underlayColor="#bebebe"
          style={styles.rowStyle}
          onPress={() =>this.clickRow(rowData)}>
          <View style={{flex:1}}>
            <Image
              style={styles.image}
              resizeMode={'stretch'}
              source={{uri:rowData.cover}}/>
            <Text style={styles.text}>
              {rowData.id}
            </Text>
          </View>
        </TouchableHighlight>
    );
  }
  render(){
    return(
      <View style={{flex:1}}>
        <TopBar title={'电影'}/>
        <View style={{height:0.5,marginLeft:20,marginRight:20,backgroundColor:'#8e8e8e'}}/>
        {this.renderMoviesList()}
      </View>
    );
  }
}
var styles = StyleSheet.create({
    listView: {
        flex: 1,
        marginTop:3,
        flexDirection: 'column'
    },
    rowStyle:{
      height:187,
      flexDirection:'row',
      alignSelf:'center',
    },
    image:{
      position:'absolute',
      top:4,
      left:0,
      width:WINDOW_WIDTH,
      right:0,
      bottom:4,
    },
    text:{
      position:'absolute',
      top:152,
      left:0,
      right:10,
      bottom:3,
      fontSize: 22,
      color: '#eb414b',
      textAlign: 'right',
      alignSelf:'center',
      fontWeight: 'bold',
      justifyContent: 'center',
    }
});
module.exports = connect()(MovieScreen);
