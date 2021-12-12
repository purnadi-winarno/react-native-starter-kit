import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {styles} from '../Stylesheet';
import FastImage from 'react-native-fast-image';

const Image = ({imageName}) => {
  const uri = `https://unsplash.it/400/400?image=${imageName}`;
  return (
    <FastImage
      style={{width: 180, height: 180}}
      source={{
        uri,
        headers: {Authorization: 'someAuthToken'},
        priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.contain}
    />
  );
};

const Camera = () => {
  const dummyImage = [...Array(100).keys()];
  return (
    <View style={styles.container}>
      <Text>Camera</Text>

      <FlatList
        data={dummyImage}
        numColumns={2}
        renderItem={({item, index}) => <Image imageName={item} />}
      />
    </View>
  );
};

export default Camera;
