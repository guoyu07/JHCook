/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TabBarIOS,
  View
} from 'react-native';


//https://github.com/oblador/react-native-vector-icons
var Icon = require('react-native-vector-icons/Ionicons');

var Search = require('./search.ios.js');
var Home = require('./home.ios.js');

var Main  = class JHCook extends Component {
constructor(props){
      super(props);
      this.state={
        barSelected:[true,false],
        barTitled:["主页","搜索"],
        currentIndex:0,
      }
  }
    render() {
    return (
      <TabBarIOS >
        <Icon.TabBarItem
            onPress={()=>{
              this._selected(0);
            }}
          title={this.state.barTitled[0]}
          selected={this.state.barSelected[0]}
          iconName="ios-home-outline"
          selectedIconName="ios-home"
          >
            <Home />
        </Icon.TabBarItem>

       <Icon.TabBarItem
           onPress={()=>{
              this._selected(1);
            }}
          title={this.state.barTitled[1]}
          selected={this.state.barSelected[1]}
          iconName="ios-search-strong"
          selectedIconName="ios-search"
          >
              <Search nav={this.props.navigator}/>   
        </Icon.TabBarItem>
      </TabBarIOS>
    );
  }
  _selected( index){
    var selctedState =  this.state.barSelected;
    selctedState[index] = true;
    selctedState[this.state.currentIndex] = false;
    this.state.currentIndex = index;
    this.setState({barSelected:selctedState});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'red',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
module.exports = Main;