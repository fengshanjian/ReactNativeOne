
/**
 * Created by smartrabbit on 16/8/8.
 * @flow
 */
'use strict'
import React from 'react';
import {
    View,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native'
import {changeNavibarHidden,changeStatusBarStyle} from '../Actions/DemoAction'
import { connect } from 'react-redux';

class SecondScreen extends React.Component{
    constructor(props){
        super(props);
        console.log('123456789');
    }
    goback(){
        const { navigator } = this.props;
        if(navigator){
            this.props.dispatch(changeNavibarHidden(false));
            this.props.dispatch(changeStatusBarStyle('light-content'));
            navigator.pop();
        }
    }
    componentDidMount(){
        let _this = this;
        this.timer = setTimeout(
            () => {
                //_this.props.dispatch(changeNavibarHidden(true));
                //_this.props.dispatch(changeStatusBarStyle('default'));
            },
            2000
        );
    }

    componentWillUnmount(){
        this.timer && clearTimeout(this.timer);
    }
    render(){

        return(

            <View style={styles.container}>
              <TouchableOpacity
                style={styles.button}
                onPress={()=>this.goback()}>
                <Text style={styles.title}>
                  {'返回'}
                </Text>
              </TouchableOpacity>

              <Image
                style={{
                  marginTop:20,
                  width: 300,
                  height: 200,
                }}
                resizeMode={"contain"}
                source={require('../img/splash.png')}
                />
            </View>
        );
    }
}
var styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 64,
        flexDirection: 'column'
    },
    // 按钮
    button: {
        height: 50,
        marginTop: 10,
        justifyContent: 'center', // 内容居中显示
        backgroundColor: '#ff1049',
        alignItems: 'center'
    },
    // 标题
    title: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        //Step 3
    }
});

module.exports = connect()(SecondScreen);
