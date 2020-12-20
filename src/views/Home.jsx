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

    const renderContent = () => (
        <View
            style={{
                backgroundColor: 'white',
                padding: 16,
                height: 450,
            }}
        >
            <Text>Swipe down to close</Text>
        </View>
    );


    const bgShadow = {
        shadowColor: colors.background,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 1,
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


                <TimeChart progress={0.32}
                    title={"Homework Time"}
                    time={"30-45 Minutes"}
                    subtitle={"Light workload expected."}
                    barColor={"white"}
                    textColor={"white"}
                    subtitleColor={"white"}
                    style={{ paddingVertical: 24, paddingHorizontal: 20 }}
                />

                <View height={"100%"} style={[SHADOW, {
                    backgroundColor: colors.background,
                    paddingTop: 8,
                    paddingHorizontal: 20,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                }]}>
                    <Text style={[FONTS.h1, FONTS.bold, bgShadow, { paddingTop: 12, color: colors.text }]}>Schedule</Text>

                    <View
                        style={{
                            borderBottomColor: colors.gray,
                            borderBottomWidth: 1,
                            borderRadius: 16,
                            paddingHorizontal: -20
                        }}
                    />


                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ paddingVertical: 8 }}>


                        <View style={[SHADOW, {
                            backgroundColor: colors.gray
                        }]}>

                            <Text> Hello </Text>

                        </View>



                    </ScrollView>


                </View>



            </SafeAreaView>
        </LinearGradient >
    );
};

export default Home;