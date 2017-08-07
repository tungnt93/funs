
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SqlService from '../../providers/SqlService';
var URL = "http://kyucxua.net/api/index/all_fun";

export default class TopView extends Component{
    static navigationOptions =({ navigation }) => ({
        title: 'Xem nhiều nhất',
        headerLeft: <TouchableOpacity onPress={()=>{navigation.navigate('DrawerOpen')}}>
            <Text style={{marginLeft: 10}}>
                <Icon name="bars" style={{color: "#2196F3", fontSize: 30}}/>
            </Text></TouchableOpacity>,
        headerTitleStyle :{textAlign: 'center',alignSelf:'center', color: "#2196F3"},
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

        SqlService.select('stories', '*', '', null, 'views DESC', [this.state.page - 1, this.state.number_per_page]).then(res=>{
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

    // fetchData(){
    //     return fetch(URL)
    //         .then((response)=> response.json())
    //         .then((responseData)=>{
    //             var arr = responseData.data.funs;
    //             var len = arr.length;
    //             for(var i = 0; i < len; i++){
    //                 // console.log(arr[i]);
    //                 SqlService.insert('stories', ['id', 'title','content', 'views'], [arr[i].id, arr[i].title, arr[i].content, arr[i].views]).then(res1=>{
    //                     // console.log(33333333333333333);
    //                 });
    //                 if(i == len - 1 ){
    //                     SqlService.select('stories', '*', '', null, 'views DESC', [this.state.page - 1, this.state.number_per_page]).then(res2=>{
    //                         // console.log(22222222222222222);
    //                         this.setState({
    //                             dataFlatlist: res2
    //                         })
    //                     });
    //                 }
    //             }
    //         })
    //         .done();
    // }

    loadMore(){
        this.setState({
            page: this.state.page + 1
        });

        SqlService.select('stories', 'id, title', '', null, 'views DESC', [this.state.page*this.state.number_per_page, this.state.number_per_page]).then(res=>{
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
                    <TouchableOpacity onPress = {()=>{this.props.navigation.navigate('Detail_screen', {story_id: item.id, story_title: item.title})}}>
                        <View style={{flexDirection:'column', flex: 1}}>
                            <View style={{padding: 16, borderBottomWidth:1, borderBottomColor:'#ccc'}}>
                                <Text style={{color: this.state.color, fontSize: 18}}>{item.title}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                }

                style={{backgroundColor: this.state.bgColor}}
            />
        );
    }
}
