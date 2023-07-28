import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import Routes from './src/routes/LoginNavigator';
import {LibraryProvider} from './src/Context/LibraryContext'
import { UserProvider } from './src/Context/UserContext';


export default function App() {
  return (
    <UserProvider>
        <LibraryProvider>
          <NavigationContainer>
            <StatusBar backgroundColor="#000000" barStyle="dark-content"/>
            <Routes/>
          </NavigationContainer>
        </LibraryProvider>
    </UserProvider>
    
  );
}
