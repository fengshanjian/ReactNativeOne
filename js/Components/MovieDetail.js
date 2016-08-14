/**
 * Created by smartrabbit on 16/8/13.
 * @flow
 */
'use strict';
var React = require('react');
var {connect} = require('react-redux');
import Swiper from 'react-native-swiper';
import {
  View,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions
} from 'react-native';
import {getMovieDetail} from '../httpRequest/api';
import TopBar from './TopBar'
class MovieDetail extends React.Component {

  constructor(props){
    super(props);
    this.state={
      movie:{},
      images:[]
    }
  }
  componentDidMount(){
    getMovieDetail(this.props.movieId,(result)=>{

      this.setState({movie:result,images:result.photo});
    });
  }

  renderSwiperPage(item){    
    return (
      <View style={{height:230}}>
        <Image style={{height:230}}
          resizeMode='stretch'
          source={{uri:item}}
        />

      </View>
    );
  }
  renderContent(){

    if(this.state.movie){

      return(
        <ScrollView>
          <Swiper showsPagination={true}
            height={230}
            autoplay={true}
            style={{marginTop:3}}
            paginationStyle={{bottom:10,marginRight:15,justifyContent:'flex-end',alignSelf:'flex-end'}}>
            {this.state.images.map((item,key) => {
              return (
                <View key={key} style={{height:230}}>
                  {this.renderSwiperPage(item)}
                </View>
              )
            })}
          </Swiper>
          <Text style={styles.title}>
            {this.state.movie.title}
          </Text>
          <View style={{marginTop:10,height:40,flexDirection:'row',backgroundColor:'#224fbd'}}>
            <Text style={styles.actor}>
              演员
            </Text>
          </View>
          <Text style={styles.actors}>
            {this.state.movie.info}
          </Text>
          <View style={{marginTop:10,height:40,flexDirection:'row',backgroundColor:'#224fbd'}}>
            <Text style={styles.actor}>
              剧情
            </Text>
          </View>
          <Text style={styles.actors}>
            {this.state.movie.officialstory}
          </Text>
        </ScrollView>
      );
    }
    return(
      <ScrollView>
      </ScrollView>
    );
  }
  render(){

    return(
      <View style={{flex:1}}>
        <TopBar title={'电影'} showBack={true} navigator={this.props.navigator}/>
        {this.renderContent()}
      </View>
    );
  }
}
var styles = StyleSheet.create({
    title: {
      marginTop:15,
      fontSize: 24,
      color: '#000',
      textAlign: 'center',
      alignSelf:'center',
      justifyContent: 'center',
      fontWeight: 'bold',
    },
    actor:{
      marginLeft:10,
      fontSize: 18,
      color: '#fff',
      textAlign: 'center',
      alignSelf:'center',
      justifyContent: 'center',
      fontWeight: 'bold',
    },
    actors:{
      margin:10,
      fontSize: 16,
      color: '#000',

      alignSelf:'center',
      justifyContent: 'center',
    }
  }
);
module.exports = connect()(MovieDetail)
