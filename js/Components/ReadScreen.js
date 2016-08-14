/**
 * Created by smartrabbit on 16/8/12.
 * @flow
 */
'use strict'
import React from 'react';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import {getReadingCarousel,getReadingIndex} from '../httpRequest/api';
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
import EssayDetail from './EssayDetail';
import SerialDetail from './SerialDetail';
import QuestionDetail from './QuestionDetail';
import CarouselList from './CarouselList';
class ReadScreen extends React.Component{
  initState() {
   return {
     loaded: false,
     dataSource: new ListView.DataSource({

       rowHasChanged            : (row1, row2) => row1 !== row2,
       sectionHeaderHasChanged  : (s1, s2) => s1 !== s2
     }),
     showLine:false,
   }
 }
 getReadings(){
   getReadingCarousel((result)=>{

     if(!this.state.dataSource._dataBlob){
       let dataBlob={section1:[{sectionID:'section1',result:result}],section2:[]};
       this.setState({dataSource:this.state.dataSource.cloneWithRowsAndSections(dataBlob)});
     }
     else{
       let dataBlob={section1:[{sectionID:'section1',result:result}],section2:this.state.dataSource._dataBlob.section2};
       this.setState({dataSource:this.state.dataSource.cloneWithRowsAndSections(dataBlob)});
     }
   });
   getReadingIndex(0,(result)=>{

     if(!this.state.dataSource._dataBlob){
       let dataBlob={section1:[],section2:result};
       this.setState({dataSource:this.state.dataSource.cloneWithRowsAndSections(dataBlob)});
     }
     else{

       let dataBlob={section1:this.state.dataSource._dataBlob.section1,section2:result};
       this.setState({dataSource:this.state.dataSource.cloneWithRowsAndSections(dataBlob)});
     }
   });
 }
  constructor(props){
      super(props);
      this.state = this.initState();
      this.getReadings();
  }


  render(){
    return(
      <View style={{flex:1}}>
        <TopBar title={'阅读'}/>
        <ListView
          dataSource = {this.state.dataSource}
          style      = {styles.listview}
          renderRow  = {this.renderRow.bind(this)}/>
      </View>
    );
  }
  gotoCarousel(item){
    const{navigator} = this.props;

    if(navigator){
      navigator.push({
        component: CarouselList,
        name:'CarouselList',
        passProps: {
            itemId: item.id,
            title:item.title,
          },

        });
    }
  }
  renderSwiperPage(item){

    return (
      <View style={{height:160}}>
        <TouchableOpacity
          style={{flex:1}}
          onPress={()=>{
            this.gotoCarousel(item);
          }}>
          <Image style={{flex:1,marginLeft:5,marginRight:5}}
            resizeMode='stretch'
            source={{uri:item.cover}}
          />
        </TouchableOpacity>
      </View>
    );
  }
  clickRow(rowData){
    const{navigator} = this.props;
    let itemId = '';
    let component;
    let name;
    if(rowData.type==1){
      itemId = rowData.content.content_id;
      component = EssayDetail;
      name='EssayDetail';
    }
    else if (rowData.type==2) {
      itemId = rowData.content.id;
      component = SerialDetail;
      name='SerialDetail';
    }
    else if (rowData.type==3) {
      itemId = rowData.content.question_id;
      component = QuestionDetail;
      name='QuestionDetail';
    }
    if(navigator&&component&&name){
      navigator.push({
        component: component,
        name:name,
        passProps: {
            itemId: itemId,
          },

        });
    }
  }
  renderRow(rowData){

    if(rowData.sectionID==='section1'){

      return(
        <Swiper showsPagination={true}
          height={160}
          autoplay={true}
          paginationStyle={{bottom:10,marginRight:15,justifyContent:'flex-end',alignSelf:'flex-end'}}>
          {rowData.result.map((item,key) => {
            return (
              <View key={key} style={{height:160}}>
                {this.renderSwiperPage(item)}
              </View>
            )
          })}
        </Swiper>
      );
    }

    return(
      <TouchableHighlight
        underlayColor="#bebebe"
        style={styles.rowStyle}
        onPress={() =>this.clickRow(rowData)}>
        <View style={{flex:1}}>

          <Text style={styles.date}>
            {rowData.month} {rowData.day}, {rowData.year}
          </Text>
          <Text style={styles.title}>
            {this.getTitle(rowData)}
          </Text>
          <Text style={styles.autor}>
            作者 / {this.getAuthor(rowData)}
          </Text>
          <Text style={styles.content}>
            {this.getContent(rowData)}}
          </Text>
          <View style={{flex:1,flexDirection:'column'}}>
            <View style={{position:'absolute',bottom:0,left:8,right:8,height:0.3,backgroundColor:'#8e8e8e',alignItems:'flex-end'}}>

            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
  getTitle(item){
    if(item.type==1){
      return item.content.hp_title
    }
    else if(item.type==2){
      return item.content.title
    }
    else if(item.type==3){
      return item.content.question_title
    }
    return '';
  }
  getAuthor(item){
    if(item.type==1){
      return item.content.author[0].user_name
    }
    else if(item.type==2){
      return item.content.author.user_name
    }
    else if(item.type==3){
      return item.content.answer_title
    }
    return '';
  }
  getContent(item){
    if(item.type==1){
      return item.content.guide_word
    }
    else if(item.type==2){
      return item.content.excerpt
    }
    else if(item.type==3){
      return item.content.answer_content
    }
    return '';
  }
  /*

  */
}
var styles = StyleSheet.create({
  listview: {
      flex: 1,
      marginTop:3,
      flexDirection: 'column'
  },
  rowStyle:{
    height:180,
    flexDirection:'row',
    alignSelf:'center',
  },
  date:{
    marginTop:12,
    marginLeft:10,
    color:'#8e8e8e',
    fontSize: 16,
    textAlign: 'left',
    alignSelf:'flex-start',
    justifyContent: 'center',
  },
  title:{
    marginLeft:10,
    marginTop:5,
    color:'#000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    alignSelf:'flex-start',
    justifyContent: 'center',
  },
  autor:{
    marginLeft:10,
    marginTop:5,
    color:'#000',
    fontSize: 14,
    textAlign: 'left',
    alignSelf:'flex-start',
    justifyContent: 'center',
  },
  content:{
    marginLeft:10,
    marginTop:13,
    color:'#000',
    fontSize: 16,
    textAlign: 'left',
    alignSelf:'flex-start',
    justifyContent: 'center',
  }
 }
)
module.exports = connect()(ReadScreen);
