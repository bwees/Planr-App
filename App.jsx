// In App.js in a new project

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import * as React from 'react';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
//import { TabNavigator } from './src/navigation/TabNavigator';
import TabNavigator from './src/navigation/TabNavigator';
import { DarkMode, LightMode } from './src/theme/Theme';
import HomeworkSchedule from './src/views/HomeworkSchedule';
import { StatusBar } from 'react-native';
const MainStack = createStackNavigator();

function App() {
    StatusBar.setBarStyle('light-content', true);
    return (
        <AppearanceProvider>
            <NavigationContainer theme={useColorScheme() === "dark" ? DarkMode : LightMode}>
                <MainStack.Navigator
                    initialRouteName="Tabs"
                    screenOptions={({ route }) => {
                        return {
                            gestureEnabled: true,
                            cardOverlayEnabled: true,
                            ...TransitionPresets.ModalPresentationIOS
                        };
                    }}
                    mode="modal"
                    headerMode="none">
                    <MainStack.Screen name="Tabs" component={TabNavigator} />
                    <MainStack.Screen name="HomeworkSchedule" component={HomeworkSchedule} />

                </MainStack.Navigator>
            </NavigationContainer>
        </AppearanceProvider>
    );
}


export default App;
