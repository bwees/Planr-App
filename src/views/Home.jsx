import React from "react";
import { View, Text, FlatList, ScrollView, TouchableOpacity, Dimensions, SafeAreaView, StatusBar, Button } from "react-native";
import { useTheme } from '@react-navigation/native';
import { FONTS, SHADOW, SIZES } from "../theme/Theme";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import TimeChart from "../components/TimeChart";
import LinearGradient from 'react-native-linear-gradient';
import ListSeperator from "../components/ListSeperator";
import AssignmentCell from "../components/AssignmentCell";

const Home = (props) => {
    const { colors } = useTheme();

    var [progress, setProgress] = useState(0);

    var assignment = {
        name: "Example Assignment sdfasdasd",
        class: "English",
        dueDate: "11-11-20",
        type: "Homework",
        id: "1"
    }
    var assignment2 = {
        name: "Example Assignment",
        class: "English",
        dueDate: "11-11-20",
        type: "Homework",
        id: "2"
    }

    var assignments = [assignment, assignment2]

    return (
        <View style={{ flex: 1, marginBottom: 0 }}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: .1 }} colors={["#4287f5", "#40d6ff",]} useAngle={true} angle={120} style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1, }}>
                    <View style={{ flex: 1, flexDirection: "column", marginTop: 48 }}>
                        <View style={{ height: 100, paddingHorizontal: 20, justifyContent: "center" }}>

                            <TimeChart progress={0.32}
                                title={"Homework Time"}
                                time={"30-45 Minutes"}
                                subtitle={"Light workload expected."}
                                barColor={"white"}
                                textColor={"white"}
                                subtitleColor={"white"}
                            />
                        </View>

                        <TouchableOpacity
                            style={[SHADOW, {
                                height: 40,
                                marginHorizontal: 20,
                                backgroundColor: colors.tabBarColor,
                                borderRadius: 8,
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                marginVertical: 16
                            }]}
                            onPress={() => {
                                props.navigation.navigate("TimeManagement")
                            }}
                        >
                            <Ionicons name={"time"} size={22} color={colors.primary} />
                            <Text style={[FONTS.bold, FONTS.h3, { paddingLeft: 8, color: colors.primary }]}>Time Management</Text>
                        </TouchableOpacity>

                        {/* Info Card */}
                        <View
                            style={[SHADOW, {
                                backgroundColor: colors.background,
                                paddingTop: 16,
                                borderTopLeftRadius: 24,
                                borderTopRightRadius: 24,
                                flexGrow: 1
                            }]}>

                            <View>
                                <View style={{ paddingHorizontal: 20, }}>
                                    <Text style={[FONTS.h2, FONTS.bold, { color: colors.text }]}>Homework Schedule</Text>
                                    <Text style={[FONTS.h4, { color: colors.gray }]}>8 Assignments, 2 Activities</Text>
                                </View>
                                <View style={{ height: 1, borderRadius: 4, backgroundColor: colors.lightGray, marginTop: 10, }} />

                            </View>
                            <View style={{ flex: 1 }}>

                                <ScrollView showsVerticalScrollIndicator={true} style={{ flex: 1 }} contentContainerStyle={{ justifyContent: 'space-between', marginHorizontal: 20, overflow: false }}>
                                    <ListSeperator icon={"time"} label={"3:00 PM"} color={colors.gray} />
                                    <AssignmentCell />
                                    <AssignmentCell />
                                    <AssignmentCell />
                                    <AssignmentCell />
                                    <ListSeperator icon={"time"} label={"3:00 PM"} color={colors.gray} />

                                    <AssignmentCell />
                                    <AssignmentCell />
                                    <AssignmentCell />
                                    <AssignmentCell />
                                    <AssignmentCell />
                                    <AssignmentCell />
                                    <ListSeperator icon={"time"} label={"3:00 PM"} color={colors.gray} />

                                    <AssignmentCell />
                                    <AssignmentCell />
                                    <AssignmentCell />
                                    <AssignmentCell />

                                </ScrollView>

                            </View>

                        </View>
                    </View>

                </SafeAreaView>
            </LinearGradient >
        </View >
    );
};

export default Home;