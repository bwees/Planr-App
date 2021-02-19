import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { SHADOW, FONTS } from "../Theme";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';
import { getAssignmentByID, updateStatus } from "../storage/StorageAPI";
import { useState } from "react/cjs/react.development";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";


const AssignmentCell = (props) => {
    const { colors } = useTheme();

    const [assignment, setAssignment] = useState(props.assignment)

    const options = {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false
    };

    return (


        <TouchableOpacity style={[SHADOW,
            {
                width: "100%",
                alignItems: "center",
                height: 65,
                backgroundColor: colors.cellColor,
                borderRadius: 12,
                paddingVertical: 8,
                paddingLeft: 16,
                marginBottom: 8,
                flexDirection: "row",
                justifyContent: "space-between"
            }]}

            onPress={() => {
                props.navigation.navigate('AssignmentDetail', {
                    assignmentID: assignment.id
                });
            }}>

            <View style={{ flex: 1 }}>
                <Text numberOfLines={1} style={[FONTS.h3, FONTS.bold, { color: colors.primary }]}>{assignment.name}</Text>
                <View style={{ flexDirection: "row", marginTop: 2 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", paddingRight: 12 }}>
                        <Ionicons name={"time"} size={14} color={colors.assignmentCellText} />
                        <Text style={[FONTS.h4, { paddingLeft: 4, color: colors.assignmentCellText }]}>{assignment.time + "-" + (assignment.time + 5) + " Minutes"}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", paddingRight: 12 }}>
                        <Ionicons name={"calendar"} size={14} color={colors.assignmentCellText} />
                        <Text style={[FONTS.h4, { paddingLeft: 4, color: colors.assignmentCellText }]}>Due {new Date(assignment.dueDate).toLocaleDateString()}</Text>
                    </View>
                </View>
            </View>
            {assignment.status != 2 &&

                <TouchableOpacity
                    style={{ alignItems: "center", margin: 4, padding: 4, backgroundColor: colors.veryLightGray, borderRadius: 8 }}
                    onPress={() => {
                        updateStatus(props.assignment.id, 2)
                        setAssignment(getAssignmentByID(assignment.id))
                        ReactNativeHapticFeedback.trigger("impactLight", options);
                    }}>
                    <Ionicons name={"checkmark-circle"} size={30} color={colors.primary} style={{ paddingLeft: 2 }} />
                    <Text style={{ fontSize: 8, color: colors.gray, marginTop: 4 }}>MARK DONE</Text>
                </TouchableOpacity>
            }
            <View>
                <Ionicons name={"ios-chevron-forward"} size={27} color={colors.chevron} style={{ paddingRight: 8 }} />
            </View>

        </TouchableOpacity >
    );
};

export default AssignmentCell;