/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  TouchableHighlight,
  Text,
  AlertIOS,
  Image,
  ListView,
  TabBarIOS,
  View
} from 'react-native';


//https://github.com/oblador/react-native-vector-icons
var Icon = require('react-native-vector-icons/Ionicons');
var CookDetail = require('.././cook_detail.ios.js');

var CookList  = class JHCook extends Component {
constructor(props){
      super(props);
      this.state={
       dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}) ,
       query:this.props.query,
       nav:this.props.nav,
      }
  }
  componentDidMount() {
     fetch(this.state.query)
    .then((response)=>
      response.json()
      )
    .then((resJson)=>{
      console.info(resJson);
      this.setState({isLoading:false})
      if (resJson.resultcode!='200') {
      AlertIOS.alert("错误",resJson.reason);
        return;
      }

      var data = [];
      // this.state.dataSource;
      // for(var index =0 ; index< this.state.dataSource.length;index++){
      //   data.push(this.state.dataSource[index]);
      // }
      var result = resJson.result;
      for(var index=0;index<result.data.length;index++){
        data.push(result.data[index]);
      }
      console.info("获取的数据"+data[data.length/2]);
      this.setState({dataSource:this.state.dataSource.cloneWithRows(data)});
    })
    .done();
  }


    render() {
    return (
      <View style={styles.container}>
      <ListView
      style={{marginTop:0}}
        renderRow={this._renderRow.bind(this)}
        dataSource={this.state.dataSource}
      />
      </View>
    );
  }
  _renderRow(rowData,rowIndex ){
    console.info(rowData);
    var bgColor = '#eeddcc';
    var picURI = rowData.albums[0];
    if (picURI === '') {
      picURI = 'http://facebook.github.io/react-native/img/header_logo.png';
    }
    if (rowIndex%2 === 0) {
      bgColor = 'white';
    }
    return (
     <TouchableHighlight
       onPress={()=>{
        // AlertIOS.alert(rowData.title,rowData.ingredients);
         this.state.nav.push({
          title:rowData.title,
          component:CookDetail,
          passProps:{cookData:rowData},
         });
         }
       }
       underlayColor='#aabbbc'>
       
          <View style={{backgroundColor:bgColor,justifyContent:'flex-start',padding:5,flexDirection:'row'}} key={rowData.id+""+rowData.title}>
              <View style={{flex:1,flexDirection:'column'}}>
                  <Image style={{width:160,height:90}} 
                source={{uri:picURI}}/> 

                <Text style={{flex:1,fontSize:20}}>食物：{rowData.ingredients }</Text>
              </View>
             <View style={{flex:1}}>
                
                <Text>{rowData.title}</Text>
                 <Text style={{flex:1,fontSize:20}}>辅料：{rowData.burden}</Text>

             </View>
          </View>
          </TouchableHighlight>
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
module.exports = CookList;