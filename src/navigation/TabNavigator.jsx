import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "react-native-appearance";
import HomeStack from "./HomeStack";
import { DarkMode, LightMode } from "../Theme";
import CalendarView from "./CalendarViewStack";
import WorkTimeList from "../views/WorkTimeList";
import AssignmentList from "../views/AssignmentList";

const Tab = createBottomTabNavigator();

function TabNavigator() {

    const scheme = useColorScheme();

    const { colors } = useColorScheme() === "dark" ? DarkMode : LightMode;

    const tabOptions = {
        showLabel: false,
        style: {
            backgroundColor: colors.tabBarColor,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.3,
            shadowRadius: 5,
        },
        inactiveTintColor: "gray",
        activeTintColor: colors.primary
    };

    return (

        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    switch (route.name) {
                        case "Home":
                            iconName = focused ? "ios-home" : "ios-home-outline";
                            break;
                        case "AssignmentList":
                            iconName = focused ? "ios-list" : "ios-list-outline";
                            break;
                        case "Calendar":
                            iconName = focused ? "ios-calendar" : "ios-calendar-outline";
                            break;
                        case "WorkTimes":
                            iconName = focused ? "ios-time" : "ios-time-outline";
                            break;
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{ ...tabOptions }}
        >

            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="AssignmentList" component={AssignmentList} />
            <Tab.Screen name="Calendar" component={CalendarView} />
            <Tab.Screen name="WorkTimes" component={WorkTimeList} />


        </Tab.Navigator>
    );
}


export default TabNavigator;