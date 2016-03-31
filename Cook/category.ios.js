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

var Category  = class JHCook extends Component {
constructor(props){
      super(props);
      this.state={
         nav:this.props.nav,//需要将navigator传递过来
         sections:[],
      }
  }
  componentDidMount() {
    fetch("http://apis.juhe.cn/cook/category?parentid=&dtype=&key=5c546c2e3aa79cc635a5d8ba0e0bcca4").
      then((response)=> response.json()).
      then((jsonResponse)=>{
        console.info(jsonResponse);
          var code = jsonResponse.resultcode;
          if (code === '200') {
            this._serialSection(jsonResponse.result);
          }else{
            AlertIOS.alert("错误",jsonResponse.reason);
          }
      }).
      done();
  }

  _sectionItemClicked(parentId,id){
    AlertIOS.alert(""+parentId,""+id);
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
    return (
      <View style={styles.container}>
      <Text style={styles.welcome}>Category模版页面</Text>
      <ScrollView style={{flex:1}}>
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