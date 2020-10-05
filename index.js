/**
 * @format
 */

import { AppRegistry } from 'react-native';
import React from 'react';
import App from './App';
import { name as appName } from './app.json';
import { store } from './src/Store/Store';
import {Provider} from 'react-redux';

const root = () => (
    <Provider store={store}>
        <App></App>
    </Provider>
)

AppRegistry.registerComponent(appName, () => root);