import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text, SectionList, Dimensions } from "react-native";
import { TextInput, TouchableOpacity, ScrollView, FlatList } from "react-native-gesture-handler";
import { FONTS, SHADOW } from "../Theme";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from "react";
import { Keyboard } from 'react-native'
import ListSeperator from "../components/ListSeperator";
import AssignmentCell from "../components/AssignmentCell";
import { getAssignmentsByDate, groupAssignmentsBy } from "../apis/storage/Storage";
import { stringToDateObject } from "../Helpers";
import { CalendarList } from "react-native-calendars";
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import { useRef } from "react";
import LinearGradient from "react-native-linear-gradient";

const CalendarView = (props) => {

    const { colors } = useTheme();
    const insets = useSafeAreaInsets();

    const [groupedAssignments, setGroupedAssignments] = useState([]);
    const [selectedDate, setSelected] = useState(new Date().toISOString().slice(0, 10))
    const [numAssignments, setNumAssignments] = useState(0);

    const [markedDates, setMarkedDates] = useState(
        {
            [new Date().toISOString().slice(0, 10)]: { selected: true },
        }
    )

    function updateAssignmentList(filter) {
        setGroupedAssignments(groupAssignmentsBy(getAssignmentsByDate(filter), "class"));
    }

    React.useEffect(() => {
        updateAssignmentList(selectedDate)
    }, [selectedDate])

    React.useEffect(() => {
        if (groupedAssignments[0]) {
            setNumAssignments(groupedAssignments[0].data.length)
        } else {
            setNumAssignments(0)
        }

    }, [groupedAssignments])

    props.navigation.addListener('focus', () => {
        updateAssignmentList(selectedDate)
    })

    const sheetRef = useRef();

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
            <View style={{ marginHorizontal: 12 }}>
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
                        textDisabledColor: colors.gray,
                        selectedDayBackgroundColor: colors.primary,
                        dayTextColor: colors.text
                    }}
                />
            </View>
            <BottomSheet
                ref={sheetRef}
                snapPoints={[Dimensions.get("window").height - insets.top * 2 - 32, 85]}
                initialSnap={1}
                borderRadius={10}
                scrollEnabled={false}
                renderContent={() =>
                    <View style={[SHADOW, { height: Dimensions.get("window").height - insets.top * 2 - 32, overflow: "visible" }]}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: .1 }}
                            colors={["#4287f5", "#40d6ff",]}
                            useAngle={true}
                            angle={120}
                            style={{ flex: 1, paddingTop: 8 }}
                        >
                            <View style={{
                                alignSelf: "center",
                                width: 50,
                                height: 6,
                                borderRadius: 4,
                                backgroundColor: "white",
                            }} />

                            <View style={{ paddingHorizontal: 20, paddingVertical: 8 }}>
                                <Text style={[FONTS.h2, FONTS.bold, { color: "white" }]}>
                                    {
                                        stringToDateObject(selectedDate)
                                            .toLocaleDateString(undefined, { day: "numeric", month: "long" })
                                    }
                                </Text>
                                <Text style={[FONTS.h3, { color: "white" }]}>{numAssignments} Assignments</Text>
                            </View>
                            <View height={1} style={{ borderRadius: 4, marginTop: 4, backgroundColor: "white" }} />

                            <SectionList
                                style={{ paddingHorizontal: 20, paddingTop: 16, flex: 1 }}
                                sections={groupedAssignments}
                                keyExtractor={(item, index) => item + index}
                                stickySectionHeadersEnabled={false}
                                renderItem={({ item }) => <AssignmentCell assignment={item} navigation={props.navigation} />}
                            />
                        </LinearGradient>
                    </View>
                }
            />

        </View>
    );
};

export default CalendarView;