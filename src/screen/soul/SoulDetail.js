
import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import SqlService from '../../providers/SqlService';

export default class SoulDetail extends Component{
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.story_title}`
    });

    constructor(props){
        super(props);
        this.state = {
            story_title: '',
            story_content: '',
            fontSize: 14,
            color: '#111',
            bgColor: '#fff'
        };

        SqlService.getDetail('souls', this.props.navigation.state.params.story_id).then(res=>{
            console.log(res[0].content);
            this.setState({
                story_title: res[0].title.replace(/&#8230;/g,'...'),
                story_content: res[0].content.replace(/<p>/g,'')
                    .replace(/<\/p>/g, '\n')
                    .replace(/&#8211;/g,'-')
                    .replace(/<strong>/g,'')
                    .replace(/<\/strong>/g, '')
                    .replace(/<em>/g, '')
                    .replace(/<\/em>/g, '')
                    .replace(/<br>/g, '\n')
                    .replace(/&#8230;/g,'...')
            })
        });

        SqlService.select('setting', '*', 'id = 1').then(res1=>{
            console.log(res1);
            if(res1.length > 0){
                this.setState({
                    fontSize: res1[0].fontSize,
                    color: res1[0].color,
                    bgColor: res1[0].bgColor
                })
            }
        });
    }

    render(){
        return(
            <ScrollView style={{flex:1, backgroundColor:this.state.bgColor, padding: 12}}>
                <View>
                    <Text style={{padding:6, fontSize: 20, fontWeight: 'bold', color: this.state.color}}>{this.state.story_title}</Text>
                    <Text style={{padding: 6, paddingBottom: 16, fontSize: this.state.fontSize, color: this.state.color, lineHeight: 30}}>{this.state.story_content}</Text>
                </View>
            </ScrollView>
        );
    }
}
