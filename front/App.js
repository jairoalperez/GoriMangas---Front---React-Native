import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import Dashboard from './screens/Dashboard';
import Manga from './screens/Manga';
import Profile from './screens/Profile';
import ImageUpload from './screens/ImageUpload';
import Chapters from './screens/Chapters';
import Reader from './screens/Reader';
import ChaptersB from './screens/ChaptersB';
import MangasB from './screens/MangasB';
import PagesB from './screens/PagesB';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="ImageUpload" component={ImageUpload} />
        <Stack.Screen name="Manga" component={Manga} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Chapters" component={Chapters} />
        <Stack.Screen name="Reader" component={Reader} />
        <Stack.Screen name="ChaptersB" component={ChaptersB} />
        <Stack.Screen name="MangasB" component={MangasB} />
        <Stack.Screen name="PagesB" component={PagesB} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

