
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

export const TopViewStack = StackNavigator({
    TopView_screen: {
       screen: TopView
    },
    Detail_screen: {
        screen: Detail
    }
});

export const RandomStack = StackNavigator({
    Random_screen: {
       screen: Random
    },
    Detail_screen: {
        screen: Detail
    }
});

export const FunTabbar = TabNavigator({
    Home: {
        screen: HomeStack,
        navigationOptions:{
            tabBarLabel:'Mới nhất',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="list-ul" style={{color: "#2196F3", fontSize: 25}}/>
            )
        }
    },
    TopView: {
        screen: TopViewStack,
        navigationOptions:{
            tabBarLabel:'Xem nhiều',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="eye" style={{color: "#2196F3", fontSize: 25}}/>
            )
        }
    },
    Random:{
        screen: RandomStack,
        navigationOptions:{
            tabBarLabel:'Ngẫu nhiên',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="random" style={{color: "#2196F3", fontSize: 25}}/>
            )
        }
    }
},{
    tabBarPosition: 'bottom',
    tabBarOptions:{
        showIcon: true,
        labelStyle: {
            fontSize: 10,
            color: "#2196F3"
        },
        style: {
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderColor: '#ccc'
        },
        upperCaseLabel: false,
        indicatorStyle:{
            borderBottomColor: '#2196F3',
            borderBottomWidth: 3,
        }
    }
});
export const SoulStack = StackNavigator({
    Home_screen: {
        screen: Soul
    },

    Detail_screen: {
        screen: SoulDetail
    }
});

export const SoulTopViewStack = StackNavigator({
    TopView_screen: {
        screen: SoulTopView
    },
    Detail_screen: {
        screen: SoulDetail
    }
});

export const SoulRandomStack = StackNavigator({
    Random_screen: {
        screen: SoulRandom
    },
    Detail_screen: {
        screen: SoulDetail
    }
});

export const SoulMenu = TabNavigator({
    Home: {
        screen: SoulStack,
        navigationOptions:{
            tabBarLabel:'Mới nhất',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="list-ul" style={{color: "#2196F3", fontSize: 25}}/>
            )
        }
    },
    TopView: {
        screen: SoulTopViewStack,
        navigationOptions:{
            tabBarLabel:'Xem nhiều',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="eye" style={{color: "#2196F3", fontSize: 25}}/>
            )
        }
    },
    Random:{
        screen: SoulRandomStack,
        navigationOptions:{
            tabBarLabel:'Ngẫu nhiên',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="random" style={{color: "#2196F3", fontSize: 25}}/>
            )
        }
    }
},{
    tabBarPosition: 'bottom',
    tabBarOptions:{
        showIcon: true,
        labelStyle: {
            fontSize: 10,
            color: "#2196F3"
        },
        style: {
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderColor: '#ccc'
        },
        upperCaseLabel: false,
        indicatorStyle:{
            borderBottomColor: '#2196F3',
            borderBottomWidth: 3,
        }
    }
});
// export const SoulMenu = TabNavigator({
//     Soul:{
//         screen: Soul
//     },
//     Detail:{
//         screen: Soul_detail
//     }
// });

export const SettingMenu = StackNavigator({
    Setting:{
        screen: Setting
    }
});

export const InfoMenu = StackNavigator({
    Info:{
        screen: Info
    }
});

export const SideMenu = DrawerNavigator({
    FunTabbar: {
        screen: FunTabbar
    },
    SoulMenu: {
        screen: SoulMenu
    },
    SettingMenu:{
        screen: SettingMenu
    },
    InfoMenu:{
        screen: InfoMenu
    }

},
{
    drawerWidth: 300,
    drawerPosition: 'left',
    contentComponent: props => <Menu {...props} />

});