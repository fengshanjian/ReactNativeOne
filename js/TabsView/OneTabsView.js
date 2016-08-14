/**
 * Created by smartrabbit on 16/8/11.
 * @flow
 * @providesModule OneTabsView
 */
'use strict';
import type Navigator from 'Navigator';
import type {Tab} from '../Actions/tabsViewAction'
var React = require('React');
import TabNavigator from 'react-native-tab-navigator';
var MainScreen = require('../Components/MainScreen');
var {connect} = require('react-redux');
var {switchTab} = require('../Actions/tabsViewAction');
var {changeNavibarHidden,changeStatusBarStyle,changeStatusBarColor} = require('../Actions/DemoAction');
import MovieScreen from '../Components/MovieScreen';
import ReadScreen from '../Components/ReadScreen';
import {
    StyleSheet,
    Image
} from 'react-native';

class OneTabsView extends React.Component {
  onTabSelect(tab: Tab) {
    console.log(tab);
    if (this.props.tab !== tab) {
      this.props.dispatch(switchTab(tab));
    }
  }
  componentDidMount() {
    this.props.dispatch(changeNavibarHidden(true));
    this.props.dispatch(changeStatusBarColor('#252a8e'));
    this.props.dispatch(changeStatusBarStyle('light-content'));
  }
  _renderTabItem(title,img, selectedImg, tag, childView) {
      return (
          <TabNavigator.Item
            selectedTitleStyle={{color:'green',}}
            selected={this.props.tab === tag}
            title={title}
            renderIcon={() => <Image style={styles.tabIcon} source={img}/>}
            renderSelectedIcon={() => <Image style={styles.tabIcon} source={selectedImg}/>}
            onPress={() => this.onTabSelect(tag)}>
            {childView}
          </TabNavigator.Item>
      );
    }
  render(){
    return(
      <TabNavigator hidesTabTouch={true} tabBarStyle={styles.tab}>
        {this._renderTabItem('图片',require('../img/picture_normal.png'), require('../img/picture_pressed.png'), 'picture', <MainScreen navigator={this.props.navigator}/>)}
        {this._renderTabItem('阅读',require('../img/read_normal.png'), require('../img/read_pressed.png'), 'read', <ReadScreen navigator={this.props.navigator}/>)}
        {this._renderTabItem('电影',require('../img/movie_normal.png'), require('../img/movie_pressed.png'), 'movie', <MovieScreen navigator={this.props.navigator}/>)}
      </TabNavigator>
    );
  };
}
const styles = StyleSheet.create({
  tab: {
    height: 52,
    backgroundColor: '#303030',
    alignItems: 'center',
  },
  tabIcon: {
    width: 30,
    height: 28,
    resizeMode: 'contain',
    paddingTop: 1.5
  }
});
function select(store) {
  return {
    tab: store.tabsViewReducer.tab,
  };
}
module.exports = connect(select)(OneTabsView);
