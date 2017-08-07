
import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import SqlService from '../../providers/SqlService';
import { connect } from 'react-redux';

class Detail extends Component{
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.story_title}`,
        headerTitleStyle :{textAlign: 'center',alignSelf:'center', color: "#2196F3"},
    });

    constructor(props){
        super(props);
        this.state = {
            story_title: '',
            story_content: ''
        };

        SqlService.getDetail('stories', this.props.navigation.state.params.story_id).then(res=>{
            console.log(res[0].content);
            this.setState({
                story_title: res[0].title,
                story_content: res[0].content
            })
        });
    }

    render(){
        return(
            <ScrollView style={{flex:1, backgroundColor:this.props.bgColor, padding: 12}}>
                <View>
                    <Text style={{padding:6, fontSize: this.props.fontSize + 2, fontWeight: 'bold', color: this.props.color}}>{this.state.story_title}</Text>
                    <Text style={{padding: 6, paddingBottom: 16, fontSize: this.props.fontSize, color: this.props.color}}>{this.state.story_content}</Text>
                </View>
            </ScrollView>
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

export default connect(mapStateToProps)(Detail);