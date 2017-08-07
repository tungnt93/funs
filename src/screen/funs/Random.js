
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SqlService from '../../providers/SqlService';

export default class Random extends Component{
    static navigationOptions =({ navigation }) => ({
        title: 'Xem ngẫu nhiên',
        headerLeft: <TouchableOpacity onPress={()=>{navigation.navigate('DrawerOpen')}}>
            <Text style={{marginLeft: 10}}>
                <Icon name="bars" style={{color: "#2196F3", fontSize: 30}}/>
            </Text></TouchableOpacity>,
        headerTitleStyle :{textAlign: 'center',alignSelf:'center', color: "#2196F3"},
    });

    constructor(props){
        super(props);
        this.state = {
            refresh: false,
            dataFlatlist: [],
            fontSize: 14,
            color: '#111',
            bgColor: '#fff'
        };

        SqlService.select('stories', '*', '', null, 'RANDOM()', [0, 8]).then(res=>{
            this.setState({
                dataFlatlist: res
            })
        });

        SqlService.select('setting', '*', 'id = 1').then(res1=>{
            // console.log(55555555555555555);
            if(res1.length > 0){
                this.setState({
                    fontSize: res1[0].fontSize,
                    color: res1[0].color,
                    bgColor: res1[0].bgColor
                })
            }
        });
    }

    refresh(){
        this.setState({
            refresh: true
        });
        SqlService.select('stories', '*', '', null, 'RANDOM()', [0, 8]).then(res=>{
            this.setState({
                dataFlatlist: res,
                refresh: false
            })
        });
    }

    render(){
        return(
            <View style={{flex:1, backgroundColor:this.state.bgColor}}>
                <FlatList
                    data = {this.state.dataFlatlist}
                    keyExtractor={(item, index) => item.id}

                    refreshing = {this.state.refresh}
                    onRefresh={()=>{this.refresh()}}

                    renderItem={({item})=>
                        <TouchableOpacity onPress = {()=>{this.props.navigation.navigate('Detail_screen', {story_id: item.id, story_title: item.title})}}>
                            <View style={{flexDirection:'column', flex: 1}}>
                                <View style={{padding: 16, borderBottomWidth:1, borderBottomColor:'#ccc'}}>
                                    <Text style={{color:this.state.color, fontSize: 18}}>{item.title}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                />
                <Text style={{textAlign:'center', paddingBottom: 6, color: this.state.color}}>Giữ và vuốt xuống dưới để lấy danh sách ngẫu nhiên mới</Text>
            </View>
        );
    }
}
