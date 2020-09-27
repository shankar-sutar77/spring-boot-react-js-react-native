/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Root from "./src/components/Landing";
AppRegistry.registerComponent(appName, () => Root);
