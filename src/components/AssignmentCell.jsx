import React from "react";
import {
    Text,
    View,
    TouchableOpacity,
    Animated,
    TouchableHighlight,
} from "react-native";
import { SHADOW, FONTS } from "../Theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "@react-navigation/native";
import { getAssignmentByID, updateStatus } from "../storage/StorageAPI";
import { useState } from "react";
import Interactable from "react-native-interactable";
import { useRef } from "react";
import Sound from "react-native-sound";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { minutesToTimeString } from "../Helpers";

const AssignmentCell = (props) => {
    const { colors } = useTheme();

    const [assignment, setAssignment] = useState(props.assignment);

    var _deltaX = new Animated.Value(0);
    var _deltaY = new Animated.Value(0);
    var _height = new Animated.Value(1);
    var [showMarkDone, setShowMarkDone] = useState(true);

    var interactableRef = useRef();

    const options = {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
    };

    var chimeSound = new Sound("assets/done_chime.mp3", Sound.MAIN_BUNDLE);

    function chime() {
        chimeSound.play();
        ReactNativeHapticFeedback.trigger("impactLight", options);
    }

    return (
        <Animated.View
            style={{
                justifyContent: "center",
            }}
        >
            <View
                style={{
                    position: "absolute",
                    right: 0,
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                {/* Mark Done Button */}
                <TouchableOpacity
                    onPress={() => {
                        interactableRef.current.snapTo({ index: 0 });
                        if (props.deleteAnimation) {
                            var a = Animated.timing(_height, {
                                toValue: 0,
                                duration: 250,
                                delay: 250,
                                useNativeDriver: false,
                            });
                            a.start(() => {
                                updateStatus(props.assignment.id, 2);
                                setAssignment(getAssignmentByID(assignment.id));
                                if (props.onSetDone) {
                                    props.onSetDone();
                                }
                            });
                        } else {
                            updateStatus(props.assignment.id, 2);
                            setAssignment(getAssignmentByID(assignment.id));
                            if (props.onSetDone) {
                                props.onSetDone();
                            }
                        }
                        chime();
                    }}
                >
                    <Animated.View
                        style={{
                            opacity: _height.interpolate({
                                inputRange: [0.9, 1],
                                outputRange: [0, 1],
                            }),
                            alignItems: "center",
                            backgroundColor: colors.cellColor,
                            borderRadius: 12,
                            margin: 4,
                            paddingVerical: 8,
                            paddingHorizontal: 4,
                            height: 60,
                            marginBottom: 12,
                            marginLeft: 8,
                        }}
                    >
                        <Ionicons
                            name={"checkmark-circle"}
                            size={28}
                            color={colors.primary}
                            style={{ paddingTop: 2, paddingLeft: 2 }}
                        />
                        <Text style={{ fontSize: 10, color: colors.gray, width: 60, textAlign: "center" }}>
                            MARK AS{"\n"} DONE
            </Text>
                    </Animated.View>
                </TouchableOpacity>
            </View>
            <Interactable.View
                horizontalOnly={true}
                snapPoints={[{ x: 0 }, { x: -80 }]}
                animatedValueX={_deltaX}
                animatedValueY={_deltaY}
                ref={interactableRef}
                dragEnabled={assignment.status != 2}
                alertAreas={[{ id: 'myArea', influenceArea: { right: -100 } }]}
            >
                {/* Cell */}
                <TouchableHighlight
                    underlayColor={colors.background}
                    activeOpacity={0.25}
                    onPress={() => {
                        props.navigation.navigate("AssignmentDetail", {
                            assignmentID: assignment.id,
                        });
                    }}
                >
                    <Animated.View
                        style={[
                            SHADOW,
                            {
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "100%",
                                alignItems: "center",
                                opacity: _height,
                                maxHeight: _height.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 65],
                                }),
                                backgroundColor: colors.cellColor,
                                borderRadius: 12,
                                paddingVertical: _height.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 8],
                                }),
                                paddingLeft: 16,
                                marginBottom: 8,
                            },
                        ]}
                    >
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text
                                    numberOfLines={1}
                                    style={[FONTS.h3, FONTS.bold, { color: colors.primary }]}
                                >
                                    {assignment.name}
                                </Text>
                                {assignment.status == 2 && (
                                    <Ionicons
                                        name={"checkmark-circle"}
                                        size={18}
                                        color={colors.primary}
                                        style={{ marginLeft: 4 }}
                                    />
                                )}
                            </View>
                            <View style={{ flexDirection: "row", marginTop: 2 }}>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        paddingRight: 12,
                                    }}
                                >
                                    <Ionicons
                                        name={"time"}
                                        size={14}
                                        color={colors.assignmentCellText}
                                    />
                                    <Text
                                        style={[
                                            FONTS.h4,
                                            { paddingLeft: 4, color: colors.assignmentCellText },
                                        ]}
                                    >
                                        {minutesToTimeString(assignment.time)}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        paddingRight: 12,
                                    }}
                                >
                                    <Ionicons
                                        name={"calendar"}
                                        size={14}
                                        color={colors.assignmentCellText}
                                    />
                                    <Text
                                        style={[
                                            FONTS.h4,
                                            { paddingLeft: 4, color: colors.assignmentCellText },
                                        ]}
                                    >
                                        Due {new Date(assignment.dueDate).toLocaleDateString()}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Ionicons
                                name={"ios-chevron-forward"}
                                size={27}
                                color={colors.chevron}
                                style={{ paddingRight: 8 }}
                            />
                        </View>
                    </Animated.View>
                </TouchableHighlight>
            </Interactable.View>
        </Animated.View>
    );
};

export default AssignmentCell;
