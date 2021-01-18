import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@react-navigation/native';
import DropdownMenuSelect from '../views/DropdownMenuSelect';
import EditAssignment from '../views/EditAssignment';
import CalendarPicker from '../views/CalendarPicker';
const Stack = createStackNavigator();

const EditAssignmentStack = (props) => {

    const { colors } = useTheme();

    return (
        <Stack.Navigator initialRouteName={"EditAssignment"} headerMode="none">
            <Stack.Screen
                name="EditAssignmentScreen"
                component={EditAssignment}
            />
            <Stack.Screen
                name="DropdownMenu"
                component={DropdownMenuSelect}
                options={{
                    headerStyle: { height: 55, backgroundColor: colors.headerColor },
                    headerTitle: null,
                    headerRight: null
                }}
            />
            <Stack.Screen
                name="CalendarPicker"
                component={CalendarPicker}
                options={{
                    headerStyle: { height: 55, backgroundColor: colors.headerColor },
                    headerTitle: null,
                    headerRight: null
                }}
            />

        </Stack.Navigator >
    );
}


export default EditAssignmentStack;