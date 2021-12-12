import React from 'react';
import {View, Text, Button} from 'react-native';
import {styles} from '../Stylesheet';
import {login} from '../actions/user';
import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';

const Login = ({navigation, login}) => {
  return (
    <View style={styles.container}>
      <Icon name="rocket" size={30} color="#900" />
      <Button onPress={login} title="Login" />
    </View>
  );
};

const mapDispatchToProps = {
  login,
};

const LoginContainer = connect(null, mapDispatchToProps)(Login);

export default LoginContainer;
