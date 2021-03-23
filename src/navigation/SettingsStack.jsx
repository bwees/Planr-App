import * as React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { useTheme } from '@react-navigation/native';
import Settings from '../views/settings/Settings';
import About from '../views/settings/About';
import GoogleClassroom from "../views/settings/GoogleClassroom"
const Stack = createStackNavigator();

const SettingsStack = (props) => {

    const { colors } = useTheme();

    return (
        <Stack.Navigator
            initialRouteName={"Settings"}
            screenOptions={({ route }) => {
                return {
                    gestureEnabled: true,
                }
            }}
            headerMode="none"
        >
            <Stack.Screen
                name="Settings"
                component={Settings}
                options={{
                    headerStyle: { height: 55, backgroundColor: colors.headerColor },
                    headerTitle: null,
                }}
            />
            <Stack.Screen
                name="About"
                component={About}
            />
            <Stack.Screen
                name="GoogleClassroom"
                component={GoogleClassroom}
            />

        </Stack.Navigator >
    );
}


export default SettingsStack;