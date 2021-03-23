import React from "react";
import {
    View,
    Text,
    Animated,
    SectionList,
    Alert,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { FONTS, SHADOW, SIZES } from "../Theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import TimeChart from "../components/TimeChart";
import LinearGradient from "react-native-linear-gradient";
import ListSeperator from "../components/ListSeperator";
import AssignmentCell from "../components/AssignmentCell";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getTodayAssignments, getWorkTimes } from "../apis/storage/StorageAPI";
import { generateHomeworkSchedule } from "../algorithm/HomeworkScheduleAlgo";
import { minutesToTimeString } from "../Helpers";

const Home = (props) => {
    const { colors } = useTheme();

    var [schedule, setSchedule] = useState(generateHomeworkSchedule(getTodayAssignments(), getWorkTimes()))
    var [alertPresent, setPresent] = useState(false)

    function refreshList() {
        setSchedule(generateHomeworkSchedule(getTodayAssignments(), getWorkTimes()))
    }

    React.useEffect(() => {
        props.navigation.addListener("focus", () => {
            refreshList()
        });
    }, [props.navigation]);

    React.useEffect(() => {
        if (!isFinite(schedule.percent)) {
            if (!alertPresent) {
                setPresent(true)
                Alert.alert("Work Time", "Add a valid work time to continue.",
                    [{
                        onPress: () => {
                            setPresent(false);
                            props.navigation.navigate("CreateWorkTime");
                        }
                    }], { cancelable: false });
            }
        }
    }, [schedule]);

    const insets = useSafeAreaInsets();

    return (
        <View style={{ flex: 1, marginBottom: 0 }}>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 0.1 }}
                colors={["#4287f5", "#40d6ff"]}
                useAngle={true}
                angle={120}
                style={{ flex: 1 }}
            >
                <View style={{ flex: 1, paddingTop: insets.top - 8 }}>
                    <View style={{ flex: 1, flexDirection: "column", marginTop: 48 }}>
                        <View
                            style={{
                                height: 100,
                                paddingHorizontal: 20,
                                justifyContent: "center",
                            }}
                        >
                            <TimeChart
                                progress={isNaN(schedule.percent) ? 0 : schedule.percent}
                                title={"Homework Time"}
                                time={minutesToTimeString(schedule.usedTime) + " Remaining"}
                                subtitle={"Light workload expected."}
                                barColor={"white"}
                                textColor={"white"}
                                subtitleColor={"white"}
                            />
                        </View>

                        {/* Info Card */}
                        <View
                            style={[
                                SHADOW,
                                {
                                    backgroundColor: colors.background,
                                    paddingTop: 16,
                                    marginTop: 16,
                                    borderTopLeftRadius: 24,
                                    borderTopRightRadius: 24,
                                    flexGrow: 1,
                                },
                            ]}
                        >
                            <View>
                                <View style={{ paddingHorizontal: 20 }}>
                                    <Text style={[FONTS.h2, FONTS.bold, { color: colors.text }]}>
                                        Homework Schedule
                                    </Text>
                                    <Text style={[FONTS.h4, { color: colors.gray }]}>
                                        {schedule.numAssignments} Assignments
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        height: 1,
                                        borderRadius: 4,
                                        backgroundColor: colors.lightGray,
                                        marginTop: 10,
                                    }}
                                />
                            </View>
                            <Animated.View style={{ flex: 1 }}>
                                <SectionList
                                    contentContainerStyle={{
                                        justifyContent: "space-between",
                                        marginHorizontal: 20,
                                        overflow: false,
                                    }}
                                    stickySectionHeadersEnabled={false}
                                    sections={schedule.sched}
                                    renderSectionHeader={({ section: { title } }) => (
                                        <ListSeperator icon={title.includes("Unfit Assignments") ? "ios-alert-circle" : "ios-time"} color={colors.primary} label={title} />
                                    )}
                                    renderItem={({ item }) => (
                                        <AssignmentCell
                                            assignment={item}
                                            navigation={props.navigation}
                                            deleteAnimation={false}
                                            onSetDone={() => refreshList()}
                                        />
                                    )}
                                    extraData={schedule}
                                    keyExtractor={(item, index) => item + index}
                                />
                            </Animated.View>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
};

export default Home;
