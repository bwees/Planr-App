import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FONTS, SHADOW } from "../theme/Theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useTheme } from "@react-navigation/native";



const AssignmentMini = (props) => {

    const { colors } = useTheme();

    return (
        <TouchableOpacity activeOpacity={0.6} style={[SHADOW, { paddingRight: 20 }]} >
            <View style={{ width: 200, backgroundColor: props.color, padding: 15, borderRadius: 10, height: 110 }} >
                <Text numberOfLines={1} style={[FONTS.h3, FONTS.bold, { flex: 1, color: props.titleColor, paddingBottom: 8 }]}>{props.assignment.name}</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <Ionicons name="ios-person" size={12} color={props.bodyTextColor} />
                    <Text style={{ color: props.bodyTextColor, paddingLeft: 8 }}>{props.assignment.class}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <Ionicons name="ios-calendar" size={12} color={props.bodyTextColor} />
                    <Text style={{ color: props.bodyTextColor, paddingLeft: 8 }}>{props.assignment.dueDate}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="ios-pencil" size={12} color={props.bodyTextColor} />
                    <Text style={{ color: props.bodyTextColor, paddingLeft: 8, flex: 1 }}>{props.assignment.type}</Text>
                </View>
            </View >
        </TouchableOpacity >

    );
};

export default AssignmentMini;