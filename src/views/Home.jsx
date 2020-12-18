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
import { Header } from "react-native/Libraries/NewAppScreen";

const { height } = Dimensions.get('window')

const Home = (props) => {
    const { colors } = useTheme();

    var [progress, setProgress] = useState(0);
    var [screenHeight, setScreenHeight] = useState(0);
    var [scrollPos, setScrollPos] = useState(0);

    const styles = StyleSheet.create({
        container: {
            paddingHorizontal: 20,
            backgroundColor: colors.background,
        },
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
        <SafeAreaView>
            <ScrollView
                style={styles.container}
                onContentSizeChange={this.onContentSizeChange}
                scrollEnabled={scrollEnabled}
            >

                <TimeChart progress={progress}
                    title={"Homework Time"}
                    time={"30-45 Minutes"}
                    subtitle={"Schedule is 75% full"}
                    barColor={colors.primary}
                    textColor={colors.text}
                    subtitleColor={colors.gray}
                    style={{ paddingTop: 8 }}
                />

                <View style={[SHADOW, { backgroundColor: colors.tileColor, borderRadius: 8, padding: 8, marginVertical: 8 }]}>
                    <StackedBarChart
                        data={{
                            labels: ['MON    ', 'TUE   ', 'WED  ', 'THU ', 'FRI'],
                            legend: [],
                            data: [[60], [30], [60], [30], [60]],
                            barColors: [colors.primary],
                        }}
                        width={Dimensions.get("window").width - 56}
                        height={175}
                        yAxisSuffix="m"
                        yAxisInterval={1} // optional, defaults to 1
                        decimalPlaces={0}
                        showLegend={false}
                        chartConfig={{
                            backgroundColor: colors.tileColor,
                            backgroundGradientFrom: colors.tileColor,
                            backgroundGradientTo: colors.tileColor,
                            color: (opacity = 1) => `rgba(${colors.primaryRGB}, ${opacity})`,
                            barRadius: 8
                        }}
                    />
                </View>

                <TouchableOpacity activeOpacity={0.6} style={[styles.largeButton, SHADOW, { height: 45, marginTop: 8 }]} onPress={() => props.navigation.navigate("HomeworkSchedule")}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Ionicons name="ios-time" size={22} color={"white"} />
                        <Text style={[FONTS.h3, FONTS.bold, { color: "white", paddingLeft: 8 }]}>Homework Schedule</Text>
                    </View>
                </TouchableOpacity>


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
                <View style={{ marginBottom: 16 }}>
                    <Text style={[FONTS.h2, FONTS.bold, { color: colors.text, paddingTop: 16, paddingBottom: 8 }]}>Tonight's Work</Text>

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

            </ScrollView >
        </SafeAreaView>
    );
};

export default Home;