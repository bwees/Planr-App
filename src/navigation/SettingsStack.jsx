import * as React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Home from '../views/Home';
import { TouchableOpacity, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';
import Settings from '../views/settings/Settings';
import { FONTS } from '../Theme';
import About from '../views/settings/About';

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

        </Stack.Navigator >
    );
}


export default SettingsStack;