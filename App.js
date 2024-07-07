import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { PinchGestureHandler, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedGestureHandler, useAnimatedStyle } from 'react-native-reanimated';

var est_time = '12:00 PM';
var next_stop = 'LHC';
var currentBus = "Bus-2"

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [currentBus, setCurrentBus] = useState(currentBus);

  const swapBus = () => {
    const newBus = currentBus === 'Bus-1' ? 'Bus-2' : 'Bus-1';
    navigation.navigate(newBus);
    setCurrentBus(newBus);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image
          source={require('./iitd.jpg')}
          style={{ flex: 1, width: '80%', height: '20%' }}
          resizeMode="cover"
        />
      </View>
      <View>
        <Text style={styles.text}>Estimated Time of Arrival: {est_time} </Text>
        <Text style={styles.text}>Next Stop: {next_stop} </Text>
      </View>
      <View style={{ alignItems: 'center' }} id="swap-button">
        <TouchableOpacity
          style={styles.circleButton}
          onPress={swapBus}>
          <Icon name={'swap-horiz'} size={50} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate('Bus Tracker')}>
          <Text style={styles.footerButtonText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate('Bus Routes')}>
          <Text style={styles.footerButtonText}>Routes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const RouteScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Route of Bus-1')}>
        <Text style={styles.buttonText}>Bus-1</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Route of Bus-2')}>
        <Text style={styles.buttonText}>Bus-2</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate(arr[0])}>
          <Text style={styles.footerButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate('Bus Routes')}>
          <Text style={styles.footerButtonText}>Routes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Bus1Screen = () => {
  const imageScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const onPinchGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startScale = imageScale.value;
    },
    onActive: (event, context) => {
      imageScale.value = context.startScale * event.scale;
    },
    onEnd: () => {
      if (imageScale.value < 1) {
        imageScale.value = 1;
      }
    },
  });

  const onPanGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startX = translateX.value;
      context.startY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
      translateY.value = context.startY + event.translationY;
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: imageScale.value },
      ],
    };
  });

  return (
    <View style={{ flex: 1 }}>
      <PinchGestureHandler onGestureEvent={onPinchGestureEvent}>
        <Animated.View style={[styles.container, animatedStyle]}>
          <PanGestureHandler onGestureEvent={onPanGestureEvent}>
            <Animated.View style={styles.imageContainer}>
              <Animated.Image
                source={require('./iitd.jpg')}
                resizeMode="contain"
                style={styles.image}
              />
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </PinchGestureHandler>
    </View>
  );
};

const Bus2Screen = () => {
  const imageScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const onPinchGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startScale = imageScale.value;
    },
    onActive: (event, context) => {
      imageScale.value = context.startScale * event.scale;
    },
    onEnd: () => {
      if (imageScale.value < 1) {
        imageScale.value = 1;
      }
    },
  });

  const onPanGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startX = translateX.value;
      context.startY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
      translateY.value = context.startY + event.translationY;
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: imageScale.value },
      ],
    };
  });

  return (
    <View style={{ flex: 1 }}>
      <PinchGestureHandler onGestureEvent={onPinchGestureEvent}>
        <Animated.View style={[styles.container, animatedStyle]}>
          <PanGestureHandler onGestureEvent={onPanGestureEvent}>
            <Animated.View style={styles.imageContainer}>
              <Animated.Image
                source={require('./iitd.jpg')}
                resizeMode="contain"
                style={styles.image}
              />
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </PinchGestureHandler>
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#665190',
          },
        }}>
        <Stack.Screen
          name="Bus-1"
          component={HomeScreen}
          options={{
            headerTitleStyle: styles.heading,
            headerTitleAlign: 'center',
            cardStyle: { paddingBottom: height * 0.02 },
          }}
        />
        <Stack.Screen
          name="Bus-2"
          component={HomeScreen}
          options={{
            headerTitleStyle: styles.heading,
            headerTitleAlign: 'center',
            cardStyle: { paddingBottom: height * 0.02 },
          }}
        />
        <Stack.Screen
          name="Bus Routes"
          component={RouteScreen}
          options={{
            headerTitleStyle: styles.heading,
            headerTitleAlign: 'center',
            cardStyle: { paddingBottom: height * 0.02 },
          }}
        />
        <Stack.Screen
          name="Route of Bus-1"
          component={Bus1Screen}
          options={{
            title: 'Route of Bus-1',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: Math.min(width, height) * 0.075,
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Route of Bus-2"
          component={Bus2Screen}
          options={{
            title: 'Route of Bus-2',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: Math.min(width, height) * 0.075,
              fontWeight: 'bold',
            },
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: 'white',
    fontSize: Math.min(width, height) * 0.1,
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: height * 0.035,
    paddingHorizontal: width * 0.3,
    paddingBottom: height * 0.021,
    backgroundColor: '#9f5095',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: width * 0.05,
  },
  buttonText: {
    color: 'white',
    fontSize: Math.min(width, height) * 0.075,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.05,
    marginTop: 'auto',
    paddingBottom: height * 0.02,
  },
  footerButton: {
    flex: 1,
    backgroundColor: '#ff6b6b',
    marginTop: height * 0.035,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.05,
    borderRadius: 10,
    marginHorizontal: width * 0.01,
    alignItems: 'center',
  },
  footerButtonText: {
    color: 'white',
    fontSize: Math.min(width, height) * 0.075,
  },
  circleButton: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.015,
    width: 80,
    height: 80,
    backgroundColor: '#9f5095',
    borderRadius: 40,

  },
  text: {
    color: "#301934",
    fontSize: Math.min(width, height) * 0.0545,
    paddingHorizontal: width * 0.05,
    marginTop: height * 0.015,
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default App;
