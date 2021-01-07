import * as React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Home from '../views/Home';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';

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
                    headerShown: true,
                    headerTransparent: true,
                    ...TransitionPresets.ModalPresentationIOS
                }
            }}

        >
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerTitle: null,
                    headerLeft: () => (
                        <TouchableOpacity activeOpacity={0.5} style={{ marginHorizontal: 20 }} >
                            <Ionicons name="ios-person" size={22} color={"white"} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity activeOpacity={0.5} style={{ marginHorizontal: 20 }} onPress={() => { props.navigation.navigate("CreateAssignment") }}>
                            <Ionicons name="ios-add" size={30} color={"white"} />
                        </TouchableOpacity>
                    ),
                }} />

        </Stack.Navigator >
    );
}


export default HomeStack;