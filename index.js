import 'react-native-get-random-values';
import { AppRegistry } from 'react-native';
import { Text, TextInput } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

Text.defaultProps = Text.defaultProps || {};
TextInput.defaultProps = TextInput.defaultProps || {};

Text.defaultProps.maxFontSizeMultiplier = 1.15;
Text.defaultProps.minFontSizeMultiplier = 1;
TextInput.defaultProps.maxFontSizeMultiplier = 1.15;

AppRegistry.registerComponent(appName, () => App);
