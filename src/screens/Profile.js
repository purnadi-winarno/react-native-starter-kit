import React from 'react';
import {View, Text, Button} from 'react-native';
import {styles} from '../Stylesheet';
import {logout} from '../actions/user';
import {connect} from 'react-redux';

const Profile = ({logout}) => {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Button onPress={logout} title="Logout" />
    </View>
  );
};

const mapDispatchToProps = {
  logout,
};

const ProfileContainer = connect(null, mapDispatchToProps)(Profile);
export default ProfileContainer;
