
import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Menu extends Component{

    render(){
        return(
            <View style={{flex:1}}>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('DrawerClose')}}>
                    <View style={{padding: 12, flexDirection: 'row', borderBottomColor: '#ccc', borderBottomWidth: 1}}>
                        <View style={{flex: 1, justifyContent:'center'}}>
                            <Icon name="chevron-left" style={{color: "#2196F3", fontSize: 25}}/>
                        </View>
                        <View style={{flex: 6, justifyContent:'center'}}>
                            <Text style={{color: "#2196F3", fontSize: 20,}}>Menu</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('FunTabbar')}}>
                    <View style={{padding: 12, flexDirection: 'row'}}>
                        <View style={{flex: 1, justifyContent:'center'}}>
                            <Icon name="smile-o" style={{color: "#111", fontSize: 20}}/>
                        </View>
                        <View style={{flex: 8, justifyContent:'center'}}>
                            <Text style={{color: "#111", fontSize: 18}}>Truyện cười</Text>
                        </View>
                        <View style={{flex: 1, justifyContent:'center'}}>
                            <Icon name="angle-right" style={{color: "#111", fontSize: 20}}/>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('SoulMenu')}}>
                    <View style={{padding: 12, flexDirection: 'row'}}>
                        <View style={{flex: 1, justifyContent:'center'}}>
                            <Icon name="leaf" style={{color: "#111", fontSize: 20}}/>
                        </View>
                        <View style={{flex: 8, justifyContent:'center'}}>
                            <Text style={{color: "#111", fontSize: 18}}>Hạt giống tâm hồn</Text>
                        </View>
                        <View style={{flex: 1, justifyContent:'center'}}>
                            <Icon name="angle-right" style={{color: "#111", fontSize: 20}}/>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('SettingMenu')}}>
                    <View style={{padding: 12, flexDirection: 'row'}}>
                        <View style={{flex: 1, justifyContent:'center'}}>
                            <Icon name="cog" style={{color: "#111", fontSize: 20}}/>
                        </View>
                        <View style={{flex: 8, justifyContent:'center'}}>
                            <Text style={{color: "#111", fontSize: 18}}>Cài đặt</Text>
                        </View>
                        <View style={{flex: 1, justifyContent:'center'}}>
                            <Icon name="angle-right" style={{color: "#111", fontSize: 20}}/>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('InfoMenu')}}>
                    <View style={{padding: 12, flexDirection: 'row'}}>
                        <View style={{flex: 1, justifyContent:'center'}}>
                            <Icon name="info-circle" style={{color: "#111", fontSize: 20}}/>
                        </View>
                        <View style={{flex: 8, justifyContent:'center'}}>
                            <Text style={{color: "#111", fontSize: 18}}>Thông tin sản phẩm</Text>
                        </View>
                        <View style={{flex: 1, justifyContent:'center'}}>
                            <Icon name="angle-right" style={{color: "#111", fontSize: 20}}/>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}