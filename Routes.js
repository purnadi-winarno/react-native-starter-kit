import React from 'react';
import Home from './src/components/Home';
import Camera from './src/components/Camera';
import Profile from './src/components/Profile';
import Login from './src/components/Login';
import SignUp from './src/components/SignUp';
import MyTabBar from './src/components/MyTabBar';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {connect} from 'react-redux';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
let IS_LOGIN = false;

const AppRoute = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeBackgroundColor: 'red',
      }}
      tabBarVisible={false}
      tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} tabBarVisible={false} />
      <Tab.Screen name="Camera" component={Camera} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const AuthRoute = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
        //initialParams={{onPress: login}}
      />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

const RootRouter = ({id}) => {
  console.log('userId: ', id);
  return (
    <NavigationContainer>
      {id ? <AppRoute /> : <AuthRoute />}
    </NavigationContainer>
  );
};

const mapStateToProps = state => ({
  id: state.user.id,
});

const Router = connect(mapStateToProps)(RootRouter);
export default Router;
