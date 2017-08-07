
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import SqlService from '../../providers/SqlService';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

var URL = "http://kyucxua.net/api/index/list_fun";
class Setting extends Component{

    static navigationOptions =({ navigation }) => ({
        title: 'Cài đặt',
        headerLeft: <TouchableOpacity onPress={()=>{navigation.navigate('DrawerOpen')}}>
            <Text style={{marginLeft: 10}}>
                <Icon name="bars" style={{color: "#2196F3", fontSize: 30}}/>
            </Text></TouchableOpacity>,
        headerTitleStyle :{textAlign: 'center',alignSelf:'center'},
    });

    constructor(props){
        super(props);
    }

    changeBgColor(color){
        console.log(color);
        SqlService.query("CREATE TABLE IF NOT EXISTS 'setting' ('id' INTEGER PRIMARY KEY AUTOINCREMENT, 'bgColor' VARCHAR, 'color' VARCHAR, 'fontSize' INTEGER)").then(res=>{
            SqlService.update('setting', ['bgColor'], [color], 'id = 1').then(res1=>{
                this.props.dispatch({
                    type: 'SET_BGCOLOR',
                    bgColor: color
                });
            });
        });
    }

    changeColor(color){
        SqlService.query("CREATE TABLE IF NOT EXISTS 'setting' ('id' INTEGER PRIMARY KEY AUTOINCREMENT, 'bgColor' VARCHAR, 'color' VARCHAR, 'fontSize' INTEGER)").then(res=>{
            SqlService.update('setting', ['color'], [color], 'id = 1').then(res1=>{
                this.props.dispatch({
                    type: 'SET_COLOR',
                    color: color
                });
            });
        });
    }

    changeFontsize(flag = 0){
        console.log(flag);
        if(flag == 1){
            SqlService.query("CREATE TABLE IF NOT EXISTS 'setting' ('id' INTEGER PRIMARY KEY AUTOINCREMENT, 'bgColor' VARCHAR, 'color' VARCHAR, 'fontSize' INTEGER)").then(res=>{
                SqlService.update('setting', ['fontSize'], [this.props.fontSize], 'id = 1').then(res1=>{
                    this.props.dispatch({
                        type: 'SET_FONT',
                        fontSize: this.props.fontSize - 1
                    });
                });
            });
        }
        else if(flag == 2){
            SqlService.query("CREATE TABLE IF NOT EXISTS 'setting' ('id' INTEGER PRIMARY KEY AUTOINCREMENT, 'bgColor' VARCHAR, 'color' VARCHAR, 'fontSize' INTEGER)").then(res=>{
                SqlService.update('setting', ['fontSize'], [this.props.fontSize], 'id = 1').then(res1=>{
                    this.props.dispatch({
                        type: 'SET_FONT',
                        fontSize: this.props.fontSize + 1
                    });
                });
            });
        }
    }

    render(){
        return(
            <View style={{backgroundColor: this.props.bgColor, flex:1}}>
                <View style={styles.row}>
                    <View style={{flex: 4, justifyContent:'center'}}>
                        <Text style={{backgroundColor: this.props.bgColor, fontSize:20}}>Font chữ</Text>
                    </View>

                    <View style={{flex: 1, justifyContent:'center'}}>
                        <TouchableOpacity onPress={()=>{this.changeFontsize(1)}}>
                            <Icon name="minus" style={styles.textStyle}/>
                        </TouchableOpacity>
                    </View>

                    <View style={{flex: 1, justifyContent:'center'}}>
                        <Text style={{backgroundColor: this.props.bgColor, fontSize:20}}>
                            {this.props.fontSize}
                        </Text>
                    </View>

                    <View style={{flex: 1, justifyContent:'center'}}>
                        <TouchableOpacity onPress={()=>{this.changeFontsize(2)}}>
                            <Icon name="plus" style={{backgroundColor: this.props.bgColor, fontSize:20}}/>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.row}>
                    <View style={{flex: 1, justifyContent:'center'}}>
                        <Text style={{backgroundColor: this.props.bgColor, fontSize:20}}>Màu nền</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent:'center'}}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent:'center'}}>
                            <TouchableOpacity onPress={()=>{this.changeBgColor('#ffffff')}}>
                                <View style={[styles.circle, styles.bgWhite]}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent:'center'}}>
                            <TouchableOpacity onPress={()=>{this.changeBgColor('#cccccc')}}>
                                <View style={[styles.circle, styles.bgGray]}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent:'center'}}>
                            <TouchableOpacity onPress={()=>{this.changeBgColor('#111111')}}>
                                <View style={[styles.circle, styles.bgBlack]}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={{flex: 1, justifyContent:'center'}}>
                        <Text style={{backgroundColor: this.props.bgColor, fontSize:20}}>Màu chữ</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent:'center'}}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent:'center'}}>
                            <TouchableOpacity onPress={()=>{this.changeColor('#ffffff')}}>
                                <View style={[styles.circle, styles.bgWhite]}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent:'center'}}>
                            <TouchableOpacity onPress={()=>{this.changeColor('#cccccc')}}>
                                <View style={[styles.circle, styles.bgGray]}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent:'center'}}>
                            <TouchableOpacity onPress={()=>{this.changeColor('#111111')}}>
                                <View style={[styles.circle, styles.bgBlack]}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        padding: 16,
        flexDirection: 'row',
        borderBottomWidth:1,
        borderBottomColor:'#333'
    },
    circle: {
        justifyContent:'center',
        height: 50,
        width: 50,
        borderWidth:1,
        borderColor:'#333',
        borderRadius: 50
    },
    bgWhite:{
        backgroundColor: '#ffffff'
    },
    bgBlack:{
        backgroundColor: '#111111'
    },
    bgGray:{
        backgroundColor: '#cccccc'
    }
});

function mapStateToProps(state) {
    return {
        fontSize: state.fontSize,
        bgColor: state.bgColor,
        color: state.color
    }
}

export default connect(mapStateToProps)(Setting);