import * as React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Home from '../views/Home';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';
import { SIZES } from '../theme/Theme';

const Stack = createStackNavigator();

const HomeStack = (props) => {

    const { colors } = useTheme();

    return (
        <Stack.Navigator
            initialRouteName={"Home"}
            screenOptions={({ route }) => {
                return {
                    gestureEnabled: true,
                    cardOverlayEnabled: true,
                    ...TransitionPresets.ModalPresentationIOS
                }
            }}
            headerMode="none">
            <Stack.Screen name="Home" component={Home} />

        </Stack.Navigator >
    );
}

export default HomeStack;