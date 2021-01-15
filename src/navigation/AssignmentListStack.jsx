import * as React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import AssignmentList from '../views/AssignmentList';
import { useTheme } from '@react-navigation/native';

const Stack = createStackNavigator();

const AssignmentListStack = (props) => {

    const { colors } = useTheme();

    return (
        <Stack.Navigator
            initialRouteName={"AssignmentList"}
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
                name="AssignmentList"
                component={AssignmentList}
                options={{
                    headerTitle: null,
                }} />

        </Stack.Navigator >
    );
}


export default AssignmentListStack;