import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, StatusBar, Button } from "react-native";
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
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

import { getStatusBarHeight } from 'react-native-status-bar-height';

const { height } = Dimensions.get('window')

const ButtonHeader = (props) => {
    return (
        < View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 24, marginTop: 8, marginBottom: -16 }} >
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

    var [progress, setProgress] = useState(0);
    var [width, setWidth] = useState(0);
    var [height, setHeight] = useState(0);

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

    onGraphLayout = (event) => {
        const { width, height } = event.nativeEvent.layout;
        setWidth(width);
        setHeight(height);
        console.log("oof")
    };

    graphWidget = (width, height) => {
        return (
            <StackedBarChart
                data={{
                    labels: ['MON    ', 'TUE   ', 'WED  ', 'THU ', 'FRI'],
                    legend: [],
                    data: [[60], [30], [60], [30], [60]],
                    barColors: [colors.primary],
                }}
                width={width - 8}
                height={height - 8}
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
        )
    }

    var assignments = [assignment, assignment2]

    return (
        <View style={{ flex: 1 }}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: .1 }} colors={["#4287f5", "#40d6ff",]} useAngle={true} angle={120} style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ flex: 1, flexDirection: "column" }}>
                        <ButtonHeader style={{ flex: 1 }} />
                        <View style={{ height: 125, paddingHorizontal: 20, justifyContent: "center" }}>

                            <TimeChart progress={0.32}
                                title={"Homework Time"}
                                time={"30-45 Minutes"}
                                subtitle={"Light workload expected."}
                                barColor={"white"}
                                textColor={"white"}
                                subtitleColor={"white"}
                            />
                        </View>

                        {/* Info Card */}
                        <View

                            style={[SHADOW,
                                {
                                    backgroundColor: colors.background,
                                    flexGrow: 1,
                                    paddingTop: 16,
                                    marginBottom: -16,
                                    paddingHorizontal: 20,
                                    borderTopLeftRadius: 24,
                                    borderTopRightRadius: 24
                                }
                            ]}
                        >
                            <TouchableOpacity
                                style={{
                                    height: "8%",
                                    backgroundColor: colors.primary,
                                    borderRadius: 8,
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginBottom: 8
                                }}
                                onPress={() => {
                                    props.navigation.navigate("HomeworkSchedule")
                                }}
                            >
                                <Ionicons name={"time"} size={22} color={"white"} />
                                <Text style={[FONTS.bold, FONTS.h4, { paddingLeft: 8, color: "white" }]}>Homework Schedule</Text>
                            </TouchableOpacity>

                            {/* Graph Widget */}
                            <View style={{ flexGrow: 1 }}>
                                <Text style={[FONTS.h2, FONTS.bold, { color: colors.text, paddingBottom: 8 }]}>This Week</Text>

                                <View
                                    style={[SHADOW,
                                        {
                                            flex: 1,
                                            backgroundColor: colors.tileColor,
                                            borderRadius: 16,
                                            justifyContent: "center",
                                            alignItems: "center",

                                        }]}
                                    onLayout={this.onGraphLayout}
                                >
                                    {this.graphWidget(width, height)}
                                </View>
                            </View>

                            {/* Important Assignments */}
                            <View style={{ height: 200, paddingVertical: 16 }}>
                                <Text style={[FONTS.h2, FONTS.bold, { marginBottom: 8, color: colors.text }]}>Important Assignments</Text>
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
                                    style={{ width: "100%", overflow: "visible", marginBottom: 16 }}
                                />
                            </View>

                        </View>
                    </View>

                </SafeAreaView>
            </LinearGradient >
        </View >
    );
};

export default Home;