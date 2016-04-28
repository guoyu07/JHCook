/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Modal,
  Text,
  Dimensions,
  Image,
  TabBarIOS,
  ScrollView,
  View
} from 'react-native';


//https://github.com/oblador/react-native-vector-icons
var Icon = require('react-native-vector-icons/Ionicons');

var CookDetail  = class JHCook extends Component {
constructor(props){
      super(props);
      this.state={
       window:Dimensions.get('window'),
      }
  }
  _renderPicItem(index,data){
      var bgColor = 'white';
      if (index%2 === 1) {
        bgColor = 'gray';
      }


    return (
       <TouchableHighlight >
      <View key={data.img}
       style={{flex:1,padding:5,backgroundColor:bgColor,padding:10}}>
        underlayColor='#12345d'>
        
        <Text style={{flex:1,alignSelf:'center',fontSize:25}}>{data.step}</Text>
         <Image  style={{alignSelf:'center',width:this.state.window.width,height:this.state.window.width/16*9}}
          source={{uri:data.img}}/>
      </View>
      </TouchableHighlight>
      );
  }
    render() {
      var itemData = this.props.cookData;

      //图片步骤
      var steps = [];
      for(var index=0; index<itemData.steps.length; ){
        steps.push(this._renderPicItem(index,itemData.steps[index]));
        index++;
      }

    return (
      <ScrollView style={styles.container}>
          <View>
          <Text>  {itemData.imtro }</Text>
             <Image  style={{alignSelf:'center',width:this.state.window.width,height:this.state.window.width/16*9}}
              source={{uri:itemData.albums[0]}}/>
          <Text>主料：{itemData.ingredients }</Text>
                <Text>辅料：{itemData.burden}</Text>
          </View>
          {steps}
      </ScrollView>
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
module.exports = CookDetail;