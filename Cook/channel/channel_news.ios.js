/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  AlertIOS,
  ScrollView,
  TouchableHighlight,
  Dimensions,
  TabBarIOS,
  WebView,
  View
} from 'react-native';


//https://github.com/oblador/react-native-vector-icons
var Icon = require('react-native-vector-icons/Ionicons');
var ChannelNews_URL = "http://apis.baidu.com/showapi_open_bus/channel_news/channel_news";

var ChannelNews  = class JHCook extends Component {
constructor(props){
      super(props);
      this.state={
       url:'http://blog.sina.com.cn/u/3962633044',
        channels:[],
        channelItems:[],
      }
  }
_fetechChannels(){
  fetch(ChannelNews_URL,{
    method:"GET",
    headers:{"apikey":"55b85eaa0a7e55bb7e9850109d277fc8"}
  }).
      then((response)=>response.json()).
        then((jsonResponse)=>{
        var channels =jsonResponse.showapi_res_body.channelList;
        if (channels.length>0) {
          this.setState({channels:channels});
        }
        }).
            done();
}
    componentWillMount() {
          this._fetechChannels();
    }
    _didSelected(channelId,channelName){
        this.props.didSelected&&this.props.didSelected(channelId,channelName);
    }
    _channelItem(channel){
        return (
          <TouchableOpacity key={channel.channelId} onPress={()=>{
            this._didSelected(channel.channelId,channel.name);
          }}>
            <Text style={{padding:5,justifyContent:'center'}}>
            {channel.name}
            </Text>
          </TouchableOpacity>
        );
    }
    render() {

      var tmpChannels = [];
      if (this.state.channels.length>0) {
            for (var i = 0; i < this.state.channels.length; i++) {
              var channel = this.state.channels[i];
              tmpChannels.push( this._channelItem(channel));
            }
          
      }


    return (

      <View style={styles.container}>
        <View style={{marginTop:64}}>
            <ScrollView horizontal={true}
              bounces={false}
              showsHorizontalScrollIndicator={false}
              automaticallyAdjustContentInsets={false}
               style={{flex:1,width:Dimensions.get('window').width,backgroundColor:'white'}}
            >
           {tmpChannels}
            </ScrollView>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'red',
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
module.exports = ChannelNews;
