/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  NavigatorIOS,
  AlertIOS,
  Text,
  View
} from 'react-native';
//module.exports APP_KEY = "5c546c2e3aa79cc635a5d8ba0e0bcca4";


var Main = require('./Cook/main.ios.js');

class JHCook extends Component {
  constructor(props){
      super(props);
      this.state={
        jhTitle:'JHCook',
      }
  }
  render() {
    var aTitle = this.state.jhTitle;
    return (
      <NavigatorIOS
          style={styles.container}
          initialRoute={{
            title: aTitle,
            component: Main,
          }} />   
     );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('JHCook', () => JHCook);
