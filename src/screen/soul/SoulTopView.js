
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import SqlService from '../../providers/SqlService';

var URL = "http://kyucxua.net/api/index/top_view";

export default class SoulTopView extends Component{
    static navigationOptions =({ navigation }) => ({
        title: 'Xem nhiều nhất',
        headerLeft: <TouchableOpacity onPress={()=>{navigation.navigate('DrawerOpen')}}>
            <Text style={{marginLeft: 10, color:'#2196F3', fontSize: 20}}>Menu</Text></TouchableOpacity>,
        headerTitleStyle :{textAlign: 'center',alignSelf:'center'},
    });

    constructor(props){
        super(props);

        this.state = {
            dataFlatlist: [],
            number_per_page: 8,
            page: 1,
            fontSize: 14,
            color: '#111',
            bgColor: '#fff'
        };

        SqlService.select('souls', '*', '', null, 'views DESC', [this.state.page - 1, this.state.number_per_page]).then(res=>{
            // console.log(4444444444444444444);
            this.setState({
                dataFlatlist: res
            })
        });

        SqlService.select('setting', '*', 'id = 1').then(res1=>{
            if(res1.length > 0){
                this.setState({
                    fontSize: res1[0].fontSize,
                    color: res1[0].color,
                    bgColor: res1[0].bgColor
                })
            }
        });
    }

    loadMore(){
        this.setState({
            page: this.state.page + 1
        });

        SqlService.select('souls', 'id, title', '', null, 'views DESC', [this.state.page*this.state.number_per_page, this.state.number_per_page]).then(res=>{
            this.setState({
                dataFlatlist: this.state.dataFlatlist.concat(res)
            });
        });
    }

    render(){
        return(
            <FlatList
                data = {this.state.dataFlatlist}
                keyExtractor={(item, index) => item.id}

                onEndReachedThreshold = {0.4}
                onEndReached = {()=>{
                    this.loadMore();
                }}

                renderItem={({item})=>
                    <TouchableOpacity onPress = {()=>{this.props.navigation.navigate('Detail_screen', {story_id: item.id, story_title: item.title.replace(/&#8230;/g,'...')})}}>
                        <View style={{flexDirection:'column', flex: 1}}>
                            <View style={{padding: 16, borderBottomWidth:1, borderBottomColor:'#ccc'}}>
                                <Text style={{color: this.state.color, fontSize: 18}}>{item.title.replace(/&#8230;/g,'...')}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                }

                style={{backgroundColor: this.state.bgColor}}
            />
        );
    }
}
