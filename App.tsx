import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Tab1 from './Components/Tab1';
import Tab2 from './Components/Tab2';
import Camara from './Components/Camara';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Registro" component={Tab1} />
      <Tab.Screen name="Información" component={Tab2} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MainTabs" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Camara" component={Camara} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
