import React from "react";
import { View, Text } from "react-native";
import { FONTS } from "../Theme";
import Ionicons from 'react-native-vector-icons/Ionicons';

const ListSeperator = (props) => {
    return (
        <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 12, backgroundColor: props.bgColor }}>
            <Ionicons name={props.icon} size={16} color={props.color} />
            <Text style={[FONTS.h4, { color: props.color, paddingHorizontal: 6 }]}>{props.label}</Text>
            <View style={{ height: 1, borderRadius: 4, backgroundColor: props.color, paddingRight: 20, flexGrow: 1 }} />
        </View>
    );
};

export default ListSeperator;