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
        <Stack.Navigator initialRouteName={"CreateAssignment"}>
            <Stack.Screen
                name="CreateAssignment"
                component={CreateAssignment}
                options={{
                    headerStyle: { height: 55, backgroundColor: colors.headerColor },
                    headerTitle: null,
                    headerLeft: () => (
                        <TouchableOpacity activeOpacity={0.5} style={{ marginHorizontal: 20, marginTop: -45 }} onPress={() => { props.navigation.goBack() }}>
                            <Text style={{ color: colors.primary, fontSize: 18 }}>Cancel</Text>
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity activeOpacity={0.5} style={{ marginHorizontal: 20, marginTop: -45 }} onPress={() => { props.navigation.goBack() }}>
                            <Text style={{ color: colors.primary, fontSize: 18, fontWeight: "bold" }}>Done</Text>
                        </TouchableOpacity>
                    ),
                }} />
            <Stack.Screen
                name="DropdownMenu"
                component={DropdownMenuSelect}
                options={{
                    headerStyle: { height: 55, backgroundColor: colors.headerColor },
                    headerTitle: null,
                    headerRight: null
                }} />

        </Stack.Navigator >
    );
}


export default CreateAssignmentStack;