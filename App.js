import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddFriendScreen from './screens/AddFriendScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{headerTitleAlign:"center", headerStyle:{backgroundColor:"#FFDEAD", height:70}}} component={HomeScreen} />
        <Stack.Screen name="AddFriendScreen" options={{headerTitleAlign:"center", headerStyle:{backgroundColor:"#FFDEAD", height:70}}} component={AddFriendScreen} />
     
      </Stack.Navigator>

    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({});
