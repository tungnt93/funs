
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import SqlService from '../../providers/SqlService';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

var URL = "http://kyucxua.net/api/index/all_soul";

class Soul extends Component{

    static navigationOptions =({ navigation }) => ({
        title: 'Hạt giống tâm hồn',
        headerTitleStyle :{textAlign: 'center',alignSelf:'center', color: "#2196F3"},
    });

    constructor(props){
        super(props);
        // this.props = props;
        this.state = {
            refresh: false,
            dataFlatlist: [],
            number_per_page: 8,
            page: 1
        }

        SqlService.select('souls', '*', '', null, null, [this.state.page - 1, this.state.number_per_page]).then(res=>{
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
                var arr = responseData.data.souls;
                var len = arr.length;
                SqlService.query("CREATE TABLE IF NOT EXISTS 'souls' ('id' INTEGER PRIMARY KEY, 'title' VARCHAR, 'content' TEXT, 'views' INTEGER, 'isView' BOOLEAN)").then(res=>{
                    // console.log(11111111111111111);
                    for(var i = 0; i < len; i++){
                        // console.log(arr[i]);
                        SqlService.insert('souls', ['id', 'title','content', 'views', 'isView'], [arr[i].id, arr[i].title, arr[i].content.replace(/<p>/g,'').replace(/<\/p>/g, '\n').replace(/\n\s+/mg, '\n').replace(/\n+/mg, '\n'), arr[i].views, false]).then(res1=>{
                            console.log(res1);
                        });
                        if(i==len - 1){
                            SqlService.select('souls', '*', '', null, null, [this.state.page - 1, this.state.number_per_page]).then(res=>{
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
        SqlService.select('souls', 'id, title, content, isView', '', null, 'id DESC', [this.state.page*this.state.number_per_page, this.state.number_per_page]).then(res=>{
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
                    <TouchableOpacity onPress = {()=>{this.props.navigation.navigate('Detail_screen', {story_id: item.id, story_title: item.title.replace(/&#8230;/g,'...')})}}>
                        <View style={{padding: 16, borderBottomWidth:1, borderBottomColor:'#ccc', flex:1}}>
                            <View style={{flexDirection:'row'}}>
                                <View style={{flex: 6, paddingRight: 12}}>
                                    <Text style={{color: this.props.color, fontSize: this.props.fontSize}}>{item.title}</Text>
                                    <Text>{item.content.slice(0, 120)}</Text>
                                </View>
                                <View style={{flexDirection:'row', flex: 1, justifyContent:'center', alignItems:'center'}}>
                                    {item.isView == true ? <Text style={{fontSize:12}}>Đã xem</Text> : <Icon name="angle-right" style={{color: "#111", fontSize: 20}}/>}
                                </View>
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

export default connect(mapStateToProps)(Soul);
