/**
 * Created by smartrabbit on 16/8/11.
 * @flow
 */
'use strict';
var React = require('react');
var {connect} = require('react-redux');
var Platform = require('Platform');
var OneTabsView = require('OneTabsView');
var MainScreen = require('./Components/MainScreen');
var {Image, Navigator, StyleSheet, Text, TouchableOpacity, View} = require('react-native');


var NavigationBarRouteMapper = {
    LeftButton(route, navigator, index, navState) {
        if(route.leftTitle){
            return (
                <View style={styles.navItem}>
                  <TouchableOpacity
                    underlayColor='transparent'
                    onPress={() => {
                      if (route.leftPress) {
                        route.leftPress();
                      }
                      else{
                        navigator.pop();
                      }
                    }}>
                    <Text style={styles.leftNavButtonText}>
                      {route.leftTitle}
                    </Text>
                  </TouchableOpacity>
                </View>
            );
        }
        else if(route.leftImage){
          <View style={styles.navItem}>
            <TouchableOpacity
              onPress={() =>{
                if (route.leftPress) {
                  route.leftPress();
                }
                else{
                  navigator.pop();
                }
              }}>
              {route.rightImage}
            </TouchableOpacity>
          </View>
        }
        return null;

    },

    RightButton(route, navigator, index, navState) {
        if (route.rightPress){
           if(route.rightTitle){
            return (
                <View style={styles.navItem}>
                  <TouchableOpacity
                    onPress={() => route.rightPress()}>
                    <Text style={styles.rightNavButtonText}>
                      {route.rightTitle}
                    </Text>
                  </TouchableOpacity>
                </View>
            );
          }
          else if(route.rightImage){
            return (
                <View style={styles.navItem}>
                  <TouchableOpacity
                    onPress={() => route.rightPress()}>
                    {route.rightImage}
                  </TouchableOpacity>
                </View>
            );
          }
        }
        return null;

    },

    Title(route, navigator, index, navState) {
        if (route.title) {
            return (
                <View style={styles.navItem}>
                  <Text style={styles.title}>
                    {route.title}
                  </Text>
                </View>
            );
        }
        else {
            return null;
        }
    }
};


class OneNavigator extends React.Component{
  props:{
    hidden:false
  }
  renderScene(route, navigator) {
    console.log(JSON.stringify(route));
      return <route.component navigator={navigator} {...route.passProps}/>;
  }
  configureScene(route) {
      if (Platform.OS === 'android') {
          if (route.type === 'Modal') {
              return Navigator.SceneConfigs.FloatFromBottomAndroid;
          }
          return Navigator.SceneConfigs.FadeAndroid;
      }
      if (route.type == 'Modal') {
          return Navigator.SceneConfigs.FloatFromBottom;
      }
      return Navigator.SceneConfigs.PushFromRight;
  }
  renderNavBar(){

    if(!this.props.hidden){
      return <Navigator.NavigationBar
        style={styles.navBarContainer}
        routeMapper={NavigationBarRouteMapper}
             />;
    }
    else{
      return null;
    }
  }
  render(){

    return(
      <Navigator
        style={{flex:1}}
        initialRoute={{name: 'FirstPage', component: OneTabsView}}
        configureScene={this.configureScene}
        renderScene={this.renderScene.bind(this)}
        navigationBar={this.renderNavBar()}
      />
    );
  }
}
var styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    navBarContainer: {
        backgroundColor: 'blue',
        height:44
    },
    // 左面导航按钮
    leftNavButtonText: {
        color: '#ffffff',
        fontSize: 16,
        marginLeft: 13
    },
    // 右面导航按钮
    rightNavButtonText: {
        color: '#ffffff',
        fontSize: 16,
        marginRight: 13
    },
    //
    navItem: {
        backgroundColor: 'blue',
        marginTop: 10
    },
    // 标题
    title: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        flex: 1                //Step 3
    }
});
function select(state) {
    console.log('hahah:state:'+JSON.stringify(state));
    return {
        hidden: state.demoReducer.hidden
    };
}
module.exports = connect(select)(OneNavigator);
