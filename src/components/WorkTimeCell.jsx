import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { SHADOW, FONTS } from "../Theme";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';
import { deleteWorkTime, getAssignmentByID } from "../storage/StorageAPI";
const AssignmentCell = (props) => {
    const { colors } = useTheme();

    return (
        <View style={[SHADOW,
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
        >
            <View style={{ flex: 1 }}>
                <Text numberOfLines={1} style={[FONTS.h3, FONTS.bold, { color: colors.primary }]}>{props.workTime.name}</Text>
                <View style={{ flexDirection: "row", marginTop: 2 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", paddingRight: 12 }}>
                        <Ionicons name={"time"} size={14} color={colors.assignmentCellText} />
                        <Text style={[FONTS.h4, { paddingLeft: 4, color: colors.assignmentCellText }]}>{props.workTime.start + " - " + props.workTime.end}</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity
                style={{ marginRight: 16 }}
                onPress={() => {
                    deleteWorkTime(props.workTime.id)
                    props.onDelete()
                }}
            >
                <Ionicons name={"ios-trash"} size={27} color={colors.primary} />
            </TouchableOpacity>

        </View >
    );
};

export default AssignmentCell;