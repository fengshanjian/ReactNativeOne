/**
 * Created by smartrabbit on 16/8/8.
 * @flow
 */
'use strict';
var React = require('react');
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
} from 'react-native';
import { connect } from 'react-redux';
import {changeNavibarHidden} from './Actions/DemoAction'
var SplashScreen = require('./Components/SplashScreen');
var OneNavigator = require('./OneNavigator');
import StatusBar from './cStatusBar';
import PushNotificationCenter from './PushNotificationCenter';
class OneApp extends React.Component {
    state:{
      splash:false,
    };

    constructor(props) {
        super(props);
        this.state = {splash: false};

    }
    componentDidMount() {
        let _this = this;
        this.timer = setTimeout(
            () => {
                _this.setState({splash: true});
            },
            2000
        );
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        if (this.state.splash) {
            return (
              <View style={{flex: 1}}>
                <StatusBar />
                <OneNavigator />
                <PushNotificationCenter />
              </View>
            );
        }
        else {
            return (
                <SplashScreen />
            );
        }

    }
}

module.exports = connect()(OneApp);
