
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ListView} from 'react-native';
// import SqlService from '../../providers/SqlService';
import Icon from 'react-native-vector-icons/FontAwesome';

var URL = "http://kyucxua.net/api/index/list_fun";
export default class Info extends Component{

    static navigationOptions =({ navigation }) => ({
        title: 'Thông tin sản phẩm',
        headerLeft: <TouchableOpacity onPress={()=>{navigation.navigate('DrawerOpen')}}>
            <Text style={{marginLeft: 10}}>
                <Icon name="bars" style={{color: "#2196F3", fontSize: 30}}/>
            </Text></TouchableOpacity>,
        headerTitleStyle :{textAlign: 'center',alignSelf:'center'},
    });

    constructor(props){
        super(props);

    }

    render(){
        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'#111', fontSize:20}}>Sản phẩm được phát triển bởi Dopteam</Text>
                <Text style={{color:'#111', fontSize:20}}>Mọi ý kiến đóng góp xin gửi về hòm thư:</Text>
                <Text style={{color:'#111', fontSize:20}}>dopteams@gmail.com</Text>
                <Text style={{color:'#111', fontSize:20}}>Link website đọc truyện trực tuyến:</Text>
                <Text style={{color:'#111', fontSize:20}}>http://kyucxua.net/</Text>
            </View>
        );
    }
}
