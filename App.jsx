import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import * as React from 'react';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { DarkMode, LightMode } from './src/Theme';
import TabNavigator from './src/navigation/TabNavigator';
import AssignmentDetail from './src/views/AssignmentDetail'
import TimeManagement from './src/views/TimeManagement';
import CreateWorkTime from './src/views/CreateWorkTime';
import EditWorkTime from './src/views/EditWorkTime';
import CreateAssignmentStack from './src/navigation/CreateAssignmentStack';
import EditAssignmentStack from './src/navigation/EditAssignmentStack';
import { LogBox } from 'react-native';
import SettingsStack from './src/navigation/SettingsStack';
import SyncStorage from 'sync-storage';
import { useState } from 'react';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { getRealmPath } from './src/apis/storage/Storage';
import { Text, TextInput } from "react-native"

const MainStack = createStackNavigator();

function App() {
    LogBox.ignoreLogs([
        "Warning: componentWillReceiveProps has been renamed",
        "VirtualizedLists",
        "Sending `onAnimatedValueUpdate` with no listeners registered.",
        "Non-serializable values were found in the navigation state.",
        "`-[RCTRootView cancelTouches]` is deprecated and will be deleted soon."
    ]);

    var cs = useColorScheme();

    const [theme, setTheme] = useState(useColorScheme())

    async function getTheme() {
        await SyncStorage.init()
        var t = SyncStorage.get("theme")


        if (t == undefined || t == 0) {
            return cs
        } else if (t == 1) {
            return "light"
        } else if (t == 2) {
            return "dark"
        }

        return cs
    }
    
    getTheme().then((t) => {
        setTheme(t)
    })

    // GOOGLE SIGN IN ON LAUNCH

    GoogleSignin.configure({
        iosClientId: "761072932730-4q3fe1bbsf5gd5msubqt3i8ofnd3jbhb.apps.googleusercontent.com",
        scopes: ["https://www.googleapis.com/auth/classroom.courses.readonly",
                 "https://www.googleapis.com/auth/classroom.student-submissions.me.readonly"]
    });

    (async function() {
        try {
            const userInfo = await GoogleSignin.signInSilently();
            console.log("Successful Google Login!")
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {}
            else {
                console.log(error)
            }
        }
    })();

    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;
    TextInput.defaultProps = TextInput.defaultProps || {};
    TextInput.defaultProps.allowFontScaling = false;

    return (
        <AppearanceProvider>
            <NavigationContainer theme={theme === "dark" ? DarkMode : LightMode}>
                <MainStack.Navigator
                    initialRouteName="Tabs"
                    screenOptions={({ route }) => {
                        return {
                            gestureEnabled: true,
                            headerShown: true,
                            cardOverlayEnabled: true,
                            ...TransitionPresets.ModalPresentationIOS
                        };
                    }}
                    mode="modal"
                    headerMode="none"
                >
                    <MainStack.Screen name="Tabs" component={TabNavigator} />
                    <MainStack.Screen name="TimeManagement" component={TimeManagement} />
                    <MainStack.Screen name="AssignmentDetail" component={AssignmentDetail} />
                    <MainStack.Screen name="CreateAssignmentStack" component={CreateAssignmentStack} />
                    <MainStack.Screen name="EditAssignment" component={EditAssignmentStack} />
                    <MainStack.Screen name="CreateWorkTime" component={CreateWorkTime} />
                    <MainStack.Screen name="EditWorkTime" component={EditWorkTime} />
                    <MainStack.Screen name="Settings" component={SettingsStack} />
                </MainStack.Navigator>
            </NavigationContainer>
        </AppearanceProvider>
    );
}


export default App;
