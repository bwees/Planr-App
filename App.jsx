import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import * as React from 'react';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { DarkMode, LightMode } from './src/Theme';

import TabNavigator from './src/navigation/TabNavigator';
import AssignmentDetail from './src/views/AssignmentDetail'
import TimeManagement from './src/views/TimeManagement';
import CreateAssignmentStack from './src/navigation/CreateAssignmentStack';
import EditAssignmentStack from './src/navigation/EditAssignmentStack';
import { LogBox } from 'react-native';

const MainStack = createStackNavigator();

function App() {
    LogBox.ignoreLogs([
        "Warning: componentWillReceiveProps has been renamed",
        "VirtualizedLists",
        "Sending `onAnimatedValueUpdate` with no listeners registered.",
        "Non-serializable values were found in the navigation state."
    ]);
    return (
        <AppearanceProvider>
            <NavigationContainer theme={useColorScheme() === "dark" ? DarkMode : LightMode}>
                <MainStack.Navigator
                    initialRouteName="Tabs"
                    screenOptions={({ route }) => {
                        return {
                            gestureEnabled: true,
                            headerShown: true,
                            cardOverlayEnabled: true,
                            ...TransitionPresets.ModalPresentationIOS
                        };
                    }}
                    mode="modal"
                    headerMode="none"
                >
                    <MainStack.Screen name="Tabs" component={TabNavigator} />
                    <MainStack.Screen name="TimeManagement" component={TimeManagement} />
                    <MainStack.Screen name="AssignmentDetail" component={AssignmentDetail} />
                    <MainStack.Screen name="CreateAssignmentStack" component={CreateAssignmentStack} />
                    <MainStack.Screen name="EditAssignment" component={EditAssignmentStack} />
                </MainStack.Navigator>
            </NavigationContainer>
        </AppearanceProvider>
    );
}


export default App;
