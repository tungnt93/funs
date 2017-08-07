
import React, {Component} from 'react';
import SqlService from './providers/SqlService';
import {View, Text} from 'react-native';
import * as Progress from 'react-native-progress';
import {SideMenu} from './Router';
import store  from './redux/store';
import { Provider } from 'react-redux';

var URL_fun = "http://kyucxua.net/api/index/all_fun";
var URL_soul = "http://kyucxua.net/api/index/all_soul";

export default class App extends Component{
    constructor(props){
        super(props);

        this.state = {
            loadDone: 0
        }

        // SqlService.dropTable('stories');
        // SqlService.dropTable('souls');
        // SqlService.dropTable('setting');


        SqlService.query("CREATE TABLE IF NOT EXISTS 'stories' ('id' INTEGER PRIMARY KEY, 'title' VARCHAR, 'content' TEXT, 'views' INTEGER, 'isView' BOOLEAN)").then(res=>{
            SqlService.selectFirst('stories').then(res1=>{
               if(res1.length == 0){
                   fetch(URL_fun).then((response)=>response.json()).then((responseData)=>{
                       var arr = responseData.data.funs;
                       var len = arr.length;
                       for(var i = 0; i < len; i++){
                           SqlService.insert('stories', ['id', 'title','content', 'views', 'isView'], [arr[i].id, arr[i].title, arr[i].content.replace(/<p>/g,'').replace(/<\/p>/g, '\n'), arr[i].views, false]).then(res2=>{
                               console.log(res2);
                           });
                           if(i == len - 1){
                               this.setState({
                                   loadDone: this.state.loadDone + 1
                               })
                           }
                       }
                   });
               }
               else{
                   this.setState({
                       loadDone: this.state.loadDone + 1
                   })
               }
            });
        });

        SqlService.query("CREATE TABLE IF NOT EXISTS 'souls' ('id' INTEGER PRIMARY KEY, 'title' VARCHAR, 'content' TEXT, 'views' INTEGER, 'isView' BOOLEAN)").then(res=>{
            SqlService.selectFirst('souls').then(res1=>{
                if(res1.length == 0){
                    fetch(URL_soul).then((response)=>response.json()).then((responseData)=>{
                        var arr = responseData.data.souls;
                        var len = arr.length;
                        for(var i = 0; i < len; i++){
                            SqlService.insert('souls', ['id', 'title','content', 'views', 'isView'], [arr[i].id, arr[i].title, arr[i].content.replace(/<p>/g,'').replace(/<\/p>/g, '\n'), arr[i].views, false]).then(res2=>{
                                // console.log(res2);
                            });
                            if(i == len - 1){
                                this.setState({
                                    loadDone: this.state.loadDone + 1
                                })
                            }
                        }
                    });
                }
                else{
                    this.setState({
                        loadDone: this.state.loadDone + 1
                    })
                }
            });
        });

        SqlService.query("CREATE TABLE IF NOT EXISTS 'setting' ('id' INTEGER PRIMARY KEY AUTOINCREMENT, 'bgColor' VARCHAR, 'color' VARCHAR, 'fontSize' INTEGER)").then(res=>{
            SqlService.select('setting', '*', 'id = 1').then(res1=>{
                if(res1.length == 0) {
                    SqlService.insert('setting', ['id', 'bgColor', 'color', 'fontSize'], [1, '#ffffff', '#111111', 18]).then(res1 => {
                        this.setState({
                            loadDone: this.state.loadDone + 1
                        })
                    });
                }
                else{
                    store.dispatch({
                        type:'SET_FONT',
                        fontSize: res1[0].fontSize
                    });
                    store.dispatch({
                        type:'SET_BGCOLOR',
                        bgColor: res1[0].bgColor
                    });
                    store.dispatch({
                        type:'SET_COLOR',
                        color: res1[0].color
                    });
                    this.setState({
                        loadDone: this.state.loadDone + 1
                    })
                }
            });
        });
    }

    render(){
        if(this.state.loadDone == 3) {
            return (
                <Provider store={store}>
                    <SideMenu/>
                </Provider>
            );
        }
        else{
            return(
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <Progress.CircleSnail color={['red', 'green', 'blue']} size= {60}/>
                    <Text style={{color: '#000', textAlign: 'center', fontSize:20, marginTop: 30}}>Đang tải xuống dữ liệu.</Text>
                    <Text style={{color: '#000', textAlign: 'center', fontSize:20}}>Nếu chưa có kết nối internet, hãy kết nối internet để tải dữ liệu.</Text>
                </View>
            );
        }
    }
}

// export default connect()(App);


