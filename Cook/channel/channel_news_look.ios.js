/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  AlertIOS,
  Modal,
  TouchableHighlight,
  TabBarIOS,
  WebView,
  View
} from 'react-native';


//https://github.com/oblador/react-native-vector-icons
var Icon = require('react-native-vector-icons/Ionicons');

var ChannelNewsLook  = class JHCook extends Component {
constructor(props){
      super(props);
      this.state={
        channelItem:this.props.channelData,
      }
  }
    _channelNewsImgs(items){
    if (items.length == 0) {
      return;
    }
    return (<ScrollView style={{flex:1,width:Dimensions.get('window').width,height:119}}>

    </ScrollView>);
}

    render() {

    return (

      <View style={styles.container}>
<Text>
{this.state.channelItem.title}
</Text>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'red',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'column',
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
module.exports = ChannelNewsLook;
