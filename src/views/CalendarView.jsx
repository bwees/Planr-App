import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text, SectionList } from "react-native";
import { TextInput, TouchableOpacity, ScrollView, FlatList } from "react-native-gesture-handler";
import { FONTS, SHADOW } from "../Theme";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from "react";
import { Keyboard } from 'react-native'
import ListSeperator from "../components/ListSeperator";
import AssignmentCell from "../components/AssignmentCell";
import { getAssignmentsByDate, groupAssignmentsBy } from "../storage/StorageAPI";
import { sortByDate, stringToDateObject } from "../Helpers";
import { Calendar, CalendarList } from "react-native-calendars";

const CalendarView = (props) => {

    const { colors } = useTheme();
    const insets = useSafeAreaInsets();

    const [groupedAssignments, setGroupedAssignments] = useState();
    const [selectedDate, setSelected] = useState(new Date().toISOString().slice(0, 10))

    const [markedDates, setMarkedDates] = useState(
        {
            [new Date().toISOString().slice(0, 10)]: { selected: true },
        }
    )

    function updateAssignmentList(filter) {
        setGroupedAssignments(groupAssignmentsBy(getAssignmentsByDate(filter), "class"));
    }

    React.useEffect(() => {
        const refreshList = props.navigation.addListener('focus', () => {
            updateAssignmentList(selectedDate);
            setMarkedDates({
                [new Date().toISOString().slice(0, 10)]: { selected: true },
            })
            setSelected(new Date().toISOString().slice(0, 10))
        });
    }, [props.navigation]);

    React.useEffect(() => {
        updateAssignmentList(selectedDate)
    }, [selectedDate])


    return (
        <View style={{ flex: 1 }}>
            <View style={[{ zIndex: 100 }]}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingTop: insets.top, backgroundColor: colors.headerColor }}>
                    <Text style={[FONTS.h1, FONTS.bold, { color: colors.primary, marginHorizontal: 20, marginVertical: 8 }]}>Calendar</Text>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={{ marginHorizontal: 20 }}
                        onPress={() => props.navigation.navigate("CreateAssignmentStack",
                            {
                                screen: "CreateAssignment",
                                params: {
                                    selection: stringToDateObject(selectedDate),
                                    fieldName: "Calendar"
                                }
                            }
                        )}
                    >
                        <Ionicons name="ios-add" size={30} color={colors.primary} />
                    </TouchableOpacity>
                </View>
                <View height={1} style={{ borderRadius: 4, backgroundColor: colors.headerBorder, }} />
            </View>
            <View style={{ height: 275 }}>
                <CalendarList
                    onDayPress={(day) => {
                        const dateString = day.dateString
                        setMarkedDates({ [dateString]: { selected: true } })
                        setSelected(dateString)
                    }}
                    markedDates={markedDates}
                    theme={{
                        calendarBackground: colors.background,
                        monthTextColor: colors.primary,
                        textMonthFontWeight: "bold",
                        selectedDotColor: colors.primary,
                        textDisabledColor: colors.gray,
                        dayTextColor: colors.text
                    }}
                />
            </View>
            <View height={1} style={{ borderRadius: 4, backgroundColor: colors.headerBorder }} />
            <View style={{ flex: 1 }}>
                <SectionList
                    style={{ paddingHorizontal: 20 }}
                    sections={groupedAssignments}
                    keyExtractor={(item, index) => item + index}
                    stickySectionHeadersEnabled={false}
                    renderItem={({ item }) => <AssignmentCell assignment={item} navigation={props.navigation} />}
                    renderSectionHeader={({ section: { title } }) => (
                        <ListSeperator icon={"calendar"} label={new Date(title).toLocaleString('default', { month: 'long', day: "numeric" })} color={colors.primary} bgColor={colors.listSeperator} />
                    )}
                />
            </View>
        </View>
    );
};

export default CalendarView;