/**
 * Created by smartrabbit on 16/8/8.
 */
'use strict';

import React,{Component} from 'react';
import {

} from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as reducers from './Reducers';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

var OneApp = require('./OneApp');
class Root extends React.Component{

    render(){
        return (
            <Provider store={store}>
                <OneApp />
            </Provider>
        );
    }
}
module.exports=Root;
