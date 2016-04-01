/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  ScrollView,
  ListView,
  TextInput,
  AlertIOS,
  TouchableHighlight,
  Image,
  TabBarIOS,
  View
} from 'react-native';


//https://github.com/oblador/react-native-vector-icons
var Icon = require('react-native-vector-icons/Ionicons');
var RefreshableListView = require('react-native-refreshable-listview')
var CookDetail = require('./cook_detail.ios.js');
var CookList = require('./cook_list/cook_list.ios.js');

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}) // assumes immutable objects

var Search  = class JHCook extends Component {
constructor(props){
      super(props);
      this.state={
       searchText:'',
       nav:this.props.nav,//需要将navigator传递过来
       isLoading:false,
       dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}) ,
      }
  }
    render() {
      var itemView;
      if (this.state.searchText === '') {
        itemView = (<View style={{flex:1,justifyContent:'center'}}><Text style={{alignSelf:'center'}}>没有结果</Text></View>);
      }else{
      itemView = ( 
        <View style={{flex:1}}>
              <CookList 
                nav={this.state.nav}
                query={
                  "http://apis.juhe.cn/cook/query.php?"+"menu="+this.state.searchText+"&dtype=&pn=&rn=&albums=&key=5c546c2e3aa79cc635a5d8ba0e0bcca4"}
              />
        </View>
        );
      }

    return (
      <View style={styles.container}>

      <TextInput
      onEndEditing={(e)=>{
        console.info(e.nativeEvent.text);
        this.setState({searchText:e.nativeEvent.text});
        // this._searchCook(e.nativeEvent.text);
      }}
      returnKeyType={'search'}
      clearTextOnFocus={true}
      clearButtonMode={'always'}
      placeholder={"输入菜系或者菜品"}
       multiline={false}
       style={{height: 40,marginLeft:10,marginRight:10, borderColor: 'gray', borderWidth: 1}}/>
     
         {itemView}
     
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
  /*
  搜索
  */
  _searchCook(menu){
    if (menu === '') {
      return;
    }
    this.setState({searchText:menu});
return;
    fetch("http://apis.juhe.cn/cook/query.php",{
      method:"POST",
      body:"menu="+menu+"&dtype=&pn=&rn=&albums=&key=5c546c2e3aa79cc635a5d8ba0e0bcca4"
    })
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor:'red',
    marginTop:64,
    paddingBottom:49,
    justifyContent: 'flex-start',
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
module.exports = Search;