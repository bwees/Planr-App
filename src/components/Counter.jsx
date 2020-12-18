import React from "react";
import { View, Text } from "react-native";
import { FONTS, SHADOW } from "../theme/Theme";

const Counter = (props) => {
    return (
        <View style={{ alignItems: "center", flexDirection: "column" }}>
            <Text style={[FONTS.largeTitle, FONTS.bold, { color: props.textColor }]}>{props.count}</Text>
            <Text style={[FONTS.h3, { color: props.subtitleColor }]}>{props.subtitle}</Text>
        </View >

    );
};

export default Counter;