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

const Header = (props) => {
    return (
        < View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 8 }} >
            <TouchableOpacity activeOpacity={0.5} >
                <Ionicons name="ios-person" size={22} color={"white"} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} >
                <Ionicons name="ios-add" size={30} color={"white"} />
            </TouchableOpacity>
        </View >
    )
}


const Home = (props) => {
    const { colors } = useTheme();

    var [progress, setProgress] = useState(0);
    var [screenHeight, setScreenHeight] = useState(0);
    var [scrollPos, setScrollPos] = useState(0);

    const styles = StyleSheet.create({

        largeButton: {
            backgroundColor: colors.primary,
            height: 40,
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
        }
    });

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

    onContentSizeChange = (contentWidth, contentHeight) => {
        setScreenHeight(contentHeight);
    }

    var assignments = [assignment, assignment2]

    const scrollEnabled = screenHeight > height

    return (
        <View>

            <LinearGradient colors={["#4AD8FF", "#31A2F9"]} style={{
                height: 175,
                paddingLeft: 15,
                paddingRight: 15
            }} />


            <SafeAreaView style={{ marginTop: -150, marginHorizontal: 16 }}>


                <Header />

                <View style={[SHADOW, {
                    height: 135,
                    marginHorizontal: 4,
                    marginTop: 24,
                    borderRadius: 16,
                    padding: 16,
                    backgroundColor: colors.tileColor
                }]}>
                    <TimeChart progress={progress}
                        title={"Homework Time"}
                        time={"30-45 Minutes"}
                        subtitle={"Schedule is 75% full"}
                        barColor={colors.primary}
                        textColor={colors.text}
                        subtitleColor={colors.gray}
                    />
                </View>


                <View>
                    <Text style={[FONTS.h2, FONTS.bold, { color: colors.text, paddingTop: 16, paddingBottom: 8 }]}>Due Today</Text>

                    <FlatList
                        data={assignments}
                        renderItem={({ item }) => (
                            <AssignmentMini
                                navigation={props.navigation}
                                assignment={item}
                                color={colors.tileColor}
                                titleColor={colors.primary}
                                bodyTextColor={colors.text} />
                        )}
                        keyExtractor={item => item.id}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        ListFooterComponent={MoreButton}
                        style={{ width: "100%", overflow: "visible" }}
                    />
                </View>
            </SafeAreaView>
        </View >
    );
};

export default Home;