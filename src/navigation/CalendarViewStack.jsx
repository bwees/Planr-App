import * as React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import CalendarView from '../views/CalendarView';
import { useTheme } from '@react-navigation/native';

const Stack = createStackNavigator();

const AssignmentListStack = (props) => {

    const { colors } = useTheme();

    return (
        <Stack.Navigator
            initialRouteName={"CalendarView"}
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
                name="CalendarView"
                component={CalendarView}
                options={{
                    headerTitle: null,
                }} />

        </Stack.Navigator >
    );
}


export default AssignmentListStack;