import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {tabStyles, styles} from '../Stylesheet';

function CircleTab({navigation, route, isFocused}) {
  const onPress = () => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };
  return (
    <TouchableOpacity onPress={onPress} style={tabStyles.circleTab}>
      <Text style={{color: '#fff', textAlign: 'center'}}>Camera</Text>
    </TouchableOpacity>
  );
}

function MyTabBar({state, descriptors, navigation}) {
  return (
    <View style={tabStyles.tabContainer}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'blue',
        }}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const isCamera = label === 'Camera';

          return (
            <>
              {isCamera && (
                <CircleTab
                  navigation={navigation}
                  route={route}
                  isFocused={isFocused}
                />
              )}
              {!isCamera && (
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityStates={isFocused ? ['selected'] : []}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  style={tabStyles.tab}>
                  <Text
                    style={[
                      {
                        color: isFocused
                          ? isCamera
                            ? 'white'
                            : 'black'
                          : 'grey',
                      },
                      isCamera && tabStyles.textCircle,
                    ]}>
                    {label}
                  </Text>
                </TouchableOpacity>
              )}
            </>
          );
        })}
      </View>
    </View>
  );
}

export default MyTabBar;
