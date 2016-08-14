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
  TouchableOpacity,
  TouchableHighlight,
  Text,
} from 'react-native';
import {getCarouselList} from '../httpRequest/api';
import CarouselDetail from './CarouselDetail';
class CarouselList extends React.Component {

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
       dataSource: ds,
    };
    getCarouselList(props.itemId,(result)=>{
      this.setState({dataSource:this.state.dataSource.cloneWithRows(result)});
    });
  }
  goback(){
    console.log('hahahha')
    const {navigator} = this.props;

    if(navigator){
      navigator.pop();
    }
  }
  getcontent(rowData){
    if(rowData.type==3){
      return '作者/'+rowData.introduction;
    }
    return rowData.introduction;
  }
  clickRow(rowData){
    const{navigator} = this.props;
   
    if(navigator){
      navigator.push({
        component: CarouselDetail,
        name:'CarouselDetail',
        passProps: {
            itemId: rowData.id,
            title:rowData.title,
          },
        });
    }
  }
  renderRow(rowData){
    return(
      <TouchableHighlight style={{height:140}}
        underlayColor="#bebebe"
        onPress={() =>this.clickRow(rowData)}>
        <View style={{marginLeft:30,marginRight:30}}>
          <Text style={styles.title}>
            {rowData.title}
          </Text>
          <Text style={styles.author}>
            {rowData.author}
          </Text>
          <Text style={styles.content}>
            {this.getcontent(rowData)}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
  render(){
    return(
      <View style={{flex:1,backgroundColor:'#15A9C0'}}>
        <View style={{position:'absolute',top:0,height:44,left:0,right:0,flexDirection:'row',justifyContent:'center'}}>
          <Text style={styles.title}>
            {this.props.title}
          </Text>
        </View>
        <TouchableOpacity
          style={{position:'absolute',top:0,height:44,left:10,width:44}}
          onPress={()=>this.goback()}>
          <Image style={{position:'absolute',top:0,height:44,left:0,width:44}}
            resizeMode={'contain'}
            source={require('../img/back.png')}
          />
        </TouchableOpacity>

        <ListView style={{position:'absolute',top:44,bottom:0,left:0,right:0,}}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    );
  }
}
var styles = StyleSheet.create({

  title:{
    marginTop:10,
    color:'#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    alignSelf:'flex-start',
    justifyContent: 'center',
  },

  author:{
    marginTop:10,
    color:'#fff',
    fontSize: 16,
    textAlign: 'left',
    alignSelf:'flex-start',
    justifyContent: 'center',
  },
  content:{
    marginTop:10,
    color:'#fff',
    fontSize: 15,
    textAlign: 'left',
    alignSelf:'flex-start',
    justifyContent: 'center',
  },
});
module.exports=CarouselList;
