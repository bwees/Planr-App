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
            }}>
            <Stack.Screen
                name="Home"
                component={Home}

                options={{
                    title: null,


                    headerRight: () => (
                        <TouchableOpacity style={{ paddingRight: SIZES.padding }} activeOpacity={0.5} >
                            <Ionicons name="ios-add" size={30} color={colors.primary} />
                        </TouchableOpacity>
                    ),
                    headerLeft: () => (
                        <TouchableOpacity style={{ paddingLeft: SIZES.padding }} activeOpacity={0.5} >
                            <Ionicons name="ios-person" size={22} color={colors.primary} />
                        </TouchableOpacity>
                    ),
                }} />

        </Stack.Navigator >
    );
}

export default HomeStack;