/**
 * Created by smartrabbit on 16/8/8.
 */
'use strict';

import {
    AsyncStorage,
    Image,
    StyleSheet,
    Text,
    View,
    Dimensions,
} from 'react-native';
var StatusBar = require('StatusBar');
var React = require('react');
var Animated = require('Animated');

var WINDOW_WIDTH = Dimensions.get('window').width;
var WINDOW_HEIGHT = Dimensions.get('window').height;



var SplashScreen = React.createClass({

    getInitialState: function() {
        return {
            cover: null,
            bounceValue: new Animated.Value(1),
        };
    },
    componentDidMount: function() {

        this.state.bounceValue.setValue(1);
        Animated.timing(
            this.state.bounceValue,
            {
                toValue: 1.2,
                duration: 3000,
            }
        ).start();
    },
    render: function() {
        return(

            <View style={styles.container}>
              <StatusBar
                translucent={true}
                backgroundColor="rgba(0, 0, 0, 0.2)"
                barStyle="light-content"
              />
              <Animated.Image
                source={require('../img/splash.png')}
                style={{
                  flex: 1,
                  width: WINDOW_WIDTH,
                  height: 1,
                  transform: [
                  {scale: this.state.bounceValue},
                  ]
                }} />
              <Text style={styles.text}>
                ONE.|一个
                </Text>
                {/*<Image style={styles.logo} source={{uri:'http://qfchudemo.oss-cn-shanghai.aliyuncs.com/splash_logo.png'}} />*/}
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    cover: {
        flex: 1,
        width: 200,
        height: 1,
    },
    logo: {
        resizeMode: 'contain',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 30,
        height: 54,
        backgroundColor: 'transparent',
    },
    text: {
        flex: 1,
        fontSize: 26,
        fontWeight:'bold',
        textAlign: 'center',
        color: 'white',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: WINDOW_HEIGHT/2,
        backgroundColor: 'transparent',
    }
});

module.exports = SplashScreen;
