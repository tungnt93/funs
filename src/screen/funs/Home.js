
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ListView, NetInfo, FlatList} from 'react-native';
import SqlService from '../../providers/SqlService';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

// var URL = "http://kyucxua.net/api/index/list_fun";
var URL = "http://kyucxua.net/api/index/all_fun";

class Home extends Component{

    static navigationOptions =({ navigation }) => ({
        title: 'Truyện cười',
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
            number_per_page: 8,
            page: 1
        }

        SqlService.select('stories', '*', '', null, null, [this.state.page - 1, this.state.number_per_page]).then(res=>{
            this.setState({
                dataFlatlist: res
            });
        });
    }

    refresh(){
        this.setState({
            refresh: true,
            page: 1
        });

        fetch(URL)
            .then((response)=> response.json())
            .then((responseData)=>{
                var arr = responseData.data.funs;
                var len = arr.length;
                SqlService.query("CREATE TABLE IF NOT EXISTS 'stories' ('id' INTEGER PRIMARY KEY, 'title' VARCHAR, 'content' TEXT, 'views' INTEGER, 'isView' BOOLEAN)").then(res=>{
                    // console.log(11111111111111111);
                    for(var i = 0; i < len; i++){
                        // console.log(arr[i]);
                        SqlService.insert('stories', ['id', 'title','content', 'views', 'isView'], [arr[i].id, arr[i].title, arr[i].content.replace(/<p>/g,'').replace(/<\/p>/g, '\n'), arr[i].views], false).then(res1=>{
                            console.log(res1);
                        });
                        if(i==len - 1){
                            SqlService.select('stories', '*', '', null, null, [this.state.page - 1, this.state.number_per_page]).then(res=>{
                                // console.log(22222222222222222);
                                this.setState({
                                    dataFlatlist: res,
                                    refresh:false
                                })
                            });
                        }
                    }
                });
            })
             .done();
    }

    loadMore(){
        this.setState({
            page: this.state.page + 1
        })
        SqlService.select('stories', 'id, title, isView', '', null, 'id DESC', [this.state.page*this.state.number_per_page, this.state.number_per_page]).then(res=>{
            this.setState({
                dataFlatlist: this.state.dataFlatlist.concat(res)
            })
        });
    }

    render(){
        return(
            <FlatList
                data = {this.state.dataFlatlist}
                keyExtractor={(item, index) => item.id}

                refreshing = {this.state.refresh}
                onRefresh={()=>{this.refresh()}}

                onEndReachedThreshold = {0.4}
                onEndReached = {()=>{
                    this.loadMore();
                }}

                renderItem={({item})=>
                    <TouchableOpacity onPress = {()=>{this.props.navigation.navigate('Detail_screen', {story_id: item.id, story_title: item.title})}}>
                        <View style={{flexDirection:'column', flex: 1}}>
                            <View style={{padding: 16, borderBottomWidth:1, borderBottomColor:'#ccc'}}>
                                <Text style={{color: this.props.color, fontSize: this.props.fontSize}}>{item.title}</Text>
                                <Text>{(item.isView == true) ? 'Đã xem' : 'Chưa xem'}</Text>
                                <Text>{this.props.color}</Text>
                                <Text>{this.props.bgColor}</Text>
                                <Text>{this.props.fontSize}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                }

                style={{backgroundColor: this.props.bgColor}}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        fontSize: state.fontSize,
        bgColor: state.bgColor,
        color: state.color
    }
}

export default connect(mapStateToProps)(Home);

