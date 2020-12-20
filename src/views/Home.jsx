import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView } from "react-native";
import { useTheme } from '@react-navigation/native';
import { FONTS, SHADOW, SIZES } from "../theme/Theme";
import AssignmentMini from "../components/AssignmentMini";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import TimeChart from "../components/TimeChart";
import { StackedBarChart } from "react-native-chart-kit";
import { ScrollView } from "react-native-gesture-handler";
import MoreButton from "../components/MoreButton";
import LinearGradient from 'react-native-linear-gradient';

const { height } = Dimensions.get('window')

const ButtonHeader = (props) => {
    return (
        < View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 24, marginTop: 8 }} >
            <TouchableOpacity activeOpacity={0.5} >
                <Ionicons name="ios-person" size={22} color={"white"} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} style={{ marginRight: -8 }}>
                <Ionicons name="ios-add" size={30} color={"white"} />
            </TouchableOpacity>
        </View >
    )
}


const Home = (props) => {
    const { colors } = useTheme();


    const bgShadow = {
        shadowColor: colors.background,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 15,
    }

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

        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 0.3 }} colors={["#4287f5", "#40d6ff",]} useAngle={false} angle={0} style={{ flex: 1 }}>
            <SafeAreaView>

                <ButtonHeader />

                <View height={135} style={[SHADOW, {
                    marginHorizontal: 32,
                    marginTop: 24,
                    borderRadius: 16,
                    padding: 16,
                    backgroundColor: colors.tileColor,
                    zIndex: 1
                }]}>
                    <TimeChart progress={progress}
                        title={"Homework Time"}
                        time={"30-45 Minutes"}
                        subtitle={"Light workload expected."}
                        barColor={colors.primary}
                        textColor={colors.text}
                        subtitleColor={colors.gray}
                    />
                </View>

                <View height={"100%"} style={[SHADOW, {
                    backgroundColor: colors.background,
                    marginVertical: -48,
                    paddingTop: 58,
                    paddingHorizontal: 20,
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                }]}>
                    <Text style={[FONTS.h1, FONTS.bold, bgShadow, { color: colors.text, backgroundColor: colors.gray, zIndex: 5 }]}>Schedule</Text>

                    <ScrollView>

                        <Text style={[FONTS.h1, FONTS.bold, { color: colors.text, backgroundColor: colors.background }]}>Schedule</Text>
                        <Text style={[FONTS.h1, FONTS.bold, { color: colors.text, backgroundColor: colors.background }]}>Schedule</Text>
                        <Text style={[FONTS.h1, FONTS.bold, { color: colors.text, backgroundColor: colors.background }]}>Schedule</Text>
                        <Text style={[FONTS.h1, FONTS.bold, { color: colors.text, backgroundColor: colors.background }]}>Schedule</Text>
                        <Text style={[FONTS.h1, FONTS.bold, { color: colors.text, backgroundColor: colors.background }]}>Schedule</Text>
                        <Text style={[FONTS.h1, FONTS.bold, { color: colors.text, backgroundColor: colors.background }]}>Schedule</Text>



                    </ScrollView>


                </View>



            </SafeAreaView>
        </LinearGradient >
    );
};

export default Home;