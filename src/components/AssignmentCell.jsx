import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { SHADOW, FONTS } from "../theme/Theme";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';
const AssignmentCell = (props) => {
    const { colors } = useTheme();

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
                    assignment: props.assignment
                });
            }}>

            <View style={{ width: "90%" }}>
                <Text numberOfLines={1} style={[FONTS.h3, FONTS.bold, { color: colors.primary }]}>{props.assignment.name}</Text>
                <View style={{ flexDirection: "row", marginTop: 2 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", paddingRight: 12 }}>
                        <Ionicons name={"time"} size={14} color={colors.assignmentCellText} />
                        <Text style={[FONTS.h4, { paddingLeft: 4, color: colors.assignmentCellText }]}>15-20 Minutes</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", paddingRight: 12 }}>
                        <Ionicons name={"calendar"} size={14} color={colors.assignmentCellText} />
                        <Text style={[FONTS.h4, { paddingLeft: 4, color: colors.assignmentCellText }]}>Due 1/2/2021</Text>
                    </View>
                </View>
            </View>
            <View>

                <Ionicons name={"ios-chevron-forward"} size={27} color={colors.chevron} style={{ paddingRight: 8 }} />
            </View>

        </TouchableOpacity >
    );
};

export default AssignmentCell;