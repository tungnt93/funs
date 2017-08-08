
import React from 'react';


import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import Home from './screen/funs/Home';
import TopView from './screen/funs/TopView';
import Random from './screen/funs/Random';
import Detail from './screen/funs/Detail';
import Menu from './screen/Menu';

import Soul from './screen/soul/Soul';
import SoulDetail from './screen/soul/SoulDetail';
import SoulTopView from './screen/soul/SoulTopView';
import SoulRandom from './screen/soul/SoulRandom';

import Setting from './screen/setting/Setting';
import Info from './screen/info/Info';

import Icon from 'react-native-vector-icons/FontAwesome';

export const HomeStack = StackNavigator({
    Home_screen: {
        screen: Home
    },

    Detail_screen: {
        screen: Detail
    }
});

export const SoulStack = StackNavigator({
    Soul_screen: {
       screen: Soul
    },
    Detail_screen: {
        screen: SoulDetail
    }
});

export const SettingStack = StackNavigator({
    Setting_screen: {
       screen: Setting
    }
});

export const InfoStack = StackNavigator({
    Info_screen: {
        screen: Info
    }
});

export const FunTabbar = TabNavigator({
    Home: {
        screen: HomeStack,
        navigationOptions:{
            tabBarLabel:'Truyện cười',
            tabBarIcon: ({ tintColor, focused }) => (
                <Icon name="smile-o" style={{color: focused ? "#0080FD" : '#686868', fontSize: 25}}/>
            )
        }
    },
    Soul: {
        screen: SoulStack,
        navigationOptions:{
            tabBarLabel:'Tâm hồn',
            tabBarIcon: ({ tintColor, focused }) => (
                <Icon name="leaf" style={{color: focused ? "#0080FD" : '#686868', fontSize: 25}}/>
            )
        }
    },
    Setting:{
        screen: SettingStack,
        navigationOptions:{
            tabBarLabel:'Cài đặt',
            tabBarIcon: ({ tintColor, focused }) => (
                <Icon name="cog" style={{color: focused ? "#0080FD" : '#686868', fontSize: 25}}/>
            )
        }
    },
    Info:{
        screen: InfoStack,
        navigationOptions:{
            tabBarLabel:'Thông tin',
            tabBarIcon: ({ tintColor, focused }) => (
                <Icon name="info-circle" style={{color: focused ? "#0080FD" : '#686868', fontSize: 25}}/>
            )
        }
    }
},{
    tabBarPosition: 'bottom',
    tabBarOptions:{
        showIcon: true,
        labelStyle:{
            fontSize: 10
        },
        activeTintColor: '#0080FD',
        inactiveTintColor: '#686868',
        style: {
            backgroundColor: '#f9f9f9',
            borderTopWidth: 1,
            borderColor: '#ccc',
            height: 62
        },
        upperCaseLabel: false,
        indicatorStyle:{
            borderBottomColor: '#f9f9f9',
            borderBottomWidth: 1,
        }
    }
});
