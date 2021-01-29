import { useTheme } from "@react-navigation/native";
import React from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { Calendar, CalendarList } from "react-native-calendars";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { calDaytoDate } from "../Helpers";
import { FONTS, SHADOW } from "../Theme";

const CalendarPicker = ({ navigation, route }) => {

    const { colors } = useTheme();
    const { selected } = route.params;

    const [selectedDate, setSelected] = useState(selected)

    const [markedDates, setMarkedDates] = useState(
        {
            [selected.toISOString().slice(0, 10)]: { selected: true },
        }
    )

    const routes = navigation.dangerouslyGetState().routeNames
    const prevScreen = routes[0]

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: 55, backgroundColor: colors.headerColor }}>
                <TouchableOpacity activeOpacity={0.5} style={{ marginHorizontal: 8, flexDirection: "row", alignItems: "center" }} onPress={() => { navigation.navigate(prevScreen, { selection: selectedDate, fieldName: "Calendar" }); }}>
                    <Ionicons name={"ios-chevron-back"} size={30} color={colors.primary} />
                    <Text style={{ color: colors.primary, fontSize: 18 }}>Back</Text>
                </TouchableOpacity>
            </View>
            <View height={1} style={{ borderRadius: 4, backgroundColor: colors.headerBorder }} />
            <CalendarList
                onDayPress={(day) => {
                    const dateString = day.dateString
                    setMarkedDates({ [dateString]: { selected: true } })
                    setSelected(calDaytoDate(day))
                    navigation.navigate(prevScreen, { selection: calDaytoDate(day), fieldName: "Calendar" });
                }}
                markedDates={markedDates}
                theme={{
                    calendarBackground: colors.background,
                    monthTextColor: colors.primary,
                    textMonthFontWeight: "bold",
                    dayTextColor: colors.text,
                    selectedDotColor: colors.primary,
                }}
            />
        </View>
    );
};

export default CalendarPicker;