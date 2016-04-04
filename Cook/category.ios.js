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
  ScrollView,
  TabBarIOS,
  View
} from 'react-native';


//https://github.com/oblador/react-native-vector-icons
var Icon = require('react-native-vector-icons/Ionicons');
var CategorySection = require('./category/category_section.ios.js');
var api = require('./api.js');

var CookList = require('./cook_list/cook_list.ios.js');
var api = require('./api.js');

var Category  = class JHCook extends Component {
constructor(props){
      super(props);
      this.state={
         nav:this.props.nav,//需要将navigator传递过来
         sections:[],
         isloading:true,
         loadingIndicator:"正在加载数据…………",
      }
  }
  componentDidMount() {
    fetch(api.app_url+"category?parentid=&dtype=&key="+api.app_key).
      then((response)=> response.json()).
      then((jsonResponse)=>{
        console.info(jsonResponse);
          var code = jsonResponse.resultcode;
          if (code === '200') {
            this._serialSection(jsonResponse.result);
            this.setState({isloading:false,loadingIndicator:jsonResponse.reason});

          }else{
            this.setState({isloading:true,loadingIndicator:jsonResponse.reason});
            AlertIOS.alert("错误",jsonResponse.reason);
          }
      }).
      done();
  }

  _sectionItemClicked(parentId,id, name){
    // AlertIOS.alert(""+parentId,""+id);

this.state.nav.push(
  {title:name,
  component:CookList,
  passProps:{nav:this.state.nav,
    query:api.app_url+"index?cid="+id+"&dtype=&pn=&rn=&format=&key="+api.app_key
    }
  });

//     fetch("http://apis.juhe.cn/cook/index?cid="+id+"&dtype=&pn=&rn=&format=&key=5c546c2e3aa79cc635a5d8ba0e0bcca4")
//     .then((response)=>response.json())
//     .then((jsonResponse)=>{
// AlertIOS.alert(jsonResponse.reason,jsonResponse.resultcode);
//     })
//     .done();
  }

  _serialSection(result){
      var tmp = [];

      for(var index=0; index<result.length; index++){
            var item = result[index];
            var bgColor = '#eecdea';
            if (index%2 == 0) {
              bgCOlor = 'white';
            }
            tmp.push((<CategorySection style={{backgroundColor:bgColor}} key={item.parentId}  name={item.name}
              items={item.list}
              parentId={item.parentId}
              nav={this.nav}
              callBack={this._sectionItemClicked.bind(this)}
              />));
      }

      this.setState({sections:tmp});
  }
    render() {
      if (this.state.isloading) {

        return (
          <View style={[styles.container,{flex:1,justifyContent:'center',alignSelf:'center'}]}>
          <Text style={{alignSelf:'center'}}>{this.state.loadingIndicator}</Text>
          </View>
          );
      }
    return (
      <View style={styles.container}>
      <Text style={styles.welcome}>Category模版页面</Text>
      <ScrollView style={{flex:1,marginTop:20}}>
        {this.state.sections}
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
module.exports = Category;