import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../pages/Welcome'
import SignInLibrary from '../pages/Library/SignInLibrary'
import SignUpLibrary from '../pages/Library/SignUpLibrary'
import SignInUser from '../pages/User/SignInUser'
import SignUpUser from '../pages/User/SignUpUser'
import MyReservations from "../pages/User/MyReservations";
import Libraries from "../pages/User/Libraries";
import History from "../pages/User/History";
import Search from "../pages/User/Search";
import Reservations from "../pages/Library/Reservations";
import Books from "../pages/Library/Books";
import AddBook from "../pages/Library/AddBook";
import ReviewUser from "../pages/User/ReviewUser"
import BookFromLibrary from "../pages/User/BooksFromLibrary";
import BookInfo from "../pages/User/BookInfo";
import BookInfoLib from "../pages/Library/BookInfoLib";
import FindLibrary from "../pages/User/FindLibrary";
import ReservationInfo from "../pages/Library/ReservationInfo";
import infoLibrary from "../pages/Library/LibraryInfo";
import Icon  from 'react-native-vector-icons/Ionicons';
import IconHist  from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dimensions } from "react-native";
import {Text} from "react-native";


const fullScreenWidth = Dimensions.get('window').width;


const Tab = createBottomTabNavigator();

function BottomTabUserNavigator() {
    return (
          <Tab.Navigator 
            screenOptions={{ 
                headerShown: false,
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                tabBarStyle: {
                    backgroundColor: '#000000',
                    height: 100
                },
            }}
            barStyle={{ backgroundColor: '#0000000' }}
          >
            <Tab.Screen 
                name="MyReservations" 
                component={MyReservations} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({ size, color, focused }) => (
                      <Icon
                        name="ios-home"
                        size={size}
                        color={focused ? "#FFFF" : 'grey'}
                      />
                    ),
                    tabBarLabel: ({ focused, color }) => (
                      <Text style={{ color: focused ? "#FFFF" : 'grey'}}>
                        Reservations
                      </Text>
                    ),
                  }}
            />
            <Tab.Screen 
                name="Libraries" 
                component={Libraries} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({ size, color, focused }) => (
                      <Icon
                        name="book"
                        size={size}
                        color={focused ? "#FFFF" : 'grey'}
                      />
                    ),
                    tabBarLabel: ({ focused, color }) => (
                      <Text style={{ color: focused ? "#FFFF" : 'grey' }}>
                        Libraries
                      </Text>
                    ),
                  }}
            />
            <Tab.Screen 
                name="History" 
                component={History} 
                options={{
                  headerShown: false,
                    tabBarIcon: ({ size, color, focused }) => (
                      <IconHist
                        name="history"
                        size={size}
                        color={focused ? "#FFFF" : 'grey'}
                      />
                    ),
                    tabBarLabel: ({ focused, color }) => (
                      <Text style={{ color: focused ? "#FFFF" : 'grey' }}>
                        History
                      </Text>
                    ),
                  }}
            />
            <Tab.Screen 
                name="Search" 
                component={Search}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ size, color, focused }) => (
                      <Icon
                        name="search"
                        size={size}
                        color={focused ? "#FFFF" : 'grey'}
                      />
                    ),
                    tabBarLabel: ({ focused, color }) => (
                      <Text style={{ color: focused ? "#FFFF" : 'grey' }}>
                        Search
                      </Text>
                    ),
                  }}
            />
          </Tab.Navigator>
    );
  }

  function BottomTabLibraryNavigator() {
    return (
          <Tab.Navigator 
            screenOptions={{ 
                headerShown: false,
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                tabBarStyle: {
                    backgroundColor: '#000000',
                    height: 100
                },
            }}
            barStyle={{ backgroundColor: '#0000000' }}
          >
            <Tab.Screen 
                name="Reservations" 
                component={Reservations} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({ size, color, focused }) => (
                      <Icon
                        name="ios-home"
                        size={size}
                        color={focused ? "#FFFF" : 'grey'}
                      />
                    ),
                    tabBarLabel: ({ focused, color }) => (
                      <Text style={{ color: focused ? "#FFFF" : 'grey'}}>
                        Reservations
                      </Text>
                    ),
                  }}
            />
            <Tab.Screen 
                name="Books" 
                component={Books} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({ size, color, focused }) => (
                      <Icon
                        name="book"
                        size={size}
                        color={focused ? "#FFFF" : 'grey'}
                      />
                    ),
                    tabBarLabel: ({ focused, color }) => (
                      <Text style={{ color: focused ? "#FFFF" : 'grey' }}>
                        Books
                      </Text>
                    ),
                  }}
            />
              <Tab.Screen 
                name="LibraryInfo" 
                component={infoLibrary} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({ size, color, focused }) => (
                      <Icon
                        name="book"
                        size={size}
                        color={focused ? "#FFFF" : 'grey'}
                      />
                    ),
                    tabBarLabel: ({ focused, color }) => (
                      <Text style={{ color: focused ? "#FFFF" : 'grey' }}>
                        Library Info
                      </Text>
                    ),
                  }}
            />
          </Tab.Navigator>
    );
  }
  

const Stack = createStackNavigator();

export default function NavigationLogin(){
    return(
            <Stack.Navigator initialRouteName={Welcome}>
            <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="SignInLibrary"
                component={SignInLibrary}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="SignUpLibrary"
                component={SignUpLibrary}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="SignInUser"
                component={SignInUser}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="SignUpUser"
                component={SignUpUser}
                options={{headerShown: false}}
            />
             <Stack.Screen
                name="UserHome"
                component={BottomTabUserNavigator}
                options={{headerShown: false}}
            />
             <Stack.Screen
                name="LibraryHome"
                component={BottomTabLibraryNavigator}
                options={{headerShown: false}}
            />
              <Stack.Screen
                name="AddBook"
                component={AddBook}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="BookLibrary"
                component={BookFromLibrary}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="BookInfo"
                component={BookInfo}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="BookInfoLib"
                component={BookInfoLib}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="ReviewUser"
                component={ReviewUser}
                options={{headerShown: false}}
            />
             <Stack.Screen
                name="FindLibrary"
                component={FindLibrary}
                options={{headerShown: false}}
            />
             <Stack.Screen
                name="ReservationInfo"
                component={ReservationInfo}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}
