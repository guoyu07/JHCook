/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  ScrollView,
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
var ChannelNews = require('./channel/channel_news.ios.js');
var ChannelNewsLook = require('./channel/channel_news_look.ios.js')
var Home  = class JHCook extends Component {
constructor(props){
      super(props);
      this.state={
       url:'http://blog.sina.com.cn/u/3962633044',
        news:[],
        currChannelId:'',
      }
  }

  _fetchNews(channelId,channelName){

    fetch("http://apis.baidu.com/showapi_open_bus/channel_news/search_news?channelId="+channelId+"&channelName="+channelName,{
    method:'GET',
    headers:{"apikey":"55b85eaa0a7e55bb7e9850109d277fc8"}
}).
    then((response)=>response.json()).
    then((jsonResponse)=>{
      console.log(jsonResponse);

    var showapi_res_code = jsonResponse.showapi_res_code;

    if (showapi_res_code == 0) {
      var tmp = jsonResponse.showapi_res_body.pagebean.contentlist;
      this.setState({news:tmp});
    }

    }).
    done();
  }

    render() {
    var newsItems = [];
  for (var i = 0; i < this.state.news.length; i++) {
    var item =this.state.news[i];
  newsItems.push(<ChannelNewsLook key={i} channelData={item}/>);
  }


    return (

      <View style={styles.container}>
        <ChannelNews didSelected={(channelId,channelName)=>{
          // AlertIOS.alert("Title",channelId+"\n"+channelName);
          this._fetchNews(channelId,channelName);
        }}/>

<ScrollView>
      {newsItems}
</ScrollView>
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
module.exports = Home;
