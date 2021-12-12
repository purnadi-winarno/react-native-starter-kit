import React, { useEffect } from 'react';
import Cover from './src/screens/Cover';
import Home from './src/screens/Home';
import SurahScreen from './src/screens/SurahScreen';
import ReadSurah from './src/screens/ReadSurah';
import Memorize from './src/screens/Memorize';


import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// import {connect} from 'react-redux';

const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();
// let IS_LOGIN = false;

// const AppRoute = () => {
//   return (
//     <Tab.Navigator
//       tabBarOptions={{
//         activeBackgroundColor: 'red',
//       }}
//       tabBarVisible={false}
//       tabBar={props => <MyTabBar {...props} />}>
//       <Tab.Screen name="Home" component={Home} tabBarVisible={false} />
//       <Tab.Screen name="Camera" component={Camera} />
//       <Tab.Screen name="Profile" component={Profile} />
//     </Tab.Navigator>
//   );
// };

const options = {
  headerShown: false
}

const AppRoute = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cover"
        component={Cover}
        options={options}
      />
      <Stack.Screen name="Home" component={Home} options={options} />
      <Stack.Screen name="SurahScreen" component={SurahScreen} options={options} />
      <Stack.Screen name="ReadSurah" component={ReadSurah} options={options} />
      <Stack.Screen name="Memorize" component={Memorize} options={options} />
    </Stack.Navigator>
  );
};

const RootRouter = ({id}) => {
  // console.log('userId: ', id);
  useEffect(
    ()=> {},
    []
  )
  return (
    <NavigationContainer>
      <AppRoute /> 
    </NavigationContainer>
  );
};


// const mapStateToProps = state => ({
//   id: state.user.id,
// });

// const Router = connect(mapStateToProps)(RootRouter);
// export default Router;
export default RootRouter;
