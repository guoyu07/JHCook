/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
  TouchableHighlight,
    
  TabBarIOS,
  View
} from 'react-native';


//https://github.com/oblador/react-native-vector-icons
var Icon = require('react-native-vector-icons/Ionicons');

var CategorySection  = class JHCook extends Component {
constructor(props){
      super(props);
      this.state={
        name:this.props.name,
        items:this.props.items,
        callBack:this.props.callBack,
        parentId:this.props.parentId,
         nav:this.props.nav,//需要将navigator传递过来
      }
  }

  _renderClickItem(item, index){
    
    return (
      <TouchableHighlight key={item.id} 
          onPress={()=>{
            this.state.callBack&&this.state.callBack(item.parentId,item.id);
          }
        }>
        <View style={{backgroundColor:'white'}}>
              <Text style={{padding:10,fontSize:30}}>{item.name}</Text>
        </View>
      </TouchableHighlight>
      );
  }
    render() {
      var items = this.state.items;
      var tmp = [];
          for(var index=0; index< items.length; index++){
            var item = items[index];
            tmp.push(this._renderClickItem(item, index));
      }

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{this.state.name}</Text>
        <ScrollView style={{flex:1,}}>
        <View style={[styles.container,{width:Dimensions.get('window').width,flexDirection:'row',flexWrap:'wrap',justifyContent:'flex-start'}]}>{tmp}</View>
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
    flexDirection:'column',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    alignSelf:'flex-start',
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
module.exports = CategorySection;