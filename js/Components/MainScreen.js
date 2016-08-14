/**
 * Created by smartrabbit on 16/8/8.
 * @flow
 */
'use strict';
import React from 'react';
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

import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
var WINDOW_WIDTH = Dimensions.get('window').width;
var WINDOW_HEIGHT = Dimensions.get('window').height;
import {getHome} from '../httpRequest/api';
class MainScreen extends React.Component{

    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
           showList:false,
           content:'2016-08',
           dataSource: ds.cloneWithRows(['2016-08', '2016-07','2016-06','2016-05','2016-04']),
           items:[{hp_day:'ONE.|一个'}],
        };
    }

    componentDidMount(){
      this.getHomeImages(this.state.content);
    }
    getHomeImages(content:string){
      getHome(content,(result)=>{
        this.setState({items:result});
      });
    }
    componentWillUnmount(){
        this.timer && clearTimeout(this.timer);
    }

    render(){
        return(
            <View style={styles.container}>
              {this.renderSwiper()}
              {this.renderTopBar()}
              {this.renderMenu()}

            </View>
        );
    }
    renderTopBar(){
      return(
        <TouchableHighlight style={styles.topBar}
          activeOpacity={1}
          underlayColor={'rgba(0,0,0,0.3)'}
          onPress={() =>this.hideMenu()}>
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
            <View style={{flexDirection:'row'}}>
              <Text style={styles.titleLeft}>
                ONE
              </Text>
              <Text style={[styles.titleLeft,{marginLeft:5}]}>
                {this.state.content}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.rightMenu}
              onPress={()=>this.showMenu()}>
              <Image
                style={styles.rightMenu}
                resizeMode={"cover"}
                source ={require('../img/menu-white.png')}
              />
            </TouchableOpacity>
          </View>

        </TouchableHighlight>
      );
    }
    showMenu(){
      this.setState({showList:true});
    }
    hideMenu(){
      this.setState({showList:false});
    }
    renderRow (rowData:string,rowID: number){
      return(
          <TouchableHighlight
            underlayColor="#bebebe"
            style={styles.rowStyle}
            onPress={() =>this.clickRow(rowData)}>
            <Text style={styles.rowText}>
              {rowData}
            </Text>
          </TouchableHighlight>
      );
    }
    renderMenu(){
      if(this.state.showList){
        return(
          <ListView style={styles.listView}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
          />
        );
      }
      return null;
    }
    clickRow(rowData: string){
      this.setState({content:rowData});
      console.log(rowData);
      this.getHomeImages(rowData);
      this.hideMenu();
    }

    renderSwiper(){
      if(this.state.items.length>1){
        return(
          <Swiper showsButtons={true}
            index={0}
            nextButton={<Text style={styles.swiperButtonText}>›</Text>}
            prevButton={<Text style={styles.swiperButtonText}>‹</Text>}>
            {this.state.items.map((item, key) => {
              return (
                <View key={key} style={{flex:1}}>
                  {this.renderSwiperPage(item)}
                </View>
              )
            })}
          </Swiper>
        );
      }
      else{
        return(
          <Swiper>
            {this.state.items.map((item, key) => {
              return (
                <View key={key} style={{flex:1}}>
                  {this.renderSwiperPage(item)}
                </View>
              )
            })}
          </Swiper>
        );
      }
    }
    renderImage(item){
      if(item.hp_img_url){
        return (
          <Image style={styles.bgImage}
            resizeMode='cover'
            source={{uri:item.hp_img_url}}>
          </Image>
        );
      }
      return (
        <Image style={styles.bgImage}
          resizeMode='cover'
          source={require('../img/splash.png')}>
        </Image>
      );
    }
    renderSwiperPage(item){
      return(
        <TouchableHighlight style={{flex:1}}
          activeOpacity={1}
          underlayColor={'rgba(0,0,0,0)'}
          onPress={() =>this.hideMenu()}>
          <View style={{flex:1}}>
            {this.renderImage(item)}
            <View style={styles.contentContainer}>
              <Text style={styles.day}>
                {item.hp_day}
              </Text>
              <Text style={styles.title}>
                {item.hp_title}|{item.month}.{item.year}
              </Text>
              <Text style={styles.content}>
                {item.hp_content}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      );
    }
}
var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    backContainer:{
      flex:1
    },
    bgImage:{
      position:'absolute',
      top:0,
      left:0,
      width:WINDOW_WIDTH,
      height:WINDOW_HEIGHT-52,
      alignSelf:'center',
    },
    contentContainer:{
      position:'absolute',
      left:0,
      right:0,
      bottom:0,
      height:220,
      alignItems:'flex-end',
      flexDirection:'column'
    },
    //index
    day: {
      marginLeft:15,
      fontSize: 24,
      color: '#fff',
      textAlign: 'center',
      alignSelf:'flex-start',
      justifyContent: 'center',
      fontWeight: 'bold',
    },
    //标题
    title: {
      marginLeft:15,
      fontSize: 20,
      marginTop:5,
      color: '#fff',
      textAlign: 'center',
      alignSelf:'flex-start',
      justifyContent: 'center',
    },
    //内容
    content: {
      marginLeft:15,
      fontSize: 16,
      color: '#fff',
      marginTop:5,
      textAlign: 'left',
      alignSelf:'flex-start',
      justifyContent: 'center',
    },
    topBar:{
      position:'absolute',
      top:0,
      left:0,
      right:0,
      height:44,
      backgroundColor:'rgba(0,0,0,0.3)',
      flexDirection:'row',
      justifyContent:'space-between'
    },
    // 按钮
    button: {
        height: 50,
        justifyContent: 'center', // 内容居中显示
        backgroundColor: '#ff1049',
        alignItems: 'center'
    },
    // 标题
    titleLeft: {
      marginLeft:15,
      fontSize: 16,
      color: '#fff',
      textAlign: 'center',
      alignSelf:'center',
      justifyContent: 'center',
      fontWeight: 'bold',
    },
    rightMenu:{
      justifyContent:'flex-end',
      flexDirection:'column',
      marginRight:15,
      alignSelf:'center',
      height:27,
      width:30,
    },
    listView:{
      position:'absolute',
      top:5,
      right:15,
      height:260,

      marginRight:15,
      alignSelf:'flex-end',
      backgroundColor:'#8e8e8e',
    },
    rowStyle:{
      height:50,
      paddingRight:15,
      flexDirection:'row',
      alignSelf:'center',
    },
    rowText:{
      alignSelf:'center',
      paddingLeft:15,
      color:'#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    swiperButtonText: {
      fontSize: 50,
      color: '#ffffff',
      fontFamily: 'Arial',
    },

});

module.exports = connect()(MainScreen);
