import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import CreateAssignment from '../views/CreateAssignment';
import DropdownMenuSelect from '../views/DropdownMenuSelect';
const Stack = createStackNavigator();

const CreateAssignmentStack = (props) => {

    const { colors } = useTheme();

    return (
        <Stack.Navigator initialRouteName={"CreateAssignment"} headerMode="none">
            <Stack.Screen
                name="CreateAssignment"
                component={CreateAssignment}
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

        </Stack.Navigator >
    );
}


export default CreateAssignmentStack;